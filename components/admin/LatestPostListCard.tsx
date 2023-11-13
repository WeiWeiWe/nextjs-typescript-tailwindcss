import Link from 'next/link';
import { FC } from 'react';
import { trimText } from '@/utils/helper';

interface IProps {
  title: string;
  meta: string;
  slug: string;
  onDeleteClick?: () => void;
}

const LatestPostListCard: FC<IProps> = ({
  title,
  meta,
  slug,
  onDeleteClick,
}) => {
  return (
    <div>
      <h1 className="font-semiblod text-lg text-primary-dark dark:text-primary transition">
        {trimText(title, 50)}
      </h1>
      <p className="text-sm text-secondary-dark">{trimText(meta, 100)}</p>
      <div className="flex items-center justify-end space-x-3">
        <Link href={'/admin/posts/update/' + slug}>
          <a className="text-primary-dark dark:text-primary transition hover:underline">
            Edit
          </a>
        </Link>
        <button
          className="text-primary-dark dark:text-primary transition hover:underline"
          onClick={onDeleteClick}
        >
          Delete
        </button>
      </div>
      <hr className="mt-2" />
    </div>
  );
};

export default LatestPostListCard;
