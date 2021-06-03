import React from 'react';
import {
  useStaticQuery, graphql, Link,
} from 'gatsby';
import { Layout } from 'antd';
import { Helmet } from 'react-helmet';
import { configResponsive } from 'ahooks';
import Brand from '@/components/Brand';
import Copyright from '@/components/Copyright';
import NavMenu from '@/components/NavMenu';
import * as styles from './default.module.less';

configResponsive({
  small: 0,
  middle: 800,
  large: 1200,
});

const { Header, Content, Footer } = Layout;

const DefaultLayout: React.FC<Props> = (props) => {
  const data: DataProps = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            copyright
            description
            navMenus {
              name
              link
            }
          }
        }
      }
    `,
  );

  const {
    children,
    title,
  } = props;
  const {
    title: siteTitle,
    description,
    copyright,
    navMenus,
  } = data.site.siteMetadata;

  const pageTitle = title ? `${title} - ${siteTitle}` : siteTitle;

  return (

    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle}</title>
      </Helmet>

      <Header className={styles.header}>
        <Link to="/">
          <Brand
            title={siteTitle}
            description={description}
          />
        </Link>

        <NavMenu navMenus={navMenus} />
      </Header>

      <Layout>
        {
          children ? (
            <Content>
              {children}
            </Content>
          ) : null
        }
      </Layout>

      <Footer>
        <Copyright
          copyright={copyright}
        />
      </Footer>
    </Layout>
  );
};

export default DefaultLayout;

interface Props {
  children: any;
  title?: string;
}

interface DataProps {
  site: {
    siteMetadata: {
      title: string;
      copyright: string;
      description: string;
      navMenus: Array<{
        name: string;
        link: string;
      }>
    }
  };
}
