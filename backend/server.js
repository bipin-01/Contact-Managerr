const express = require("express");
const dotenv = require("dotenv");
const chalk = require("chalk");
const yellow = chalk.yellow;
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const contactRoutes = require("./routes/contactRoutes");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const path = require("path");

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data

app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);

//  -----------------------deployment--------------------
__dirname = path.resolve();
if ((process.env.NODE_ENV === "production")) {
   app.use(express.static(path.join(__dirname, 'frontend/build')));

   app.get('*', (req, res) => {
     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
   } )
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

//---------------------------deployment------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    yellow.inverse(
      `Server running in ${process.env.NODE_ENV} mode on PORT ${PORT}`
    )
  );
});
