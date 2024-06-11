import { useState, useContext } from "react";
import { useAuth } from "@/context/authentication";
import { User } from "@/types";
import { useRouter } from "next/navigation";

interface PrivateRouteType {
  children: React.ReactNode;
}
export default function PrivateRoute({ children }: PrivateRouteType) {
  // @ts-ignore
  const { user } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  console.log(user);

  return children;
}
