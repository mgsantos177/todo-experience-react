import { useContext } from "react";
import PrivateLayout from "../components/layout/PrivateLayout";
import { AuthContext } from "../contexts/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <PrivateLayout>
      Hello {user?.email}, wellcome to ToDo Experience
    </PrivateLayout>
  );
}
