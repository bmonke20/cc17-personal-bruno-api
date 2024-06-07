require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const userRouter = require("./routes/userRoute");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/user", userRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
