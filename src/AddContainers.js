import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import useToken from "./components/useToken";

const AddContainers = ({ setComponentNo }) => {
  let { token } = useToken();
  let navigate = useNavigate();
  return (
    <div>
      <button
        onClick={() => {
          setComponentNo(0);
        }}
        className='GHOST'
        style={{ padding: 10 }}>
        back
      </button>
      <div className='centre'>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            let { quantity, unitPrice } = e.target;
            quantity = quantity.value;
            unitPrice = unitPrice.value;
            axios
              .post(
                "http://localhost:3000/containers/addNew",
                {
                  quantity,
                  unitPrice,
                },
                {
                  headers: {
                    "x-auth-token": token,
                  },
                }
              )
              .then((response) => {
                console.log(response);
                if (response.status === 200)
                  alert("Container Added Succesfully");
              })
              .catch((error) => {
                if (error.response.status === 403) navigate("/Login");
              });
          }}
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "20px 0 20px 0",
            width: "30vw",
            padding: "0",
          }}>
          <label htmlFor='unitPrice'>Price Per Unit</label>
          <input
            placeholder='enter unit price in ₹'
            className='underline'
            name='unitPrice'
            type='number'
            style={{ padding: 10 }}
          />
          <label htmlFor='quantity'>Quantity</label>
          <input
            type='number'
            placeholder='enter quantity in ltrs'
            className='underline'
            name='quantity'
            style={{ padding: 10 }}
          />
          <input
            style={{ padding: 10 }}
            className='CTA'
            placeholder='ADD'
            type='submit'></input>
        </form>
      </div>
    </div>
  );
};

export default AddContainers;
