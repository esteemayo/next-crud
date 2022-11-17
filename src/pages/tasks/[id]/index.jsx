import Error from 'next/error';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Confirm, Grid } from 'semantic-ui-react';

import * as taskAPI from '@/services/taskService';

const Task = ({ task, error }) => {
  const { push, query } = useRouter();
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteTask = async () => {
    const { id } = query;

    try {
      await taskAPI.deleteTask(id);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    await deleteTask();
    await push('/');
    close();
  };

  if (error && error.statusCode) {
    return <Error statusCode={error.statusCode} title={error.statusText} />;
  }

  return (
    <Grid
      centered
      verticalAlign='middle'
      columns='2'
      style={{ height: '80vh' }}
    >
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Card centered>
            <Card.Content>
              <Card.Header>{task.title}</Card.Header>
              <Card.Description>{task.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button
                color='red'
                onClick={open}
                loading={isDeleting}
                style={{ fontSize: '1.5rem' }}
              >
                Delete
              </Button>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
      <Confirm
        content='Are you sure to delete that task'
        header='Please confirm'
        open={confirm}
        onCancel={close}
        onConfirm={handleDelete}
      />
    </Grid>
  );
};

export const getStaticPaths = async () => {
  const { data } = await taskAPI.getTasks();

  const paths = data.map((item) => ({
    params: { id: item._id }
  }));

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps = async ({ params: { id } }) => {
  const { data, status } = await taskAPI.getTask(id);

  if (status === 200) {
    return {
      props: {
        task: data,
      },
      revalidate: 1,
    };
  }

  return {
    props: {
      error: {
        statusCode: status,
        statusText: 'Invalid ID',
      },
    },
  };
};

export default Task;
