import { useNavigate } from "react-router-dom";
import useGetUserById from "../../MatchingFeature/domain/useGetUserById";

const defaultProfileImg = "https://via.placeholder.com/40"; // Replace with your default image URL

export default function UserHeader({ userId, profileOnly = false }) {
  const { user, loading1 } = useGetUserById(userId);
  const navigate = useNavigate();

  const handleClick = () => {
    if (!userId || profileOnly) return; // Prevent navigation when profileOnly is true
    navigate(`/profile/${userId}`);
  };

  if (profileOnly) {
    return (
      <div
        onClick={handleClick}
        style={{
          width: "32px", // Smaller size for profileOnly
          height: "32px",
          borderRadius: "50%",
          overflow: "hidden",
          cursor: profileOnly ? "default" : "pointer",
          border: "2px solid #ccc",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {loading1 ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "3px solid #ccc",
              borderTop: "3px solid #333",
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          <img
            src={user?.imgUrl || defaultProfileImg}
            alt={user?.name || "Unknown User"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}

        {/* Add spinning animation in CSS */}
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  return (
    <div
      onClick={handleClick}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "8px 12px",
        borderRadius: "12px",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
        cursor: "pointer",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        gap: "10px",
        maxWidth: "100%",
        margin: "4px 0",
        fontFamily: "Arial, sans-serif",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(255, 255, 255, 0.8)";
        e.currentTarget.style.boxShadow = "0 2px 6px rgba(0, 0, 0, 0.1)";
      }}
    >
      {/* Profile Image */}
      <div
        style={{
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid #ccc",
        }}
      >
        {loading1 ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: "4px solid #ccc",
              borderTop: "4px solid #333",
              animation: "spin 1s linear infinite",
            }}
          />
        ) : (
          <img
            src={user?.imgUrl || defaultProfileImg}
            alt={user?.name || "Unknown User"}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        )}
      </div>

      {/* User Info */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          fontSize: "14px",
          fontWeight: "bold",
          color: loading1 ? "#888" : "#333",
        }}
      >
        {loading1 ? "Loading..." : user?.name || "Undefined User"}
      </div>
    </div>
  );
}
