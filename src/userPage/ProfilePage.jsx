import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserPreview from "./components/UserPreview";
import UserInfo from "./components/UserInfo";
import AttributeContainer from "./components/AttributeContainer";
import categorizeUsers from "../FirebaseFunctions/FetchFilteredData";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";

function ProfilePage() {
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [loggedInUserId, setLoggedInUserId] = useState(null);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedInUserId(user.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const categorizedData = await categorizeUsers();
        const users = Object.values(categorizedData).flat();
        console.log("All Users:", users);
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

  const showEditButton = String(loggedInUserId) === String(id);

  return (
    <div className="pagePadding container mx-auto pt-20">
      <div id="pageHeader" className="mb-4 flex items-center justify-between">
        <h1 className="mb-4 text-lg font-bold md:text-xl">User Profile</h1>
        {showEditButton && (
          <button
            className="rounded bg-blue-500 px-8 py-1 text-base font-bold text-white transition hover:bg-blue-600"
            onClick={toggleEdit}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        )}
      </div>
      <article className="grid grid-cols-1 gap-6 py-4 md:grid-cols-[67%_30%]">
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
      <h1 className="mb-4 pt-20 text-lg font-bold md:text-xl">My services</h1>
      <AttributeContainer
        user={profile}
        isEditing={isEditing}
        onEdit={handleDropdownChange}
        listKey={"typeOfService"}
        options={TypeOfService}
      />
      <h1 className="mb-4 pt-20 text-lg font-bold md:text-xl">My skills</h1>
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
