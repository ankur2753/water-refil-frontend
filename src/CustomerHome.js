import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import NavBar from "./components/NavBar";
import useToken from "./components/useToken";
import Order from "./Order";
import Stats from "./Stats";

export default function CustomerHome() {
  const navigate = useNavigate();
  const { token } = useToken();
  const [userProfile, setUserProfile] = useState(null);
  const [EmpNames, setEmpNames] = useState([]);
  const [OptionVal, setOptionVal] = useState(undefined);
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
    axios
      .get("http://localhost:3000/profile/emp", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((res) => {
        setEmpNames(res.data);
      })
      .catch((error) => {
        if (error.response.status === 403) navigate("/Login");
      });
    //eslint-disable-next-line
  }, []);
  return (
    <>
      <NavBar></NavBar>
      <main style={{ padding: 20 }}>
        <h1 className='centre'>
          Hello, {userProfile?.fname} {userProfile?.lname}
        </h1>
        {componentNo === 0 && (
          <div className='centre'>
            <br />
            <svg
              width='98'
              height='297'
              viewBox='0 0 98 297'
              style={{ margin: 10 }}>
              <path d='M98 222H0V241H98V222Z' fill='var(--blue)' />
              <path
                d='M0 272.582C0 285.547 11.551 297 24.514 297H76.155C89.12 297 98.001 285.547 98.001 272.582V256H0.000999451V272.582H0Z'
                fill='var(--blue)'
              />
              <path d='M98 90H0V207H98V90Z' fill='var(--blue)' />
              <path
                d='M98 71.141C98 58.176 89.119 49 76.154 49H75V35H83V15.374C83 6.65 76.428 0 67.705 0H32.961C24.241 0 17 6.65 17 15.374V35H26V49H24.514C11.551 49 0 58.176 0 71.141V75H98V71.141Z'
                fill='var(--blue)'
              />
              <path
                d='M35.729 155.378C35.729 163.45 42.278 170 50.351 170C58.425 170 64.973 163.45 64.973 155.378C64.973 143.252 50.351 126 50.351 126C50.351 126 35.729 143.252 35.729 155.378Z'
                fill='white'
              />
            </svg>
            <label htmlFor='Organization'>
              Please Select the Organization to Order From
            </label>
            <select
              placeholder='Select any Organization'
              className='big'
              name='Organization'
              defaultValue={"DEFAULT"}
              value={OptionVal}
              onChange={(e) => setOptionVal(e.target.value)}
              style={{ padding: 10 }}>
              <option value='DEFAULT' disabled>
                Select An Employee
              </option>
              {EmpNames.map((emp, index) => (
                <option
                  style={{ letterSpacingSpacing: 13 }}
                  className='big'
                  key={index}
                  value={emp.userID}>
                  {emp.fname}_{emp?.mname}_{emp?.lname}
                </option>
              ))}
            </select>
            <button
              className='CTA big'
              onClick={() => {
                setComponentNo(1);
              }}>
              order new bottle
            </button>
            <button
              onClick={() => {
                setComponentNo(2);
              }}
              className='GHOST big'>
              Get details on previous orders
            </button>
          </div>
        )}
        {componentNo === 1 && (
          <Order setComponentNo={setComponentNo} employee_id={OptionVal} />
        )}
        {componentNo === 2 && <Stats setComponentNo={setComponentNo} />}
      </main>
    </>
  );
}
