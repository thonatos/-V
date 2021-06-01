const insert = (data: Array<Tree>, node: Tree, uuid?: string) => {
  if (!node) {
    return data;
  }

  if (!uuid) {
    data.push(node);
    return data;
  }

  data.forEach((item) => {
    if (!item.children) {
      return;
    }

    insert(item.children, node, uuid);

    if (item.uuid === uuid) {
      item.children.push(node);
    }
  });

  return data;
};

export const generateTree = (list: Array<Toc>) => {
  const treeData: Array<Tree> = [];
  const parentKeys = new Set<string>();

  list.forEach((toc) => {
    const {
      type, title, url, uuid, parent_uuid,
    } = toc;

    if (parent_uuid) {
      parentKeys.add(parent_uuid);
    }

    const node = {
      title,
      url,
      uuid,
      key: uuid,
    };

    if (type === 'META') {
      return;
    }

    if (type === 'DOC') {
      insert(treeData, node, parent_uuid);
    }

    if (type === 'TITLE') {
      insert(treeData, { ...node, children: [] }, parent_uuid);
    }
  });

  return {
    treeData,
    parentKeys: Array.from(parentKeys),
  };
};

interface Toc {
  url: string;
  uuid: string;
  type: string;
  title: string;
  parent_uuid: string;
}

interface Tree {
  key: string;
  url: string;
  uuid: string;
  title: string;
  children?: Array<Tree>;
}
