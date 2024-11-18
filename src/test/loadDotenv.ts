import path from "path";
import dotenv from "dotenv";

const loadDotenv = async () => {
    dotenv.config({path: path.resolve(__dirname, "../../.env.local")});
};

export default loadDotenv;
