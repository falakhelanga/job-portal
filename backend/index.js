import express from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import mongo from "./mongoose/mongoose.js";
import { graphqlHTTP } from "express-graphql";
import graphQlSchema from "./graphql/schema.js";
import graphQlResolvers from "./graphql/resolvers.js";
import Auth from "./middlewares/authMiddleware.js";
import imageUpload from "./routes/imageUpload.js";
import {
  pageNotFoundHandler,
  errorHandler,
} from "./middlewares/errorsMiddleware.js";

const app = express();
app.use(express.json());
dotenv.config();

app.use(cors());
mongo();

app.use("/api/uploads", imageUpload);

app.use(Auth);
app.use(
  "/graphql",
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/front-end/build")));
  app.get("*", (req, res, next) => {
    res.sendFile(path.resolve(__dirname, "front-end", "build", "index.html"));
  });
}

app.use(pageNotFoundHandler);
app.use(errorHandler);
app.listen(process.env.PORT || 5000, (err) => {
  if (err) console.log(err);

  console.log("connected");
});
