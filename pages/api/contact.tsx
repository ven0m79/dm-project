import { NextApiRequest, NextApiResponse } from 'next';

const mail = require('@sendgrid/mail');
mail.setApiKey(process.env.SENDGRID_API_KEY);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const data = req.body; // Данные из запроса
    console.log(data); // Для проверки, что данные доходят
    res.status(200).json({ message: 'Data received', data });
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}