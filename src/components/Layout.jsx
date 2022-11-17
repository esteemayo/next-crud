import { ToastContainer } from 'react-toastify';

import Meta from './Meta';
import Navbar from './Navbar';
import 'react-toastify/dist/ReactToastify.css';

const Layout = ({ children }) => {
  return (
    <div>
      <Meta />
      <Navbar />
      <ToastContainer />
      {children}
    </div>
  );
};

export default Layout;
