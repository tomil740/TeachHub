import "../userPage/ProfilePage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserPreview from "./components/UserPreview";
import UserInfo from "./components/UserInfo";
import AttributeContainer from "./components/AttributeContainer";
import categorizeUsers from "../FirebaseFunctions/FetchFilteredData"; // Adjust the path

function ProfilePage() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const categorizedData = await categorizeUsers();
        const users = Object.values(categorizedData).flat();
        console.log("All Users:", users); // Debugging
        setAllUsers(users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching and categorizing users:", error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const profile = allUsers.find((user) => String(user.id) === String(id));

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  const TypeOfService = [
    "Digital Marketing",
    "Graphic Design",
    "Video Editing",
  ];
  const TypeOfSkills = ["Python", "JavaScript", "C", "React", "CSS"];

  function toggleEdit() {
    setIsEditing((prev) => !prev);
  }

  const handleDropdownChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  return (
    <div className="container">
      <div className="pageHeader">
        <h1 className="section-header">User Profile</h1>
        <button onClick={toggleEdit}>
          {isEditing ? "Save Changes" : "Edit Profile"}
        </button>
      </div>
      <article className="HeroSection">
        <UserPreview
          user={profile}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
        <UserInfo
          user={profile}
          isEditing={isEditing}
          onEdit={handleDropdownChange}
        />
      </article>
      <h1 className="section-header">My services</h1>
      <AttributeContainer
        user={profile}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"typeOfService"}
        options={TypeOfService}
      />
      <h1 className="section-header">My skills</h1>
      <AttributeContainer
        user={profile}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"MySkills"}
        options={TypeOfSkills}
      />
    </div>
  );
}
export default ProfilePage;
