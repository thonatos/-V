import React from 'react';
import * as styles from './index.module.less';

const LandingPage: React.FC<Props> = ({
  children,

}) => (
  <div className={styles.wrap}>
    <div className={styles.page}>
      {children}
    </div>
  </div>
);

export default LandingPage;

interface Props {
  children: any;
}
