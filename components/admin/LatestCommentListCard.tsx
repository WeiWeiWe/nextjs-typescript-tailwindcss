import { FC } from 'react';
import parse from 'html-react-parser';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import ProfileIcon from '../common/ProfileIcon';
import { LatestComment } from '@/utils/types';
import { trimText } from '@/utils/helper';

interface IProps {
  comment: LatestComment;
}

const LatestCommentListCard: FC<IProps> = ({ comment }) => {
  const { owner, belongsTo, content } = comment;

  return (
    <div className="flex space-x-2">
      <ProfileIcon nameInitial={owner?.name?.[0]} avatar={owner?.avatar} />
      <div className="flex-1">
        <p className="font-semibold text-primary-dark dark:text-primary transition">
          {owner?.name}
          <span className="text-sm text-secondary-dark">commented on</span>
        </p>
        <a
          href={'/' + belongsTo?.slug}
          target="_blank"
          rel="noreferrer noopener"
          className="text-secondary-dark hover:underline"
        >
          <div className="flex items-center space-x-2">
            <BsBoxArrowUpRight size={12} />
            {trimText(belongsTo?.title, 30)}
          </div>
        </a>
        <div className="text-primary-dark dark:text-primary transition">
          {parse(content)}
        </div>
      </div>
    </div>
  );
};

export default LatestCommentListCard;
