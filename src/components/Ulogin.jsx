import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Typography, Box } from "@mui/material";

function Login() {
  const [data, setData] = useState({ username: "", password: "" });
  const [error, setError] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedData = JSON.parse(localStorage.getItem("users"));
    const user = storedData?.find(
      (element) => element.username === data.username && element.password === data.password
    );

    if (user) {
      alert("Login Successful!");
      navigate("/expense");
    } else {
      setError({ username: "Invalid username or password", password: "" });
    }
  };

  return (
    <Box className="flex items-center  justify-center bg-gradient-to-br from-blue-500 to-indigo-700">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-md"
      >
        <Typography variant="h4" className="text-center mb-4 text-gray-800">
          Login
        </Typography>
        <Box className="mb-4">
          <TextField
            fullWidth
            name="username"
            label="Username"
            variant="outlined"
            value={data.username}
            onChange={handleChange}
            error={!!error.username}
            helperText={error.username}
          />
        </Box>
        <Box className="mb-4">
          <TextField
            fullWidth
            name="password"
            label="Password"
            type="password"
            variant="outlined"
            value={data.password}
            onChange={handleChange}
            error={!!error.password}
            helperText={error.password}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-2"
        >
          Login
        </Button>
        <Box className="mt-4 text-center">
          <Typography variant="body2">
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 underline">
              Register
            </a>
          </Typography>
        </Box>
      </form>
    </Box>
  );
}

export default Login;
