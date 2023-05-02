const express = require("express");
const app = express();
var cors = require('cors');
app.use(cors());
const { dbConnection } = require("./db");
const { userRouter } = require("./routes/User.route");
const { postRouter } = require("./routes/Post.route");
const { user } = require("./middlewares/auth.middleware");
require("dotenv").config();
const port = process.env.port;

app.use(express.json());

app.use("/users", userRouter);
app.use("/posts", user, postRouter);

app.listen(port, async () => {
    try {
        await dbConnection;
        console.log("Connected to the Database");
    }
    catch(err) {
        console.log(err);
        console.log("Cannot connect to the Database");
    }
    console.log(`Server is running on the port: ${port}`);
})