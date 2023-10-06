import { NextApiHandler } from 'next';
import formidable from 'formidable';
import dbConnect from '@/lib/dbConnect';
import { validateSchema, postValidationSchema } from '@/lib/validator';
import { readFile } from '@/lib/utils';
import Post from '@/models/Post';

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET': {
      await dbConnect();
      res.json({ ok: true });
    }
    case 'POST':
      return createNewPost(req, res);
  }
};

const createNewPost: NextApiHandler = async (req, res) => {
  const { files, body } = await readFile(req);

  // tags will be in string form, so need to converting to array type
  let tags = [];
  try {
    if (body?.tags) tags = JSON.parse(body.tags as string);
  } catch (err) {
    tags = [];
    console.error('tags can not converting to array type!');
  }

  const error = validateSchema(postValidationSchema, { ...body, tags });
  if (error) return res.status(400).json({ error });

  const { title, content, slug, meta } = body;
  await dbConnect();
  const alreadyExist = await Post.findOne({ slug });
  if (alreadyExist)
    return res.status(400).json({ error: 'Slug need to be unique!' });

  // create new post
  const newPost = new Post({
    title,
    content,
    slug,
    meta,
    tags,
  });

  const thumbnail = files?.thumbnail as formidable.File;
  if (thumbnail) {
    // todo: save image to cloud and get image url and public_id
    // newPost.thumbnail = { url: '', public_id: '' };
  }

  await newPost.save();

  res.json({ post: newPost });
};

export default handler;
