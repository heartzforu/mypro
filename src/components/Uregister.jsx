import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Please select a username"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup
      .string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(data, { abortEarly: false });
      setErrors({});

      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      localStorage.setItem("users", JSON.stringify([...existingUsers, data]));

      alert("Registration Successful!");
      navigate("/login")
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    
    <Box className=" flex items-center justify-center bg-gradient-to-br from-green-500 to-teal-500">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg"
      >
        <Typography variant="h4" className="text-center mb-4 text-gray-800">
          Register
        </Typography>
        <Box className="grid grid-cols-1 gap-4">
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={data.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={data.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={data.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
          />
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            value={data.phone}
            onChange={handleChange}
            error={!!errors.phone}
            helperText={errors.phone}
          />
          <TextField
            className="mb-4"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={data.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white mt-6 py-2"
        >
          Register
        </Button>
        <Box className="mt-4 text-center">
          <Typography variant="body2">
            Already have an account?{" "}
            <a href="/login" className="text-green-600 underline hover:text-red-400">
              Login
            </a>
          </Typography>
        </Box>
      </form>
    </Box>
   
  );
}

export default Register;
