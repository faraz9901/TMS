import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 8000;

import app from "./app";
import connectDB from "./db";

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    })




