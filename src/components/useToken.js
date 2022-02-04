import { useState } from "react";

export default function useToken() {
  const getToken = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };
  const getUserType = () => {
    const tokenString = sessionStorage.getItem("token");
    const userToken = JSON.parse(tokenString);
    return userToken?.isCustomer;
  };
  const [token, setToken] = useState(getToken());
  const [isCustomer, setIsCustomer] = useState(getUserType());
  const saveToken = (userToken) => {
    sessionStorage.setItem("token", JSON.stringify(userToken));
    setToken(userToken.token);
    setIsCustomer(userToken.isCustomer);
  };
  const logOut = () => {
    setToken(undefined);
    setIsCustomer(undefined);
    sessionStorage.removeItem("token");
  };
  return {
    setToken: saveToken,
    token,
    isCustomer,
    logOut,
  };
}
