import React, { FC } from 'react';
import { PageProps } from 'gatsby';

import Layout from '../layouts/default';

const IndexPage: FC<Props> = () => (
  <Layout>
    <div style={{
      color: '#ccc'
    }}>
      coming soon...
    </div>
  </Layout>
);

export default IndexPage;

interface Props extends PageProps {
  data: {
  }
}
