import {
  NextPage,
  GetStaticProps,
  GetStaticPaths,
  InferGetStaticPropsType,
} from 'next';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { ParsedUrlQuery } from 'querystring';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
// import { useRouter } from 'next/router';

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<IProps> = (props) => {
  // if fallback options is true, can use isFallback params
  // const router = useRouter();
  // if (router.isFallback) {
  //   return <p>Loading...</p>;
  // }

  const { post } = props;

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="font-semibold text-2xl py-5">{post?.title || ''}</h1>
      <div className="prose pb-20">
        <MDXRemote {...post?.content} />
      </div>
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = () => {
  const postsPath = path.join(process.cwd(), 'posts');
  const dirArr = fs.readdirSync(postsPath);

  const paths = dirArr?.map((filename) => {
    const curFilePath = path.join(process.cwd(), 'posts/' + filename);
    const curFileContent = fs.readFileSync(curFilePath, { encoding: 'utf-8' });
    return {
      params: {
        postSlug: matter(curFileContent)?.data?.slug,
      },
    };
  });

  return {
    paths,
    /**
     * fallback options:
     *  1. false    ->  this will return 404 page for new unknown slug.
     *  2. blocking ->  this will first see the slug and it will try to get
     *                  data from static pages and if there is page it will first
     *                  hang the browser and try to generate new page.
     *  3. true     ->  return the fake page for some time and once the
     *                  data is ready it will serve them page props.
     */
    fallback: 'blocking',
  };
};

interface IstaticProps extends ParsedUrlQuery {
  postSlug: string;
}

type Post = {
  post: {
    title: string;
    content: MDXRemoteSerializeResult;
  };
};

export const getStaticProps: GetStaticProps<Post> = async (context) => {
  try {
    const { params } = context;
    const { postSlug } = params as IstaticProps;

    const curFilePath = path.join(process.cwd(), 'posts/' + postSlug + '.md');
    const curFileContent = fs.readFileSync(curFilePath, { encoding: 'utf-8' });
    const source = await serialize(curFileContent, {
      parseFrontmatter: true,
    });

    return {
      props: {
        post: {
          title: source.frontmatter.title as string,
          content: source,
        },
      },
    };
  } catch (e) {
    return {
      notFound: true, // if static page not found, it will display 404 page
    };
  }
};

export default SinglePage;
