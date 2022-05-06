import axios from "axios";

export const HTTPClient = axios.create({
    baseURL: "https://bettingshop-api.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});

export default HTTPClient;
