import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import moment from 'moment';
import { PostDetail } from '@/utils/types';

interface IProps {
  post: PostDetail;
  busy?: boolean;
  controls?: boolean;
  onDeleteClick?: () => void;
}

const trimText = (text: string, trimBy: number = 30) => {
  if (text?.length <= trimBy) return text;

  return text?.substring(0, trimBy).trim() + '...';
};

const PostCard: FC<IProps> = ({
  controls = false,
  post,
  busy,
  onDeleteClick,
}) => {
  const { title, slug, meta, tags, thumbnail, createdAt } = post;
  return (
    <div className="rounded shadow-sm shadow-secondary-dark overflow-hidden bg-primary dark:bg-primary-dark transition flex flex-col h-full">
      {/* thumbnail */}
      <div className="aspect-video relative">
        {!thumbnail ? (
          <div className="w-full h-full flex items-center justify-center text-secondary-dark opacity-50 font-semibold">
            No Image
          </div>
        ) : (
          <Image src={thumbnail} layout="fill" alt="Thumbnail" />
        )}
      </div>

      {/* Post Info */}
      <div className="p-2 flex-1 flex flex-col">
        <Link href={'/' + slug}>
          <a>
            <div className="flex items-center justify-between text-sm text-primary-dark dark:text-primary">
              <div className="flex items-center space-x-1">
                {Array.isArray(tags) &&
                  tags?.length > 0 &&
                  tags.map((t, index) => <span key={t + index}>{t}</span>)}
              </div>
              <span>
                {createdAt
                  ? moment(createdAt).format('YYYY-MM-DD')
                  : moment().format('YYYY-MM-DD')}
              </span>
            </div>
            <h1 className="font-semibold text-primary-dark dark:text-primary">
              {trimText(title, 50)}
            </h1>
            <p className="text-secondary-dark">{trimText(meta, 70)}</p>
          </a>
        </Link>

        {controls && (
          <div className="flex justify-end items-center h-8 mt-auto space-x-4 text-primary-dark dark:text-primary">
            {busy ? (
              <span className="animate-pulse">Removing</span>
            ) : (
              <>
                <Link href={'/admin/posts/update' + slug}>
                  <a className="hover:underline">Edit</a>
                </Link>
                <button className="hover:underline" onClick={onDeleteClick}>
                  Delete
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;
