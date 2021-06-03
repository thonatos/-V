import React from 'react';
import { navigate } from 'gatsby';
import { Menu, Dropdown } from 'antd';
import { BarsOutlined } from '@ant-design/icons';
import { useResponsive } from 'ahooks';

const NavMenu: React.FC<Props> = (props) => {
  const { navMenus } = props;

  const handleNav = ({ key }: any) => {
    if (!key) {
      return;
    }
    navigate(key);
  };

  const responsive = useResponsive() || {};
  const isLarge = responsive.large;

  const pageMenu = (
    <Menu
      theme="light"
      mode={isLarge ? 'horizontal' : 'vertical'}
      onClick={handleNav}
    >
      {
        navMenus.map(({ name, link }) => <Menu.Item key={link}>{name}</Menu.Item>)
      }
    </Menu>
  );

  if (isLarge) {
    return pageMenu;
  }

  return (
    <Dropdown overlay={pageMenu} trigger={['click']}>
      <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
        <BarsOutlined />
      </a>
    </Dropdown>
  );
};

export default NavMenu;

interface Props {
  navMenus: Array<{
    name: string;
    link: string;
  }>
}
