import { Card, Typography, Form, Button, Input, Alert, Spin } from "antd"; // Importing components from Ant Design
import { Link } from "react-router-dom"; // Importing Link component for routing
import RegisterImage from "../assets/vecteezy_3d-male-character-pointing-right_24132264.png"; // Importing registration image
import useSignup from "../hooks/useSignup"; // Custom hook for handling signup logic

const Register = () => {
  // Correct destructuring: useSignup likely returns an object
  const { error, loading, registerUser } = useSignup();

  // Handle form submission
  const handleRegister = (values) => {
    // Reset the error before submission (if necessary)
    console.log(values); // Log form values for debugging
    registerUser(values); // Call the registerUser function with form values to handle registration
  };

  return (
    <Card className="form-container"> {/* Main card container for the registration form */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {/* Form Section */}
        <div style={{ flex: 1, paddingRight: "20px" }}>
          <Typography.Title level={3} className="title">
            Create an account
          </Typography.Title>
          <Typography.Text type="secondary" className="slogan">
            Join for exclusive access!
          </Typography.Text>

          {/* Form for user registration */}
          <Form layout="vertical" onFinish={handleRegister} autoComplete="off">
            <Form.Item
              label="Full Name"
              name="fullname"
              rules={[{ required: true, message: "Please input your full name!" }]} // Validation rule
            >
              <Input placeholder="Enter your full name" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]} // Validation rule
            >
              <Input placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: "Enter your password!" }]} // Validation rule
            >
              <Input.Password placeholder="Enter your password" />
            </Form.Item>

            <Form.Item
              label="Confirm Password"
              name="passwordConfirm"
              rules={[{ required: true, message: "Re-enter your password!" }]} // Validation rule
            >
              <Input.Password placeholder="Re-enter your password" />
            </Form.Item>

            {/* Show error message if there's an error */}
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
                type={loading ? 'default' : 'primary'} // Change button type based on loading state
                htmlType="submit" 
                size="large" 
                className="btn"
                disabled={loading} // Disable button when loading
              >
                {loading ? <Spin size="small" /> : 'Create Account'} {/* Show loading spinner when loading */}
              </Button>
            </Form.Item>
          </Form>

          {/* Link to login page */}
          <Form.Item>
            <Link to="/login" className="link">
              <Button type="default" size="large" className="btn">
                Sign In
              </Button>
            </Link>
          </Form.Item>
        </div>

        {/* Image Section */}
        <div style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
          <img src={RegisterImage} alt="Register" className="auth-image" /> {/* Displaying registration image */}
        </div>
      </div>
    </Card>
  );
};

export default Register; // Exporting the Register component
