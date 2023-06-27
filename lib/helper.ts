import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';
import { PostApiResponse } from '../utils/types';

export const readPostsInfo = (): PostApiResponse => {
  const postsPath = path.join(process.cwd(), 'posts');
  const dirArr = fs.readdirSync(postsPath);

  const data = dirArr?.map((filename) => {
    const curFilePath = path.join(process.cwd(), 'posts/' + filename);
    const curFileContent = fs.readFileSync(curFilePath, { encoding: 'utf-8' });
    return matter(curFileContent)?.data;
  });

  return data as PostApiResponse;
};
