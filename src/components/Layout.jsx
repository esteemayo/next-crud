import Meta from './Meta'
import Navbar from './Navbar'

const Layout = ({ children }) => {
  return (
    <div>
      <Meta />
      <Navbar />
      {children}
    </div>
  );
};

export default Layout;
