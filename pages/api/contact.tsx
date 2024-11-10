import { NextApiRequest, NextApiResponse } from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // req.body уже является объектом, JSON.parse не нужен
    const body = req.body;
    console.log(body);
    res.status(200).json({ status: 'OK' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'Invalid JSON' });
  }
};