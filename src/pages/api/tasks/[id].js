import Morgan from 'morgan';

import Task from '@/models/Task';
import { dbConnect } from '@/utils/mongo';
import { runMiddleware } from '@/utils/runMiddleware';

dbConnect();

const handler = async (req, res) => {
  const morgan = Morgan('dev');
  const {
    body,
    method,
    query: { id: taskId },
  } = req;

  switch (method) {
    case 'GET':
      try {
        const task = await Task.findById(taskId);

        if (!task) {
          return res.status(404).json({ message: `No task found with the given ID → ${taskId}` });
        }

        await runMiddleware(req, res, morgan);
        return res.status(200).json(task);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }

    case 'PATCH':
      try {
        const task = await Task.findByIdAndUpdate(taskId, { $set: { ...body } }, {
          new: true,
          runValidators: true,
        });

        if (!task) {
          return res.status(404).json({ message: `No task found with the given ID → ${taskId}` });
        }

        await runMiddleware(req, res, morgan);
        return res.status(200).json(task);
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }

    case 'DELETE':
      try {
        const task = await Task.findByIdAndDelete(taskId);

        if (!task) {
          return res.status(404).json({ message: `No task found with the given ID → ${taskId}` });
        }

        await runMiddleware(req, res, morgan);
        return res.status(204).json();
      } catch (err) {
        return res.status(400).json({ message: err.message });
      }

    default:
      res.setHeader('Allow', ['GET', 'PATCH', 'DELETE']);
      return res.status(405).json({ message: `This method ${method} is not allowed` });
  }
};

export default handler;
