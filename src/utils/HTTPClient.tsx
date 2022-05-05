import axios from "axios";

export const HTTPClient = axios.create({
    baseURL: "https://localhost:7043/api",
    headers: {
        "Content-type": "application/json"
    }
});

export default HTTPClient;
