import { NextApiHandler } from 'next';
import matter from 'gray-matter';
import fs from 'fs';
import path from 'path';

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      const data = readPostsInfo();
      return res.json({ postsInfo: data });
    }
    default:
      return res.status(404).send('Not Found');
  }
};

const readPostsInfo = () => {
  const postsPath = path.join(process.cwd(), 'posts');
  const dirArr = fs.readdirSync(postsPath);

  const data = dirArr?.map((filename) => {
    const curFilePath = path.join(process.cwd(), 'posts/' + filename);
    const curFileContent = fs.readFileSync(curFilePath, { encoding: 'utf-8' });
    return matter(curFileContent)?.data;
  });

  return data;
};

export default handler;
