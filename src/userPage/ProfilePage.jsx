import "../userPage/ProfilePage.css";
import { useState } from "react";

export default function ProfilePage() {
  const [user, setUser] = useState({
    name: "Ohad",
    age: 35,
    email: "ohad35@gmail.com",
    password: "12345",
    academicProfession: "engineering",
    culture: "Jewish",
    phoneNumber: "123-456-7890",
    academicInstitution: "University of Haifa",
    typeOfService: "Private classes",
    aboutMe: "Passionate about design and innovation.",
    experience: "year",
    rating: "4.7/5",
    basicStatistics: "10+ projects completed",
    profileImg: "https://via.placeholder.com/150",
    feedback: "daniel: amazing, shara: good",
    isEditing: false,
  });

  const TypeOfService = [
    "Exam preparation",
    "Private lessons",
    "Professional intention",
  ];
  const Culture = ["Arab", "Jewish"];
  const AcademicInstitution = [
    "University of Haifa",
    "Tel Aviv University",
    "The Hebrew University",
    "Technnyon",
  ];
  const areasOfInterest = ["Chess", "Programming", "Cooking"];
  const Experience = ["year", "2-5 years", "5-10 years", "10 and above"];
  const academicProfession = [
    "social science",
    "exact sciences",
    "engineering",
  ];

  function toggleEdit() {
    setUser((prevUser) => {
      const updatedUser = Object.assign({}, prevUser);
      updatedUser.isEditing = !updatedUser.isEditing;
      return updatedUser;
    });
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setUser((prevUser) => {
      return Object.assign({}, prevUser, { [name]: value });
    });
  }

  function handleImgChange(e) {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setUser((prevUser) => {
        return Object.assign({}, prevUser, { profileImg: imgURL });
      });
    }
  }

  return (
    <div className="container">
      <h1>User Profile</h1>

      <div className="square top">
        <div className="profile-img-container">
          <img src={user.profileImg} alt="profileImg" />
        </div>

        <div>
          {user.isEditing && (
            <input
              className="input-file"
              type="file"
              accept="image/*"
              onChange={handleImgChange}
            />
          )}

          <p>Name:</p>
          {user.isEditing ? (
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
          ) : (
            <span>{user.name}</span>
          )}

          <p>Rating: {user.rating}</p>

          <p>About Me:</p>
          {user.isEditing ? (
            <input
              type="text"
              name="aboutMe"
              value={user.aboutMe}
              onChange={handleChange}
            />
          ) : (
            <span>{user.aboutMe}</span>
          )}

          <p>Basic Statistics:</p>
          {user.isEditing ? (
            <input
              type="text"
              name="basicStatistics"
              value={user.basicStatistics}
              onChange={handleChange}
            />
          ) : (
            <span>{user.basicStatistics}</span>
          )}
        </div>
      </div>
      <div className="square">
        <p>
          Phone Number:{" "}
          <a
            href={`https://wa.me/${user.phoneNumber.replace(/-/g, "")}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {user.phoneNumber}
          </a>
        </p>
        <p> email: {user.email}</p>
      </div>

      <div className="square middle">
        <h3>academicProfession: </h3>
        {user.isEditing ? (
          <select
            name="academicProfession"
            value={user.academicProfession}
            onChange={handleChange}
          >
            {academicProfession.map((proffesion, index) => (
              <option key={index} value={proffesion}>
                {proffesion}
              </option>
            ))}{" "}
          </select>
        ) : (
          <p> {user.academicProfession}</p>
        )}

        <h3>Culture: </h3>
        {user.isEditing ? (
          <select name="culture" value={user.culture} onChange={handleChange}>
            {Culture.map((culture, index) => (
              <option key={index} value={culture}>
                {culture}
              </option>
            ))}{" "}
          </select>
        ) : (
          <p> {user.culture}</p>
        )}

        <h3>Academic Institution: </h3>
        {user.isEditing ? (
          <select
            name="academicInstitution"
            value={user.academicInstitution}
            onChange={handleChange}
          >
            {AcademicInstitution.map((academicInstitution, index) => (
              <option key={index} value={academicInstitution}>
                {academicInstitution}
              </option>
            ))}{" "}
          </select>
        ) : (
          <p> {user.academicInstitution}</p>
        )}

        <h3>Type of Service: </h3>
        {user.isEditing ? (
          <select
            name="typeOfService"
            value={user.typeOfService}
            onChange={handleChange}
          >
            {TypeOfService.map((typeOfService, index) => (
              <option key={index} value={typeOfService}>
                {typeOfService}
              </option>
            ))}{" "}
          </select>
        ) : (
          <p> {user.typeOfService}</p>
        )}

        <h3>Experience:</h3>
        {user.isEditing ? (
          <select
            name="experience"
            value={user.experience}
            onChange={handleChange}
          >
            {Experience.map((experience, index) => (
              <option key={index} value={experience}>
                {experience}
              </option>
            ))}{" "}
          </select>
        ) : (
          <p> {user.experience}</p>
        )}
      </div>

      <div className="square bottom">
        <h3>Feedback:</h3>
        <div className="feedback-item">
          <div className="feedback-header">
            <img
              src="https://via.placeholder.com/50"
              alt="Daniel"
              className="feedback-avatar"
            />
            <h5>
              <a href="/profile/daniel" className="feedback-name">
                Daniel
              </a>
            </h5>
          </div>
          <p className="feedback-comment">Amazing professional!</p>
        </div>

        <div className="feedback-item">
          <div className="feedback-header">
            <img
              src="https://via.placeholder.com/50"
              alt="Sarah"
              className="feedback-avatar"
            />
            <h5>
              <a href="/profile/daniel" className="feedback-name">
                Sarah
              </a>
            </h5>
          </div>
          <p className="feedback-comment">Good!</p>
        </div>
      </div>

      <button onClick={toggleEdit}>
        {user.isEditing ? "Save Changes" : "Edit Profile"}
      </button>
    </div>
  );
}
