const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://your-backend.herokuapp.com"
    : "http://localhost:5000/api/v1";

export default BASE_URL;
