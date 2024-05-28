import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";

const schema = object({
  name: string().trim().required("Name is required"),
}).required();

export const resolver = yupResolver(schema);
