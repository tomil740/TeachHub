// UserProfile.js
import { useState, useEffect } from "react";
import { getUserProfile, updateUserProfile } from "../firebase"; // adjust the import path
import { auth } from "../firebase";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setUser(authUser);
        const userProfile = await getUserProfile(authUser.uid);
        setProfile(userProfile || {});
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpdateProfile = async (updatedData) => {
    await updateUserProfile(user.uid, updatedData);
    setProfile(updatedData);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>User Profile</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleUpdateProfile(profile);
        }}
      >
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Profile Image URL"
          value={profile.profileImg}
          onChange={(e) =>
            setProfile({ ...profile, profileImg: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Bio"
          value={profile.bio}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
        />
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={profile.skills.join(", ")}
          onChange={(e) =>
            setProfile({ ...profile, skills: e.target.value.split(", ") })
          }
        />
        <input
          type="text"
          placeholder="Services Offered (comma separated IDs)"
          value={profile.servicesOffered.join(", ")}
          onChange={(e) =>
            setProfile({
              ...profile,
              servicesOffered: e.target.value.split(", "),
            })
          }
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
