import React from 'react';
import { useStaticQuery, graphql } from 'gatsby';

import * as styles from './global.module.less';

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
    <div className={styles.container}>
      <div className={styles.main}>

        <div className={styles.header}>
          <h1 className={styles.title}>
            {title}
          </h1>
          <p className={styles.description}>
            {description}
          </p>
        </div>

        {
          children ? (
            <div className={styles.content}>
              {children}
            </div>
          ) : null
        }

        <div className={styles.footer}>
          {copyright}
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
