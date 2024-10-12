import React, { useState } from "react";
import { Card, Typography, Form, Button, Input, Alert } from "antd";
import { Link } from "react-router-dom";
import RegisterImage from "../assets/vecteezy_3d-male-character-pointing-right_24132264.png";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { loading, error, loginUser } = useLogin(); // Correct destructuring

  const handleLogin = async (values) => {
    // Since this is a login form, password confirmation isn't needed
    await loginUser(values);
    console.log(values);
    // Further processing logic for login can go here
  };

  return (
    <Card className="form-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Form */}
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <Typography.Title level={3} className="title">
            Sign In
          </Typography.Title>
          <Typography.Text type="secondary" className="slogan">
            Unlock your world!
          </Typography.Text>

          <Form layout="vertical" onFinish={handleLogin} autoComplete="off">
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Enter your password!" }]}
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            {error && (
              <Alert
                description={error}
                type="error"
                showIcon
                closable
                className="alert"
              />
            )}

            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                size="large" 
                className="btn" 
                loading={loading} // Show loading spinner on the button
                disabled={loading} // Disable button while loading
              >
                Sign In
              </Button>
            </Form.Item>
          </Form>

          <Form.Item>
            <Link to="/" className="link">
              <Button type="default" size="large" className="btn">
                Create an account 
              </Button>
            </Link>
          </Form.Item>
        </div>

        {/* Image */}
        <div style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
          <img src={RegisterImage} alt="Register" className="auth-image" />
        </div>
      </div>
    </Card>
  );
};

export default Login;
