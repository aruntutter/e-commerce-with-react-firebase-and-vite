import React from "react";
import MyContext from "./myContext";

const MyState = (props) => {
  const state = {
    name: "kamal",
    rollno: 5,
  };

  const color = "red";

  return (
    <MyContext.Provider value={{ state, color }}>
      {props.children}
    </MyContext.Provider>
  );
};

export default MyState;
