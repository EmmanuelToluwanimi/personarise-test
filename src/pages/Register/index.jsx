import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerMutation } from "../../hooks/useUser";


export default function Register() {
  const [credentials, setCredentials] = useState({
    email: "",
    username: "",
    password: "",
  });
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();

  const { mutate, data, error, isError, isLoading, isSuccess } = registerMutation();
  const err = error

  useEffect(() => {
    
    displayErrorMessage(err?.message);
  }, [isError])
  

  function validateInputs() {
    const { username, password, email } = credentials;
    if (!email || !username || !password || password.length < 6) {
      return false;
    }
    return true;
  }

  function displayErrorMessage(message) {
    setErrMsg(message);
    setTimeout(() => {
      setErrMsg("");
    }, 3000);
  }

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) {
      displayErrorMessage(
        "Please fill out all fields and password must be at least 6 characters"
      );
      return;
    }

    mutate(credentials);
  };

  useEffect(() => {
    setCredentials({
      email: "",
      username: "",
      password: "",
    });

    if (isSuccess) {
      navigate("/");
    }
  }, [isSuccess]);

  return (
    <main className="bg-blue-200 px-3 pt-[10vh] md:p-10 min-h-screen md:flex items-center justify-center auth-body">
      <div className="shadow py-5 px-3 md:p-10 bg-white rounded-xl md:min-w-[600px]">
        <div className=" pb-5 border-b">
          <div className="font-bold text-2xl text-center">Personarise Demo</div>
        </div>

        <h1 className="font-medium text-center p-3 text-gray-500">
          Create an account now to start integrating our services.
        </h1>

        <form onSubmit={handleSubmit}>

          <div className="mb-6">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Email
            </label>

            <input
              type="email"
              name="email"
              inputMode="email"
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm"
              placeholder="example@test.com"
              value={credentials.email}
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Username
            </label>

            <input
              type="text"
              name="username"
              inputMode="text"
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm"
              placeholder="Please provide a username"
              value={credentials.username}
              required
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              minLength="6"
              className="bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 shadow-sm"
              placeholder="Please provide a password"
              value={credentials.password}
              required
              onChange={handleChange}
            />
            <p className="text-sm text-gray-500 py-1">
              Password must be at least 6 characters
            </p>
          </div>

          {errMsg && (
            <div className="text-red-600 text-center font-medium mb-6">
              {errMsg}
            </div>
          )}

          <div className="mb-6">
            <button
              // disabled={btnpass || loadn}
              type="submit"
              className="text-white transition duration-300 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg w-full px-5 py-2.5 text-center disabled:opacity-50"
            >
              {false ? "Processing..." : "Register"}
            </button>
          </div>
        </form>

        <div className="text-sm font-medium">
          <div>
            Already have account? Login
            <Link to="/login">
              <span className="font-bold ml-1 text-blue-500">here</span>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
