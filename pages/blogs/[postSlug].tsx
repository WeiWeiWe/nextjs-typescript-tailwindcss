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

type IProps = InferGetStaticPropsType<typeof getStaticProps>;

const SinglePage: NextPage<IProps> = (props) => {
  const { post } = props;

  return (
    <div className="max-w-3xl mx-auto">
      <h1>{post?.title || ''}</h1>
      <MDXRemote {...post?.content} />
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
    fallback: false,
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
};

export default SinglePage;
