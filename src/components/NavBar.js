import "./NavBar.css";
import LOGO from "./LOGO";
import { useNavigate } from "react-router-dom";
import useToken from "./useToken";
export default function NavBar({ children }) {
  const navigate = useNavigate();
  const { token, logOut } = useToken();
  return (
    <nav>
      <LOGO />
      {children}
      {token && (
        <section
          style={{ cursor: "pointer" }}
          onClick={() => {
            logOut();
            navigate("/Login");
          }}>
          Logout
        </section>
      )}
    </nav>
  );
}
