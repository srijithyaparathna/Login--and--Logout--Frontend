import { useState } from 'react'; // Import useState hook from React
import { message } from 'antd'; // Import the message component from Ant Design for notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate for programmatic navigation

const useSignup = () => {
  const [error, setError] = useState(null); // State to hold any error messages
  const [loading, setLoading] = useState(false); // State to indicate loading status, initialized to false
  const navigate = useNavigate(); // Get navigate function from react-router-dom for redirection

  // Function to register a user
  const registerUser = async (values) => {
    // Check if the password and password confirmation match
    if (values.password !== values.passwordConfirm) {
      return setError('Passwords do not match'); // Set error message if they don't match
    }

    try {
      setError(null); // Reset error state before making the request
      setLoading(true); // Set loading to true when starting the request

      // Transform values to include name instead of fullname
      const { fullname, ...rest } = values; // Destructure fullname from values
      const payload = { name: fullname, ...rest }; // Create payload with name

      // Send a POST request to the signup API
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },
        body: JSON.stringify(payload), // Convert the modified payload to JSON for the request body
      });

      // Parse the JSON response
      const data = await res.json();

      // Check the response status
      if (res.status === 201) {
        message.success(data.message); // Display success message if registration is successful
        navigate('/login'); // Redirect to login page after successful signup
      } else {
        setError(data.message || 'Registration failed'); // Set error message if there's a bad request
        message.error(data.message || 'Registration failed'); // Display error message
      }
    } catch (error) {
      message.error('An error occurred during registration'); // Display error message for any exceptions
      setError(error.message); // Set the error state to the caught error message
    } finally {
      setLoading(false); // Set loading to false after the request is completed
    }
  };

  // Return the loading state, error message, and registerUser function for use in components
  return {
    loading,
    error,
    registerUser,
  };
};

export default useSignup; // Export the useSignup hook for use in other components
