import React, { FC } from 'react';
import { PageProps } from 'gatsby';
import { Typography, Divider } from 'antd';

import Layout from '@/layouts/default';
import Logo from '@/components/Logo';

import * as styles from './index.module.less';

const IndexPage: FC<Props> = () => (
  <Layout>
    <div className={styles.intro}>
      <Logo
        title="ρV"
        description="undefined project - ρV"
      />

      <Divider
        className={styles.divider}
        type="vertical"
      />

      <div className={styles.slogan}>
        <Typography.Paragraph
          style={{
            color: '#fff',
            textTransform: 'uppercase',
          }}
        >
          We are not defined by what happens to us, but by how we choose to respond.
        </Typography.Paragraph>
      </div>
    </div>
    <div className={styles.banner}>
      <div className={styles.comming}>
        coming soon...
      </div>
    </div>

  </Layout>
);

export default IndexPage;

interface Props extends PageProps {
  data: {
  }
}
