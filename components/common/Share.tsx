import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from 'next-share';
import { FC } from 'react';

interface IProps {
  url: string;
  title?: string;
  quote?: string;
}

const Share: FC<IProps> = ({ url, title, quote }) => {
  return (
    <div className="flex items-center space-x-3">
      <p className="font-semibold text-primary-dark dark:text-primary">
        Share:
      </p>
      <FacebookShareButton url={url} title={title} quote={quote}>
        <FacebookIcon round size={32} />
      </FacebookShareButton>
      <TwitterShareButton url={url} title={title}>
        <TwitterIcon round size={32} />
      </TwitterShareButton>
      <LinkedinShareButton url={url} title={title} source={quote}>
        <LinkedinIcon round size={32} />
      </LinkedinShareButton>
      <WhatsappShareButton url={url} title={title} separator=":: ">
        <WhatsappIcon round size={32} />
      </WhatsappShareButton>
      <RedditShareButton url={url} title={title}>
        <RedditIcon round size={32} />
      </RedditShareButton>
    </div>
  );
};

export default Share;
