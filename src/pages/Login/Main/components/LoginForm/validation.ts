import { yupResolver } from "@hookform/resolvers/yup";
import { bool, object, string } from "yup";

const schema = object({
  email: string().email("Email not valid").required("Email is required"),
  password: string().trim().required("Password is required"),
  rememberMe: bool().required(),
}).required();

export const resolver = yupResolver(schema);
