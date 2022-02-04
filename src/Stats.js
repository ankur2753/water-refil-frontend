import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToken from "./components/useToken";
export default function Stats({ setComponentNo }) {
  const { token } = useToken();
  const navigate = useNavigate();
  const [prevOrders, setPrevOrders] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/deliveries/prev", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((response) => {
        if (Array.isArray(response.data)) setPrevOrders(response.data);
      })
      .catch((error) => {
        if (error.response.status === 403) navigate("/Login");
      });
  }, [navigate, token]);
  if (prevOrders.length > 0)
    return (
      <div>
        <button
          onClick={() => {
            setComponentNo(0);
          }}
          className='GHOST'>
          BACK
        </button>
        {prevOrders.map((order) => (
          <div
            key={order.id}
            className='centre'
            style={{
              border: "2px solid hsl(203,80%,90%)",
              padding: 10,
              margin: 10,
            }}>
            ContainerID{"\t\t:"} {order?.containerID}
            <br />
            Status {"\t:"}
            {order?.isCompleted ? "Delivered" : "Delivery Pending"}
            <br />
            Quantity {"\t\t:"}
            {order?.quantity}
          </div>
        ))}
      </div>
    );
  else
    return (
      <div className='centre'>
        <h1>OOPs no order Found</h1>
        Try Ordering First
      </div>
    );
}
