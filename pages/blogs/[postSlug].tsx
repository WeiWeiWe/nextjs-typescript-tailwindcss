import { NextPage, GetStaticProps } from 'next';
import { useRouter } from 'next/router'; 

interface IProps {}

const SinglePage: NextPage<IProps> = () => {
  const router = useRouter();
  console.log('router', router);
  return <div>SinglePage</div>
};

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {}
  }
};

export default SinglePage;