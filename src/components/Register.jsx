import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    username: yup.string().required("Please select a username"),
    email: yup.string().email("Invalid email").required("Email is required"),
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
      navigate("/login");
    } catch (err) {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrors(newErrors);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-teal-100 to-teal-100">
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg max-w-lg w-full backdrop-blur-md ">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Create a New Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg mt-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-2">{errors.name}</p>
            )}
          </div>

          <div>
            <label htmlFor="username" className="block text-lg text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={data.username}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg mt-2 ${
                errors.username ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-2">{errors.username}</p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-lg text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg mt-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-2">{errors.email}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={handleChange}
              className={`w-full p-3 border-2 rounded-lg mt-2 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-lg hover:bg-gradient-to-r hover:from-teal-600 hover:to-blue-600"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}

export default Register;
