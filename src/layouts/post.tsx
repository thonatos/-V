import React, { FC } from 'react';
import { PageProps } from 'gatsby';


import Layout from '@/layouts/default';
import PageContainer from '@/components/PageContainer';

interface Props extends PageProps {
  children: any;
  pageContext: {
    frontmatter: {
      title: string;
      date: string;
    }
  }
}

const PostLayout: FC<Props> = (props) => {
  const { children, pageContext: {
    frontmatter
  } } = props;

  console.log(props);

  return (
    <Layout>
      <PageContainer
        header={frontmatter}
      >
        {children}
      </PageContainer>
    </Layout>
  );
};

export default PostLayout;
