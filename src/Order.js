import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import useToken from "./components/useToken";

export default function Order({ setComponentNo, employee_id }) {
  const { token } = useToken();
  const navigate = useNavigate();
  const [containers, setContainers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/containers/spare", {
        headers: {
          "x-auth-token": token,
          employee_id,
        },
      })
      .then((response) => {
        if (response.data.length > 0) setContainers(response.data);
      })
      .catch((error) => {
        if (error.response.status === 403) navigate("/Login");
      });
    //eslint-disable-next-line
  }, []);
  if (employee_id === undefined)
    return (
      <div className='centre' style={{ margin: 50 }}>
        <h1>
          Please
          <button
            onClick={() => {
              setComponentNo(0);
            }}
            style={{
              padding: 9,
              background: "hsl(203,100%,50%)",
              color: "hsl(203,100%,95%)",
              marginInline: 10,
              border: "2px solid var(--blue)",
              cursor: "pointer",
              borderRadius: 10,
            }}>
            Go Back
          </button>
          And Select an Organization Before Continuing
        </h1>
      </div>
    );
  return (
    <>
      <button
        style={{ padding: 10 }}
        className='GHOST'
        onClick={() => {
          setComponentNo(0);
        }}>
        BACK
      </button>
      <div className='centre'>
        <h1>place a new order here</h1>
        <div style={{ margin: 10 }}>
          <h3>Select From Available Containers Below</h3>
          {containers.map(({ id, unitPrice, quantity }) => (
            <OrderCard
              key={id}
              id={id}
              price={unitPrice}
              quantity={quantity}
              token={token}
              conatners={containers}
              setContainers={setContainers}
              employee_id={employee_id}
            />
          ))}
          {containers.length < 1 && (
            <div className='blur-card' style={{ margin: 20, padding: 20 }}>
              Sorry The Employee Dosent have any spare containers to sell
            </div>
          )}
        </div>
      </div>
    </>
  );
}
function OrderCard({
  id,
  price,
  quantity,
  token,
  conatners,
  setContainers,
  employee_id,
}) {
  return (
    <div
      className='centre'
      style={{
        border: "2px solid var(--blue)",
        margin: 10,
        padding: 10,
        color: "hsl(203,100%,70%)",
        width: "100%",
        borderRadius: 10,
      }}>
      GET {quantity} ltr For
      <button
        onClick={() => {
          axios
            .post(
              "http://localhost:3000/transactions",
              {
                container_id: id,
                employee_id,
              },
              {
                headers: {
                  "x-auth-token": token,
                },
              }
            )
            .then((response) => {
              if (response.data.success)
                setContainers(conatners.filter((bottle) => bottle.id !== id));
            });
        }}
        className='CTA'
        style={{ padding: 15, margin: 5, backdropFilter: "blue(20px)" }}>
        ₹{price}
      </button>
    </div>
  );
}
