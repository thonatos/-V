import React from 'react';
import dayjs from 'dayjs';
import { PageHeader, Layout } from 'antd';
import * as styles from './index.module.less';

const { Content } = Layout;

const PageContainer: React.FC<Props> = ({
  children,
  frontmatter,
  fillSecreen,
}) => {
  const { title, date, category } = frontmatter || {};

  const dateTime = dayjs(date).format('YYYY-MM-DD HH:MM:ss');
  const subTitle = `${category} / ${dateTime}`;

  return (
    <div className={fillSecreen ? styles.wrapfull : styles.wrap}>
      <PageHeader
        className={styles.header}
        title={title}
        subTitle={subTitle}
      >
        <Content className={styles.page}>
          {children}
        </Content>
      </PageHeader>
    </div>
  );
};

export default PageContainer;

interface Props {
  children: any;
  frontmatter?: {
    category: string;
    title: string;
    date: string;
  };
  fillSecreen?: boolean;
}
