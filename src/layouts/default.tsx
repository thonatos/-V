import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import * as styles from './default.module.less';

const DefaultLayout: React.FC<Props> = (props) => {
  const data: DataProps = useStaticQuery(
    graphql`
      query DLQuery {
        site {
          siteMetadata {
            title
            copyright
            description
          }
        }
      }
    `,
  );

  const { children } = props;
  const { title, description, copyright } = data.site.siteMetadata;

  return (
    <div className={styles.wrap}>
      <div className={styles.main}>

        <div className={styles.header}>
          <div className={styles.container}>
            <h1 className={styles.title}>
              {title}
            </h1>
            <p className={styles.description}>
              {description}
            </p>
          </div>
        </div>

        {
          children ? (
            <div className={styles.content}>
              <div className={styles.container}>
                {children}
              </div>
            </div>
          ) : null
        }

        <div className={styles.footer}>
          <div className={styles.container}>
            {copyright}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;

interface Props {
  children: any;
}

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
      copyright: string;
      description: string;
    }
  };
}
