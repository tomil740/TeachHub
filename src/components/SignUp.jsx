import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const SignUp = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const [religion, setReligion] = useState("");
  const [dob, setDob] = useState("");
  const [education, setEducation] = useState("");
  const [experience, setExperience] = useState("");
  const [profession, setProfession] = useState("");

  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
    } else {
      setError("");
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!religion) {
      setError("Please select your religion.");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        name: name,
        email: email,
        religion: religion,
        dob: dob,
        education: education,
        experience: experience,
        profession: profession,
        coins: 0,
      });
      // Redirect to login page
      navigate("/");
    } catch (err) {
      setError("Failed to create an account. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {step === 1 && (
          <>
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
              Sign Up
            </h2>
            <form onSubmit={handleContinue} className="space-y-4">
              {/* Name Field */}
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Confirm Password Field */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-md border py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}

              {/* Continue Button */}
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
              >
                Continue
              </button>
            </form>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="mb-6 text-center text-2xl font-bold text-gray-700">
              Additional Information
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Religion Field */}
              <div>
                <label
                  htmlFor="religion"
                  className="block text-sm font-medium text-gray-700"
                ></label>
                <select
                  id="religion"
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select your religion
                  </option>
                  <option value="Jewish">Jewish</option>
                  <option value="Arab">Arab</option>
                </select>
              </div>

              {/* Date of Birth Field */}
              <div>
                <input
                  type="date"
                  placeholder="Date of Birth"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Education Field (Updated to Select Spinner) */}
              <div>
                <label
                  htmlFor="education"
                  className="block text-sm font-medium text-gray-700"
                >
                  Education
                </label>
                <select
                  id="education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select your education
                  </option>
                  <option value="Technion - Israel Institute of Technology">
                    Technion - Israel Institute of Technology
                  </option>
                  <option value="Tel Aviv University (TAU)">
                    Tel Aviv University (TAU)
                  </option>
                  <option value="Hebrew University of Jerusalem">
                    Hebrew University of Jerusalem
                  </option>
                  <option value="Bar-Ilan University (BIU)">
                    Bar-Ilan University (BIU)
                  </option>
                  <option value="Ben-Gurion University of the Negev (BGU)">
                    Ben-Gurion University of the Negev (BGU)
                  </option>
                  <option value="University of Haifa">
                    University of Haifa
                  </option>
                  <option value="Weizmann Institute of Science">
                    Weizmann Institute of Science
                  </option>
                  <option value="Open University of Israel">
                    Open University of Israel
                  </option>
                  <option value="Ariel University">Ariel University</option>
                  <option value="Reichman University (formerly IDC Herzliya)">
                    Reichman University (formerly IDC Herzliya)
                  </option>
                </select>
              </div>

              {/* Profession Field (Updated to Select Spinner) */}
              <div>
                <label
                  htmlFor="profession"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profession
                </label>
                <select
                  id="profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="" disabled>
                    Select your profession
                  </option>
                  <option value="Digital Marketing">Digital Marketing</option>
                  <option value="Graphic Design">Graphic Design</option>
                  <option value="Video Editing">Video Editing</option>
                  <option value="Full-Stack Development">
                    Full-Stack Development
                  </option>
                  <option value="Front-End Development">
                    Front-End Development
                  </option>
                  <option value="Back-End Development">
                    Back-End Development
                  </option>
                  <option value="Basic Programming">Basic Programming</option>
                  <option value="Data Analysis">Data Analysis</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Mobile App Development">
                    Mobile App Development
                  </option>
                </select>
              </div>

              {/* Experience Field */}
              <div>
                <input
                  type="text"
                  placeholder="Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {/* Error Message */}
              {error && (
                <p className="text-center text-sm text-red-500">{error}</p>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUp;
