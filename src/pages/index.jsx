import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Card, Container, Grid } from 'semantic-ui-react';

import { getTasks } from '@/services/taskService';

const Home = ({ tasks }) => {
  const router = useRouter();

  if (tasks.length === 0) {
    return (
      <Grid centered verticalAlign='middle' columns='1' style={{ height: '80vh' }}>
        <Grid.Row>
          <Grid.Column textAlign='center'>
            <h1>There are no tasks present. Please create a new one</h1>
            <div>
              <Button
                primary
                size='mini'
                onClick={() => router.push('/tasks/new')}
                style={{ fontSize: '1.6rem' }}
              >
                Create Task
              </Button>
            </div>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
  return (
    <Container>
      <Card.Group itemsPerRow={4}>
        {tasks?.map(item => {
          const { _id: id, title, description } = item;
          return (
            <Card key={id}>
              <Card.Content>
                <Card.Header>
                  <Link href={`/tasks/${id}`} passHref>
                    {title}
                  </Link>
                </Card.Header>
                <p>{description}</p>
              </Card.Content>
              <Card.Content extra>
                <Button
                  color='orange'
                  onClick={() => router.push(`/tasks/${id}`)}
                  style={{ fontSize: '1.6rem' }}
                >
                  View
                </Button>
                <Button
                  color='blue'
                  onClick={() => router.push(`/tasks/${id}/update`)}
                  style={{ fontSize: '1.6rem' }}
                >
                  Update
                </Button>
              </Card.Content>
            </Card>
          )
        })}
      </Card.Group>
    </Container>
  );
};

export const getStaticProps = async () => {
  const { data } = await getTasks();

  return {
    props: {
      tasks: data,
    },
    revalidate: 1,
  };
};

export default Home;
