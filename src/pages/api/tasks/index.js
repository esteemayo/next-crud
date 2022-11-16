import Morgan from 'morgan';

import Task from '@/models/Task';
import { dbConnect } from '@/utils/mongo';
import { runMiddleware } from '@/utils/runMiddleware';

dbConnect();

const handler = async (req, res) => {
  const { method, body } = req;
  const morgan = Morgan('dev');

  switch (method) {
    case 'GET':
      try {
        const tasks = await Task.find();
        await runMiddleware(req, res, morgan);
        return res.status(200).json(tasks);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }

    case 'POST':
      try {
        const task = await Task.create({ ...body });
        await runMiddleware(req, res, morgan);
        return res.status(201).json(task);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      return res.status(405).json({ message: `This method (${method}) is not supported` });
  }
};

export default handler;
