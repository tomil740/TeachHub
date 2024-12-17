import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUpForm from "./Authentication/SignUpForm";
import SignInForm from "./Authentication/SignInForm";
import UserProfile from "./Authentication/UserProfile";

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignInForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/" element={<SignInForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
