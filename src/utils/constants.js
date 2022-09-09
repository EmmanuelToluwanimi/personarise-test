import Cookies from "js-cookie";

export const baseURL =
  process.env.NODE_ENV === "production"
    ? "https://personarise-api.onrender.com/api"
    : "http://localhost:5000/api";


export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + cvalue + ";" + expires + ";path=/;secure=true";
};

export const getToken = () => {
  return Cookies.get("x-token") || "";
};

export const clearCookies = () => {
  Cookies.remove("x-token");
  Cookies.remove("x-refresh-token");
};

export const clearLocalStorage = () => {
  localStorage.removeItem("user");
};

export function formatUsername(username) {
  return username.length > 6 ? username.substring(0, 6) + "..." : username;
}

export const getOptions = () => {
  return {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Access-Control-Allow-Origin": "*",
    },
  };
};
