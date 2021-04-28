import React from 'react';
import {
  useStaticQuery, graphql, Link, navigate,
} from 'gatsby';
import { Layout, Menu } from 'antd';
import { Helmet } from 'react-helmet';

import Brand from '@/components/Brand';
import Copyright from '@/components/Copyright';
import * as styles from './default.module.less';

const { Header, Content, Footer } = Layout;

const DefaultLayout: React.FC<Props> = (props) => {
  const data: DataProps = useStaticQuery(
    graphql`
      query DLQuery {
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
    title: pageTitle,
  } = props;
  const {
    title: siteTitle,
    description,
    copyright,
    navMenus,
  } = data.site.siteMetadata;

  const handleNav = ({ key }: any) => {
    if (!key) {
      return;
    }
    navigate(key);
  };

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{pageTitle || siteTitle}</title>
      </Helmet>

      <Header className={styles.header}>
        <Link to="/">
          <Brand
            title={siteTitle}
            description={description}
          />
        </Link>

        <Menu
          theme="light"
          mode="horizontal"
          // defaultSelectedKeys={['2']}
          onClick={handleNav}
        >
          {
            navMenus.map(({ name, link }) => <Menu.Item key={link}>{name}</Menu.Item>)
          }
        </Menu>
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
