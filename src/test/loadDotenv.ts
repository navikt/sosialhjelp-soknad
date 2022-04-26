const path = require("path");
const dotenv = require("dotenv");

const loadDotenv = async () => {
    dotenv.config({path: path.resolve(__dirname, "../../.env.local")});
};

export default loadDotenv;
