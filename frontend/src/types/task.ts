export type Task = {
  id: string;
  title: string;
  status: 'pending' | 'in_progress' | 'done';
};
