import { FC } from 'react';
import Link from 'next/link';

interface IProps {
  title: string;
  desc: string;
  slug: string;
}

const BlogCard: FC<IProps> = ({ title, desc, slug }): JSX.Element => {
  return (
    <Link href={`/blogs/${slug}`}>
      <a className="block">
        <div className="bg-green-100 p-2 rounded cursor-pointer">
          <h1 className="text-gray-900 text-3xl font-semibold">{title}</h1>
          <p className="text-gray-500">{desc}</p>
        </div>
      </a>
    </Link>
  );
};

export default BlogCard;