import React from 'react';
import dayjs from 'dayjs';
import { PageHeader } from 'antd';
import * as styles from './index.module.less';

const PageContainer: React.FC<Props> = ({
  children,
  frontmatter,
  fillSecreen,
}) => {
  console.log(frontmatter)
  const { title, date, category } = frontmatter || {};
  const formatDateTime = dayjs(date).format('YYYY-MM-DD HH:MM:ss');
  const headerNode = frontmatter ? (
    <PageHeader
      className={styles.header}
      title={title}
      subTitle={`${category} / ${formatDateTime}`}
    />
  ) : null;

  return (
    <div className={fillSecreen ? styles.wrapfull : styles.wrap}>
      {headerNode}
      <div className={styles.page}>
        {children}
      </div>
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
