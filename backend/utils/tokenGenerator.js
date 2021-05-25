import jwt from "jsonwebtoken";

const tokenGenerator = (id) => {
  return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: "30d" });
};

export default tokenGenerator;
