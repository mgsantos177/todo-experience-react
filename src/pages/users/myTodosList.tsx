import { useEffect, useState } from "react";
import PrivateLayout from "../../components/layout/PrivateLayout";
import Table from "../../components/table/Table";
import { apiAuthenticated } from "../../config/api";
import { Itodo } from "../../interfaces/Itodo";

export default function MyTodosList() {
  const [todos, setTodos] = useState<Itodo[]>();
  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    apiAuthenticated.get("/todos").then((response) => {
      setTodos(response.data);
    });
  }

  return (
    <PrivateLayout>
      {todos && (
        <Table
          tableName="My tasks"
          todos={todos}
          refreshTable={() => getTodos()}
        />
      )}
    </PrivateLayout>
  );
}
