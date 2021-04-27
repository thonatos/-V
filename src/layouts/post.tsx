import React, { FC } from 'react';
import { PageProps } from 'gatsby';
import { Helmet } from 'react-helmet';

import Layout from '@/layouts/default';
import PageContainer from '@/components/PageContainer';

interface Props extends PageProps {
  children: any;
  pageContext: {
    frontmatter: {
      cetegory: string;
      title: string;
      date: string;
    }
  }
}

const PostLayout: FC<Props> = (props) => {
  const {
    children,
    pageContext: {
      frontmatter,
    },
  } = props;

  const { title } = frontmatter;

  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
      </Helmet>

      <PageContainer
        frontmatter={frontmatter}
      >
        {children}
      </PageContainer>
    </Layout>
  );
};

export default PostLayout;
