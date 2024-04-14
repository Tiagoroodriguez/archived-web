import { ScrollToTop } from './ScrollToTop';

const Layout = ({ children }) => (
  <>
    <ScrollToTop />
    {children}
  </>
);

export default Layout;
