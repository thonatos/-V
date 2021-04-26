import React from 'react';
import { Link } from 'gatsby';
import Layout from '../layouts/default';

const NotFoundPage = () => (
  <Layout>
    <div>
      <title>Not found</title>
      <h1>Page not found</h1>
      <Link to="/">Go home</Link>
    </div>
  </Layout>
);

export default NotFoundPage;
