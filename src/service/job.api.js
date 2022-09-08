import { api } from "../utils/config";
import { getOptions } from "../utils/constants";


export const createJobs = async (data) => {
    try {
        const res = await api.post("/jobs", data, getOptions());
        return res.data.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getJobs = async () => {
    try {
        const res = await api.get("/jobs", getOptions());
        return res.data.data;
    } catch (error) {
        throw error.response.data;
    }
}

export const getSingleJob = async (key) => {
    try {
        const id = key.queryKey[1]
        const res = await api.get(`/jobs/${id}`, getOptions());
        return res.data.data;
    } catch (error) {
        throw error.response.data;
    }
}
