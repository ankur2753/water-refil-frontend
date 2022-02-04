import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import useToken from "./components/useToken";
import Deliveries from "./Deliveries";
import AddContainers from "./AddContainers";
function EmployeeHome() {
  const { token } = useToken();
  const navigate = useNavigate();
  const [UserProfile, setUserProfile] = useState([]);
  const [componentNo, setComponentNo] = useState(0);
  useEffect(() => {
    axios
      .get("http://localhost:3000/profile/", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setUserProfile(res.data);
      })
      .catch((error) => {
        if (error.response.status === 403) navigate("/Login");
      });
  }, [navigate, token]);
  return (
    <div>
      <NavBar />
      <h1 className='centre'>
        Welcome, {UserProfile?.fname} {UserProfile?.mname} {UserProfile?.lname}
      </h1>
      {componentNo === 0 && (
        <div className='centre' style={{ margin: 10, padding: 20 }}>
          <h3 className='centre'>What Would you like to do today</h3>
          <button
            onClick={() => {
              setComponentNo(1);
            }}
            className='CTA big'>
            SEE DELIVERIES
          </button>
          <button
            onClick={() => {
              setComponentNo(2);
            }}
            className='GHOST big'>
            ADD NEW CONTAINER
          </button>
        </div>
      )}
      {componentNo === 1 && <Deliveries setComponentNo={setComponentNo} />}
      {componentNo === 2 && <AddContainers setComponentNo={setComponentNo} />}
    </div>
  );
}

export default EmployeeHome;
