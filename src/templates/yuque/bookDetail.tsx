import React, { FC } from 'react';
import { Tree } from 'antd';
import { graphql, PageProps, navigate } from 'gatsby';

import Layout from '@/layouts/default';
import Detail from '@/components/page/Detail';
import { generateTree } from '@/util';

const prefixPath = '/book';

export const yuqueBookQuery = graphql`
  query($id: String!) {
    yuqueBookDetail(id: {eq: $id }) {
      id
      name
      slug
    } 
  }
`;

const YuqueBookTemplate: FC<Props> = (props) => {
  const {
    data,
    pageContext: {
      toc,
    },
  } = props;

  const {
    slug: bookSlug,
  } = data.yuqueBookDetail;

  const { treeData, parentKeys } = generateTree(toc);

  const handleClick = (keys: any, event: any) => {
    const { node: { url } } = event;
    const target = `${prefixPath}/${bookSlug}/${url}`;

    navigate(target);
  };

  return (
    <Layout title="Book">
      <Detail>
        <Tree
          autoExpandParent
          defaultExpandedKeys={parentKeys}
          treeData={treeData}
          showLine
          onSelect={handleClick}
        />
      </Detail>
    </Layout>
  );
};

export default YuqueBookTemplate;

interface Props extends PageProps {
  data: {
    allYuqueDoc: {
      totalCount: number;
      nodes: Array<{
        id: number;
        slug: string;
        title: string;
        description: string;
        status: number;
        created_at: Date;
        word_count: number;
      }>
    };
    yuqueBookDetail: {
      id: string;
      slug: string;
      name: string;
    };
  };
  pageContext: {
    id: string;
    slug: string;
    toc: any;
    _id: number;
  };

}
