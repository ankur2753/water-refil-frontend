import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import useToken from "./components/useToken";

export default function Login() {
  const { setToken } = useToken();
  const navigate = useNavigate();
  let [wrongAuth, setWrongAuth] = useState(false);
  const handleSubmit = (username, password) => {
    axios
      .post("http://localhost:3000/signIn", {
        username,
        password,
      })
      .then((res) => {
        if (res.data.token) {
          setToken(res.data);
          navigate("/Home");
        }
        if (!res.data.token) {
          setWrongAuth(true);
        }
      })
      .catch((error) => {
        if (error.status === 401) setWrongAuth(true);
      });
  };

  return (
    <>
      <NavBar>
        <section>About us</section>
      </NavBar>
      <main className='centre'>
        <h1>LOGIN TO YOUR ACCOUNT</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let { username, password } = e.target;
            username = username.value;
            password = password.value;
            if (!username || !password) {
              setWrongAuth(true);
              return;
            }
            handleSubmit(username, password);
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px 0 20px 0",
            width: "324px",
            padding: "0",
          }}>
          <label
            style={{ color: wrongAuth ? "var(--error-red)" : "white" }}
            htmlFor='username'>
            Username :
          </label>
          <input
            name='username'
            placeholder=' enter your username'
            type='text'
            className='underline'
            style={{
              borderColor: wrongAuth ? "var(--error-red)" : "white",
              padding: 15,
            }}
          />
          <label
            style={{ color: wrongAuth ? "var(--error-red)" : "white" }}
            htmlFor='password'>
            Password :
          </label>
          <input
            name='password'
            placeholder=' enter your password'
            type='password'
            className='underline'
            style={{
              borderColor: wrongAuth ? "var(--error-red)" : "white",
              padding: 15,
            }}
          />
          <span
            style={{
              color: "var(--error-red)",
              display: wrongAuth ? "block" : "none",
            }}>
            Wrong id or password please try again
          </span>
          <button type='submit' className='CTA big'>
            LOGIN
          </button>
        </form>
        <hr style={{ width: "50vw", marginBottom: "12px" }} />
        OR
        <br />
        <Link to='/signup'>
          <button className='GHOST big'> SIGNUP</button>
        </Link>
      </main>
    </>
  );
}
