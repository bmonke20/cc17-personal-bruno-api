require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const errorMiddleware = require("./middlewares/error");
const notFoundMiddleware = require("./middlewares/notFound");
const userRouter = require("./routes/userRoute");
const productRouter = require("./routes/productRoute");
const cartRouter = require("./routes/cartRoute");
const paymentRouter = require("./routes/paymentRoute");
const orderRouter = require("./routes/orderRoute");
const orderItemRouter = require("./routes/orderItemRoute");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

app.use("/auth", userRouter);
app.use("/product", productRouter);
app.use("/cart", cartRouter);
app.use("/payment", paymentRouter);
app.use("/order", orderRouter);
app.use("/orderItem", orderItemRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
