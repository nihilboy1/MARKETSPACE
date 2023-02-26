import { Loading } from "@components/Loading";
import { useAuthContext } from "@hooks/useAuthContext";
import { useEffect } from "react";

export function SignOutEmptyScreen() {
  const { signOut } = useAuthContext();
  useEffect(() => {
    signOut();
  }, []);
  return <Loading />;
}
