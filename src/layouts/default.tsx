import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { Layout } from 'antd';

import Brand from '@/components/Brand';
import Copyright from '@/components/Copyright';

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
          }
        }
      }
    `,
  );

  const { children } = props;
  const { title, description, copyright } = data.site.siteMetadata;

  return (
    <Layout>
      <Header>
        <Link to="/">
          <Brand
            title={title}
            description={description}
          />
        </Link>
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
