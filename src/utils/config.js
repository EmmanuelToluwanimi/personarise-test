import { baseURL } from "./constants";
import axios from "axios";

export const api = axios.create({
    baseURL
});