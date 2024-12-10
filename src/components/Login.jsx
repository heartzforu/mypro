import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Box, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

function LoginPage({ setIsLoggedIn }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Validation schema
  const validationSchema = Yup.object({
    username: Yup.string()
      .required('Username is required')
      .min(3, 'Username must be at least 3 characters long')
      .max(8, 'Username must be less than 8 characters'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters long')
      .max(10, 'Password must be less than 10 characters'),
  });

  const handleLogin = () => {
    // Validate form inputs
    validationSchema
      .validate({ username, password }, { abortEarly: false })
      .then(() => {
        const users = JSON.parse(localStorage.getItem('users')) || []; // Retrieve registered users
        const user = users.find((user) => user.username === username && user.password === password);

        if (user) {
          localStorage.setItem('isLoggedIn', 'true'); // Mark user as logged in
          setIsLoggedIn(true); // Update parent state
          navigate('/dashboard'); // Redirect to expenses page
        } else {
          alert('Invalid username or password');
        }
      })
      .catch((err) => {
        const validationErrors = err.inner.reduce((acc, curr) => {
          acc[curr.path] = curr.message;
          return acc;
        }, {});
        setErrors(validationErrors); // Set validation errors in state
      });
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 4, padding: 2, boxShadow: 3 }}>
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>

        {/* Username Field */}
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Update username state
          error={Boolean(errors.username)} // Highlight field in case of error
          helperText={errors.username || ''} // Show error message
        />

        {/* Password Field */}
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Update password state
          error={Boolean(errors.password)} // Highlight field in case of error
          helperText={errors.password || ''} // Show error message
        />

        {/* Login Button */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleLogin} // Call login handler on click
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>

        {/* Redirect to Register Page */}
        <Box sx={{ marginTop: 2, textAlign: 'center' }}>
          <Typography variant="body2">
            Don't have an account?{' '}
            <Link href="/register" sx={{ textDecoration: 'none', color: 'primary.main' }}>
              Register
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default LoginPage;