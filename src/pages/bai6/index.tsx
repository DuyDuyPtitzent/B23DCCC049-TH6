// App.tsx (bản đã chỉnh sáng + tối ưu UX)
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, NavLink, Switch } from 'react-router-dom';
import { Layout, Menu, Button, Avatar, Dropdown, Typography } from 'antd';
import {
  HomeOutlined, CompassOutlined, CalendarOutlined,
  WalletOutlined, UserOutlined, SettingOutlined,
  LogoutOutlined, MenuUnfoldOutlined, MenuFoldOutlined
} from '@ant-design/icons';
import DiscoverPage from './DiscoverPage';
import ItineraryPlanner from './ItineraryPlanner';
import BudgetManager from './BudgetManager';
import AdminPage from './AdminPage';


const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const userMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        Hồ sơ cá nhân
      </Menu.Item>
      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Cài đặt
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        Đăng xuất
      </Menu.Item>
    </Menu>
  );

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          breakpoint="lg"
          collapsedWidth={isMobile ? 0 : 80}
          className="app-sider"
          theme="light"
        >
          <div className="logo">
            {!collapsed && <Title level={4} style={{ margin: '16px', color: '#1890ff' }}>Travel Planner</Title>}
          </div>
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<CompassOutlined />}>
              <NavLink to="/" exact activeClassName="active-link">Khám phá</NavLink>
            </Menu.Item>
            <Menu.Item key="2" icon={<CalendarOutlined />}>
              <NavLink to="/itinerary" activeClassName="active-link">Lịch trình</NavLink>
            </Menu.Item>
            <Menu.Item key="3" icon={<WalletOutlined />}>
              <NavLink to="/budget" activeClassName="active-link">Ngân sách</NavLink>
            </Menu.Item>
            <Menu.Item key="4" icon={<SettingOutlined />}>
              <NavLink to="/admin" activeClassName="active-link">Quản trị</NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-header" style={{ background: '#fff', padding: '0 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="trigger-button"
            />
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </Header>
          <Content className="site-content" style={{ margin: '16px', background: '#fff', padding: '24px', borderRadius: '8px' }}>
            <Switch>
              <Route path="/" exact component={DiscoverPage} />
              <Route path="/itinerary" component={ItineraryPlanner} />
              <Route path="/budget" component={BudgetManager} />
              <Route path="/admin" component={AdminPage} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;