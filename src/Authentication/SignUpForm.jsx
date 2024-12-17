// SignUpForm.js
import { useState } from "react";
import { signUp } from "../firebase"; // adjust the import path

const SignUpForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [bio, setBio] = useState("");
  const [skills, setSkills] = useState([]);
  const [servicesOffered, setServicesOffered] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signUp(
      email,
      password,
      name,
      profileImg,
      bio,
      skills,
      servicesOffered,
    );
  };

  return (
    <form
      style={{ display: "flex", flexDirection: "column" }}
      onSubmit={handleSubmit}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Profile Image URL"
        value={profileImg}
        onChange={(e) => setProfileImg(e.target.value)}
      />
      <input
        type="text"
        placeholder="Bio"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />
      <input
        type="text"
        placeholder="Skills (comma separated)"
        value={skills.join(", ")}
        onChange={(e) => setSkills(e.target.value.split(", "))}
      />
      <input
        type="text"
        placeholder="Services Offered (comma separated IDs)"
        value={servicesOffered.join(", ")}
        onChange={(e) => setServicesOffered(e.target.value.split(", "))}
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
