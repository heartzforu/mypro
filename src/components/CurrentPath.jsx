import React from "react";
import { useLocation } from "react-router-dom";

function CurrentPath() {
  const location = useLocation();
  return <div>CurrentPath:{location.pathname}</div>;
}

export default CurrentPath;
