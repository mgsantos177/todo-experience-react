import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PrivateLayout from "../../components/layout/PrivateLayout";
import TableAdmin from "../../components/table/TableAdmin";
import { apiAuthenticated } from "../../config/api";
import { AuthContext } from "../../contexts/AuthContext";
import { Itodo } from "../../interfaces/Itodo";
import { ITotalRows } from "../../interfaces/ITotalRows";

export default function AdminAllTodos() {
  const [todos, setTodos] = useState<[Itodo[], ITotalRows]>();
  let navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user && !user.isAdmin) {
      navigate("/home");
    }
  }, [user]);

  useEffect(() => {
    apiAuthenticated.get("/todos/admin/all").then((response) => {
      setTodos(response.data);
    });
  }, []);

  return (
    <PrivateLayout>
      {todos && <TableAdmin tableName="All tasks" todos={todos} />}
    </PrivateLayout>
  );
}
