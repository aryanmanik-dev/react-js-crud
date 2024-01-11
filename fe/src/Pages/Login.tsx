import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigateTo = useNavigate();

  const handleLogin = () => {
    const hardcodedEmail = "test@example.com";
    const hardcodedPassword = "password123";

    // Check if the entered credentials match the hardcoded values
    if (email === hardcodedEmail && password === hardcodedPassword) {
      alert("Login successful!");
      navigateTo('/scheduler')
    } else {
      alert("Invalid email or password");
    }
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 mx-auto mt-5">
          <h1 className="text-center">Login !</h1>
          <form>
            <div className="form-outline mb-4">
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label">Email address</label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label">Password</label>
            </div>

            <button
              type="button"
              className="btn btn-primary btn-block mb-4"
              onClick={handleLogin}
            >
              Log in
            </button>
          </form>

          <div>
            Email : test@example.com
            <br />
            Password : password123
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
