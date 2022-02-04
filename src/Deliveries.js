import React, { useState, useEffect } from "react";
import axios from "axios";
import useToken from "./components/useToken";
import { useNavigate } from "react-router-dom";

const Deliveries = ({ setComponentNo }) => {
  const { token } = useToken();
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [Completed, setCompleted] = useState(false);
  const handleComplition = (deliveryID) => {
    axios
      .post(
        "http://localhost:3000/deliveries/toggleStatus",
        {
          id: deliveryID,
        },
        { headers: { "x-auth-token": token } }
      )
      .then((response) => {
        if (response.data.success) {
          setDeliveries(
            deliveries.map((del) => {
              if (del.id === deliveryID) del.isCompleted = !del.isCompleted;
              return del;
            })
          );
          setCompleted(!Completed);
        }
      })
      .catch((error) => {
        if (error.status === 403) navigate("/Login");
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3000/deliveries/emp", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((resposne) => {
        setDeliveries(resposne.data);
      })
      .catch((error) => {
        if (error.resposne.status === 403) {
          navigate("/Login");
        }
      });
  }, [navigate, token]);

  return (
    <>
      <button
        onClick={() => {
          setComponentNo(0);
        }}
        className='GHOST'
        style={{ padding: 10 }}>
        BACK
      </button>
      <div
        className='centre'
        style={{
          display: "flex",
          borderRadius: 15,
          border: "1px solid hsl(203,100%,70%)",
          marginInline: 100,
          flexDirection: "row",
        }}>
        <div
          onClick={() => {
            setCompleted(true);
          }}
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: 20,
            borderRadius: 15,
            background: Completed ? "var(--gay-gradient)" : "transparent",
          }}>
          Pending
        </div>
        <div
          onClick={() => {
            setCompleted(false);
          }}
          style={{
            display: "flex",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            padding: 20,
            borderRadius: 15,
            background: !Completed ? "var(--gay-gradient)" : "transparent",
          }}>
          Completed
        </div>
      </div>
      {deliveries
        .filter((bruh) => bruh.isCompleted ^ Completed)
        .map((del) => (
          <DeliveryCard
            key={del.id}
            customerID={del.customerID}
            isCompleted={del.isCompleted}
            handleComplition={handleComplition}
            deliveryID={del.id}
            containerID={del.containerID}
          />
        ))}
      ;
    </>
  );
};

function DeliveryCard({
  customerID,
  deliveryID,
  isCompleted,
  handleComplition,
  containerID,
}) {
  return (
    <div
      style={{
        margin: 15,
        padding: 25,
        border: "2px solid hsl(203,100%,80%)",
      }}
      className='centre'>
      <h3>
        A delivery for customerID: {customerID} is{" "}
        {isCompleted ? "completed" : "pending"} regarding Container No:
        {containerID}
      </h3>

      <button className='CTA big' onClick={() => handleComplition(deliveryID)}>
        Toggle Status
      </button>
    </div>
  );
}
export default Deliveries;
