import React from 'react';
import { PageHeader, Layout, PageHeaderProps } from 'antd';
import * as styles from './index.module.less';

const { Content } = Layout;

const DetailPage: React.FC<Props> = ({
  children,
  metadata,
}) => (
  <div className={styles.wrap}>
    <PageHeader
      className={styles.header}
      {...{ ...metadata }}
    >
      <Content>
        {children}
      </Content>
    </PageHeader>
  </div>
);

export default DetailPage;

interface Props {
  children: any;
  metadata?: Metadata
}

interface Metadata extends PageHeaderProps {

}
