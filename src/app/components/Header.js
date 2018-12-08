import React from 'react';
import { Layout, Menu,Icon} from 'antd';
const { Header} = Layout;
  
export default () => (
    <div className="header navbar navbar-default" style={{ background: '#fff', padding: 0 }}>
      <div className="container">
          <div className="navbar-header col-xs-6">
          <a className="navbar-brand" href="#">
            <Icon type="instagram" style={{fontSize:30}}/>
          </a>
        </div>
      <Menu
        mode="horizontal"
        className="col-xs-6 text-right hidden-xs"
        // defaultSelectedKeys={['2']}
        style={{ lineHeight: '64px',margin:"auto",float:"right" }}
      >
        <Menu.Item key="2">Sign In</Menu.Item>
        <Menu.Item key="3">Sign Up</Menu.Item>
      </Menu>
      </div>
    </div>
);