import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import useToken from "./components/useToken";

export default function SignUp() {
  const { setToken } = useToken();
  const [match, setmatch] = useState(true);
  const [isCustomer, setCustomer] = useState(true);
  const nav = useNavigate();
  return (
    <main className='centre'>
      <h1>WELCOME TO WATER REFIL SYSTEM</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let { username, password, pass2 } = e.target;
          username = username.value;
          pass2 = pass2.value;
          password = password.value;
          if (pass2 !== password) {
            setmatch(false);
            return;
          }
          axios
            .post("http://localhost:3000/signUp", {
              username,
              password,
              isCustomer,
            })
            .then((response) => {
              if (response.data.success) {
                setToken(response.data);
                nav("/CreateProfile");
              }
            })
            .catch((error) => {
              console.dir(error);
              if (error.response.status === 403) nav("/Login");
            });
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "20px 0 20px 0",
          width: "324px",
        }}>
        <div
          style={{
            display: "flex",
            borderRadius: 15,
            border: "2px solid white",
          }}>
          <div
            onClick={() => {
              setCustomer(true);
            }}
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              padding: 20,
              borderRadius: 15,
              background: isCustomer ? "var(--gay-gradient)" : "transparent",
            }}>
            Customer
          </div>
          <div
            onClick={() => {
              setCustomer(false);
            }}
            style={{
              display: "flex",
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              padding: 20,
              borderRadius: 15,
              background: !isCustomer ? "var(--gay-gradient)" : "transparent",
            }}>
            Employee
          </div>
        </div>
        <label htmlFor='username'>Username</label>
        <input
          name='username'
          style={{ padding: 10 }}
          placeholder=' enter your Username'
          type='text'
        />
        <span
          style={{
            display: !match ? "block" : "none",
            color: "var(--error-red)",
            padding: 10,
          }}>
          Passwords did not match try again
        </span>
        <label htmlFor='password'>Password</label>
        <input
          style={{
            borderColor: "var(--error-red)",
            borderWidth: !match ? 3 : 0,
            padding: 10,
          }}
          name='password'
          placeholder=' enter your Password'
          type='Password'
        />
        <label htmlFor='pass2'>Re-enter Your Password</label>
        <input
          name='pass2'
          style={{ padding: 10 }}
          placeholder='confirm password'
          type='password'
        />
        <button type='submit' className='CTA big'>
          SignUP
        </button>
      </form>
      <hr style={{ width: "700px", marginBottom: "12px" }} />
      OR
      <Link to='/login'>
        <button className='GHOST big'> LOGIN</button>
      </Link>
    </main>
  );
}
