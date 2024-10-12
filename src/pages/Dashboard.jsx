import React from 'react';
import { Button, Card, Typography, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { userData, logout, loading } = useAuth(); // Destructure loading

  const handleLogout = async () => {
    await logout();
  };

  if (loading) {
    return <Typography.Text>Loading...</Typography.Text>; // Display loading indicator
  }

  return (
    <Card className="profile-card">
      {userData ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Avatar size={150} icon={<UserOutlined />} className="avatar" />
          <Typography.Title level={2} strong className="username">
            {userData.name}
          </Typography.Title>
          <Typography.Text type="secondary" strong>
            Email: {userData.email}
          </Typography.Text>
          <Typography.Text type="secondary">
            Role: {userData.role}
          </Typography.Text>
          <Button
            size="large"
            type="primary"
            className="profile-btn"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
      ) : (
        <Typography.Text type="danger">User data not available</Typography.Text>
      )}
    </Card>
  );
};

export default Dashboard;
