import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useUserQuery } from "../../hooks/useUser";
import { getToken } from "../../utils/constants";

export default function Home() {

  const token = getToken();
  if (token=== undefined || token === null || token === "") {
    return <Navigate to="/login" />;
  }

  return (
    <div className='text-center'>
      Home
    </div>
  )
}
