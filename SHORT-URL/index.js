const express = require("express");
const app = express();
const Port = 8000;
const urlRoute = require("./routes/url");
const { connectmongoDb } = require("./connection");
const URL = require("./models/url");
const path = require("path");
const staticRouter = require("./routes/staticRouter");
const userRouter = require("./routes/user");
const cookieParser = require("cookie-parser");
const { checkForAuthentication, restrictTo } = require("./middleware/auth");




 
connectmongoDb("mongodb://localhost:27017/short-url")
  .then(() => console.log("Connection establish"))
  .catch((error) => console.log("error in connection"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthentication);



app.use("/url", restrictTo(["NORMAL","ADMIN"]), urlRoute);
app.use("/", staticRouter);
app.use("/user", userRouter);

app.get("/url/:shortId", async (req, res) => {
  try {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate(
      { shortId },
      {
        $push: {
          visitHistory: {
            timestamp: Date.now(),
          },
        },
      }
    );

    if (entry && entry.redirectURL) {
      res.redirect(entry.redirectURL);
    } else {
      res.status(404).send("URL not found");
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(Port, () => {
  console.log(`Server Started at ${Port}`);
});
