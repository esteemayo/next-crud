import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, Container, Button } from 'semantic-ui-react';

const Navbar = () => {
  const router = useRouter();

  return (
    <Menu
      inverted
      borderless
      style={{ padding: '0.3rem', marginBottom: '20px' }}
      attached
    >
      <Container>
        <Menu.Item name='home'>
          <Link href='/' passHref>
            <Image
              src='/vercel.svg'
              width={50}
              height={50}
              alt=''
            />
          </Link>
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button
              size='mini'
              primary
              onClick={() => router.push('/tasks/new')}
            >
              New Task
            </Button>
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default Navbar;
