import { Route, Routes } from 'react-router-dom';

import Layout from './layout/Layout';
import HomePage from './pages/home/Home';
import { routes } from './routes';

const App = () => (
  <Layout>
    <Routes>
      <Route path={routes.wildcard} element={<HomePage />} />
    </Routes>
  </Layout>
);

export default App;
