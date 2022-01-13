import axios from "axios";
import { authHeaders } from "./AuthService";

const usersUrl = "https://calm-beyond-00632.herokuapp.com/usuarios";
//const usersUrl = "http://localhost:3002/usuarios";


export const createUser = async (user) => {
    return await axios.post(`${usersUrl}/`, user, { headers: authHeaders });
}


export const getUser = async (id) => {
    return await axios.get(`${usersUrl}/${id}`, { headers: authHeaders });
}

export const getUsers = async () => {
    return await axios.get(`${usersUrl}/`, { headers: authHeaders });
}

export const deleteUser = async (id) => {
    return await axios.delete(`${usersUrl}/${id}`, { headers: authHeaders });
}

export const editUser = async (user) => {
    return await axios.put(`${usersUrl}/${user._id}`, user, { headers: authHeaders });
}