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

// Tách các component Layout để dùng ngắn gọn
const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const App: React.FC = () => {
  // Trạng thái sidebar có thu gọn hay không
  const [collapsed, setCollapsed] = useState(false);

  // Trạng thái kiểm tra thiết bị có phải mobile (dưới 768px)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Lắng nghe sự kiện resize cửa sổ để cập nhật trạng thái mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setCollapsed(true); // Thu gọn sidebar khi màn hình nhỏ
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Menu dropdown cho người dùng (avatar)
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
        {/* Sidebar điều hướng bên trái */}
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
            {/* Hiển thị logo khi chưa collapsed */}
            {!collapsed && <Title level={4} style={{ margin: '16px', color: '#1890ff' }}>Travel Planner</Title>}
          </div>

          {/* Menu chính cho navigation */}
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

        {/* Phần chính bên phải gồm header và content */}
        <Layout className="site-layout">
          {/* Header cố định phía trên */}
          <Header
            className="site-header"
            style={{
              background: '#fff',
              padding: '0 16px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            {/* Nút toggle thu gọn sidebar */}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="trigger-button"
            />

            {/* Avatar người dùng + Dropdown */}
            <Dropdown overlay={userMenu} placement="bottomRight">
              <Avatar icon={<UserOutlined />} />
            </Dropdown>
          </Header>

          {/* Nội dung chính theo từng route */}
          <Content
            className="site-content"
            style={{
              margin: '16px',
              background: '#fff',
              padding: '24px',
              borderRadius: '8px'
            }}
          >
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
