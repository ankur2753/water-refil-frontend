import React from "react";
import useToken from "./components/useToken";
import CustomerHome from "./CustomerHome";
import EmployeeHome from "./EmployeeHome";
function Home() {
  let { isCustomer } = useToken();
  if (isCustomer) {
    return <CustomerHome />;
  } else {
    return <EmployeeHome />;
  }
}

export default Home;
