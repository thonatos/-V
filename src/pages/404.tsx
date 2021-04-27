import React from 'react';
import { Link } from 'gatsby';
import { Divider } from 'antd';

import Layout from '@/layouts/default';
import PageContainer from '@/components/PageContainer';

import * as styles from './404.module.less';

const NotFoundPage = () => (
  <Layout>
    <PageContainer fillSecreen>
      <div className={styles.container}>
        <h1 className={styles.status}>404</h1>
        <Divider className={styles.divider} type="vertical" />
        <div className={styles.detail}>
          <p>Page not found.</p>
          <Link to="/">Go home</Link>
        </div>
      </div>
    </PageContainer>
  </Layout>
);

export default NotFoundPage;
