import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token || token === "null") {
      console.log("No valid token found");
      return;
    }

    fetch("http://localhost:3000/admin/me", {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.status === 403) {
          console.error("Access forbidden. Invalid token.");
          localStorage.removeItem("token");
          navigate("/signin");
          throw new Error("Access forbidden");
        }
        return res.json();
      })
      .then((data) => {
        if (data.username) {
          setUserEmail(data.username);
        }
      })
      .catch((error) => {
        console.error("Error fetching admin data:", error);
      });
  }, [navigate]);

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h6">Course Selling</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/addcourse");
                }}
              >
                Add course
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                onClick={() => {
                  navigate("/courses");
                }}
              >
                Courses
              </Button>
            </div>

            <Button
              variant="contained"
              onClick={() => {
                localStorage.removeItem("token");
                window.location = "/";
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
        }}
      >
        <div style={{ marginLeft: 10 }}>
          <Typography variant="h6">Coursera</Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/signup");
              }}
            >
              Signup
            </Button>
          </div>
          <div>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/signin");
              }}
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Appbar;
