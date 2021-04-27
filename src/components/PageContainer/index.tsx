import React from 'react';
import dayjs from 'dayjs';
import { PageHeader } from 'antd';
import * as styles from './index.module.less';

const PageContainer: React.FC<Props> = ({
  children,
  header,
  fillSecreen,
}) => {
  const { title, date } = header || {};

  const headerNode = header ? (
    <PageHeader
      className={styles.header}
      title={title}
      subTitle={dayjs(date).format('YYYY-MM-DD HH:MM:ss')}
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
  header?: {
    title: string;
    date: string;
  };
  fillSecreen?: boolean;
}
