import React from 'react';
import * as styles from './index.module.less';

const Brand: React.FC<Props> = ({ title, description }) => (
  <div className={styles.container}>
    <h1 className={styles.title}>
      {title}
    </h1>
    <p className={styles.description}>
      {description}
    </p>
  </div>
);

export default Brand;

interface Props {
  title: string;
  description: string;
}
