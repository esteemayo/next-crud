import http from './httpService';

const apiEndpoint = '/tasks';

const taskUrl = (taskId) => `${apiEndpoint}/${taskId}`;

export const getTasks = () => http.get(apiEndpoint);

export const getTask = (taskId) => http.get(taskUrl(taskId));

export const createTask = (task) => http.post(apiEndpoint, task);

export const updateTask = (taskId, task) =>
  http.patch(taskUrl(taskId), task);

export const deleteTask = (taskId) => http.delete(taskUrl(taskId));
