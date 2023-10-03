import { FC } from 'react';
import Head from 'next/head';

interface IProps {
  title?: string;
  desc?: string;
}

export const APP_NAME = 'Dev Blogs';

const AppHead: FC<IProps> = ({ title, desc }) => {
  return (
    <Head>
      <title>{title ? title + ' | ' + APP_NAME : APP_NAME}</title>
      <meta content={desc} name="description" />
    </Head>
  );
};

export default AppHead;
