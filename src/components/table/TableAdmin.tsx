import {
  Box,
  Flex,
  Heading,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { ITotalRows } from "../../interfaces/ITotalRows";

interface Itodo {
  id: string;
  description: string;
  deadline: Date;
  isLate?: boolean;
  status: string;
  user?: {
    email: string;
  };
}

interface TableUserProps {
  tableName: string;
  todos: [Itodo[], ITotalRows];
}

export default function TableComponent({ tableName, todos }: TableUserProps) {
  const [data, totalRows] = todos;
  return (
    <Box flex="1" borderRadius={8} bg="gray.700" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          {tableName}
          {/* {!isLoading && isFetching && (
        <Spinner size="sm" color="gray.500" ml="4" />
      )} */}
        </Heading>
      </Flex>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            <Th width={1}>Email</Th>
            <Th>Description</Th>
            <Th>Deadline</Th>
            <Th>Status</Th>
            <Th width={8}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((todo) => {
            return (
              <Tr
                key={todo.id}
                color={
                  todo.status === "Completed"
                    ? "green.500"
                    : todo.isLate
                    ? "red.400"
                    : "white.500"
                }
              >
                <Td>{todo.user && todo.user?.email}</Td>
                <Td>{todo.description}</Td>
                <Td>
                  <Box>
                    <Text>{new Date(todo.deadline).toDateString()}</Text>
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Text fontSize="17px">{todo.status}</Text>
                    {todo.status === "Completed" && (
                      <Text fontSize="12px">{`on ${new Date(
                        todo.deadline
                      ).toDateString()}`}</Text>
                    )}
                  </Box>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <br />
      {todos.length <= 0 && (
        <div>Não encontramos nenhuma tarefa para sua busca</div>
      )}
      {/* <Pagination /> */}
    </Box>
  );
}
