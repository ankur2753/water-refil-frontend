import axios from "axios";
import { useNavigate } from "react-router-dom";
import useToken from "./components/useToken";

export default function CreateProfile() {
  const nav = useNavigate();
  const { isCustomer, token } = useToken();
  return (
    <div className='centre'>
      <h1>Create Profile</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          let fname = e.target.fname.value;
          let mname = e.target.mname.value;
          let lname = e.target.lname.value;
          let email = e.target.email.value;
          let city = e.target.city.value;
          let salary = e.target?.salary?.value;
          let state = e.target.state.value;
          let street = e.target.street.value;
          let country = e.target.country.value;
          let phone = e.target.phone.value;
          axios
            .post(
              "http://localhost:3000/profile/create",
              {
                fname,
                mname,
                lname,
                street,
                city,
                state,
                country,
                phone,
                email,
                salary,
              },
              {
                headers: {
                  "x-auth-token": token,
                },
              }
            )
            .then((res) => {
              if (res.data.success) {
                nav("/Home");
              }
            })
            .catch((err) => console.dir(err.response.data));
        }}
        style={{
          display: "flex",
          flexDirection: "column",
        }}>
        <div>
          <label htmlFor='fname'>First Name</label>
          <input
            name='fname'
            placeholder=' enter your First Name'
            className='underline'
            type='text'
          />
          <label htmlFor='mname'>Middle Name</label>
          <input
            name='mname'
            placeholder=' enter your Middle Name'
            type='text'
            className='underline'
          />
          <label htmlFor='lname'>Last Name</label>
          <input
            name='lname'
            placeholder=' enter your Last Name'
            type='text'
            className='underline'
          />
        </div>
        <label htmlFor='street'>street</label>
        <input
          name='street'
          placeholder=' enter your street'
          type='text'
          className='underline'
        />
        <label htmlFor='email'>email</label>
        <input
          name='email'
          placeholder=' enter your email'
          type='email'
          className='underline'
        />
        <label htmlFor='city'>City</label>
        <input
          name='city'
          placeholder=' enter your City'
          type='text'
          className='underline'
        />
        <label htmlFor='state'>state</label>
        <input
          name='state'
          placeholder=' enter your state'
          type='text'
          className='underline'
        />
        <label htmlFor='phone'>country</label>
        <input
          name='country'
          placeholder=' enter your country'
          type='text'
          className='underline'
        />
        <label htmlFor='phone'>phone</label>
        <input
          name='phone'
          placeholder=' enter your phone'
          type='tel'
          className='underline'
        />
        <label
          style={{ display: !isCustomer ? "flex" : "none" }}
          htmlFor='salary'>
          salary
        </label>
        <input
          style={{ display: !isCustomer ? "flex" : "none" }}
          name='salary'
          placeholder=' enter your salary'
          type='number'
          className='underline'
        />
        <button type='submit' className='CTA big'>
          Create
        </button>
      </form>
    </div>
  );
}
