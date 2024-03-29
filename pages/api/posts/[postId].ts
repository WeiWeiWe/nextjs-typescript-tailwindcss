import { NextApiHandler } from 'next';
import formidable from 'formidable';
import { validateSchema, postValidationSchema } from '@/lib/validator';
import { readFile, isAdmin } from '@/lib/utils';
import Post from '@/models/Post';
import { IncomingPost } from '@/utils/types';

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'PATCH':
      return updatePost(req, res);
    case 'DELETE':
      return removePost(req, res);
    default:
      res.status(404).send('Not found!');
  }
};

const removePost: NextApiHandler = async (req, res) => {
  try {
    const admin = await isAdmin(req, res);
    if (!admin) return res.status(401).json({ error: 'unauthorized request!' });

    const postId = (req.query?.postId || '') as string;
    const post = await Post.findByIdAndDelete(postId);

    if (!post) return res.status(404).json({ error: 'Post not found!' });

    // const publicId = post?.thumbnail?.public_id;
    // if (publicId) {
    // todo: remove image from cloud
    // }

    res.json({ removed: true });
  } catch (error: any) {
    res.status(500).json({ error: error?.message });
  }
};

const updatePost: NextApiHandler = async (req, res) => {
  const admin = await isAdmin(req, res);
  if (!admin) return res.status(401).json({ error: 'unauthorized request!' });

  const postId = (req.query?.postId || '') as string;
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ error: 'Post not found!' });

  const { files, body } = await readFile<IncomingPost>(req);

  // tags will be in string form, so need to converting to array type
  let tags = [];
  try {
    if (body?.tags) tags = JSON.parse(body.tags as string);
  } catch (err) {
    tags = [];
    console.error('tags can not converting to array type!');
  }

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(404).json({ error });

  const { title, content, meta, slug } = body;
  post.title = title;
  post.content = content;
  post.meta = meta;
  post.tags = tags;
  post.slug = slug;

  const thumbnail = files?.thumbnail as formidable.File;
  if (thumbnail) {
    // todo: save new image to cloud and get image url and public_id

    const publicId = post.thumbnail?.public_id;
    if (publicId) {
      // todo: remove old image
    }

    // todo: switch the new image url and public_id
    // post.thumbnail = { url: 'newUrl', public_id: 'newId'}
  }

  await post.save();
  res.json({ post });
};

export default handler;
