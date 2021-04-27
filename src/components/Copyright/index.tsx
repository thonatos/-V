import React from 'react';
import * as styles from './index.module.less';

const Brand: React.FC<Props> = ({ copyright }) => (
  <div className={styles.copyright}>
    {copyright}
  </div>
);

export default Brand;

interface Props {
  copyright: string;
}
