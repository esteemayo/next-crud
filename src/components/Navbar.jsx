import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Menu, Container, Button } from 'semantic-ui-react';

const Navbar = () => {
  const { push } = useRouter();

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
              src='/logo192.png'
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
              onClick={() => push('/tasks/new')}
              style={{ fontSize: '1.6rem' }}
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
