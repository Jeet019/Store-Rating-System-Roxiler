const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
require("dotenv").config();
const sequelize = require("./config/db");
const PORT = process.env.PORT || 5000;

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log("Method: ", req.method);
    console.log("Path: ", req.path);
    console.log("Body: ", req.body);
    next();
});

app.use("/api/auth", authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);



app.get("/", (req, res) => {
    res.send("API is running...");
});

sequelize.sync({ alter: true})
    .then(() => {
        console.log("All models synced");
        app.listen(PORT, () => {
            console.log((`Server is running on https://localhost:${PORT}`));            
        });
    })
    .catch((err) => {
        console.error("Failed to sync models: ", err.message);
    });