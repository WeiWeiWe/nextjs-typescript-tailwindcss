import { NextApiHandler } from 'next';
import formidable from 'formidable';
import { readFile, isAdmin } from '@/lib/utils';

export const config = {
  api: { bodyParser: false },
};

const handler: NextApiHandler = (req, res) => {
  const { method } = req;

  switch (method) {
    case 'POST':
      return uploadNewImage(req, res);
    case 'GET':
      return readAllImages(req, res);
    default:
      return res.status(404).send('Not found!');
  }
};

const uploadNewImage: NextApiHandler = async (req, res) => {
  try {
    const admin = await isAdmin(req, res);
    if (!admin) return res.status(401).json({ error: 'unauthorized request!' });

    const { files } = await readFile(req);
    const imageFile = files.image as formidable.File;
    console.log(imageFile);

    // todo: save image to cloud and get image src

    res.json({ src: '' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const readAllImages: NextApiHandler = async (req, res) => {
  try {
    const admin = await isAdmin(req, res);
    if (!admin) return res.status(401).json({ error: 'unauthorized request!' });

    // todo: get images from cloud
    res.json({ images: [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default handler;
