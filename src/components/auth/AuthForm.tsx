"use client";
import { useSearchParams } from "next/navigation";
import Login from "./login";
import Signup from "./signup";

const AuthForm: React.FC = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type") || "login";
  return <div>{type === "login" ? <Login /> : <Signup />}</div>;
};
export default AuthForm;
