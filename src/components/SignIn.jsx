import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../redux/userSlice";
import "../styles/SignIn.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.user);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !password) {
      alert("Please fill in both email and password.");
      return;
    }
    console.log("Submitting credentials:", { email, password }); // Vérifiez
    //  les données envoyées
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    console.log("Token in useEffect:", token); // Vérifiez
    // si le token est défini
    if (token) {
      navigate("/user");
    }
  }, [token, navigate]);

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="sign-in-button" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
          {error && <p className="error">{error.message || error}</p>}
        </form>
      </section>
    </main>
  );
};

export default SignIn;
