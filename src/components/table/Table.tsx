import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { useState } from "react";
import { RiAddLine, RiCheckboxCircleFill, RiEdit2Fill } from "react-icons/ri";
import { apiAuthenticated } from "../../config/api";
import { Itodo } from "../../interfaces/Itodo";

interface TableUserProps {
  tableName: string;
  todos: Itodo[];
  refreshTable: () => void;
  isAdmin?: boolean;
}

export default function TableComponent({
  tableName,
  todos,
  isAdmin,
  refreshTable,
}: TableUserProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [todoSelected, setTodoSelect] = useState<Itodo>();
  const toast = useToast();

  async function handleSubmit() {
    if (description === "") {
      return toast({
        title: `description is required`,
        status: "error",
        isClosable: true,
      });
    }

    await apiAuthenticated
      .post("/todos", {
        description,
        deadline,
      })
      .then(() => {
        onClose();
        refreshTable();
        return toast({
          title: `Task created!`,
          status: "success",
          isClosable: true,
        });
      })
      .catch((error) => {
        return toast({
          title: `${error.response?.data?.message || "Server error"}`,
          status: "error",
          isClosable: true,
        });
      });
  }

  async function onCompleteModal() {
    await apiAuthenticated
      .patch(`/todos/${todoSelected?.id}`)
      .then(() => {
        refreshTable();
        setOpenModal(false);
        return toast({
          title: `Task completed!`,
          status: "success",
          isClosable: true,
        });
      })
      .catch((error) => {
        return toast({
          title: `${error.response?.data?.message || "Server error"}`,
          status: "error",
          isClosable: true,
        });
      });
  }

  async function onEditModal() {
    console.log(description);
    console.log(deadline);

    await apiAuthenticated
      .put(`/todos/${todoSelected?.id}`, {
        description,
        deadline,
      })
      .then(() => {
        refreshTable();
        setOpenEditModal(false);
        setDescription("");
        setDeadline("");
        return toast({
          title: `Task updated!`,
          status: "success",
          isClosable: true,
        });
      })
      .catch((error) => {
        return toast({
          title: `${error.response?.data?.message || "Server error"}`,
          status: "error",
          isClosable: true,
        });
      });
  }

  return (
    <Box flex="1" borderRadius={8} bg="gray.700" p="8">
      <Flex mb="8" justify="space-between" align="center">
        <Heading size="lg" fontWeight="normal">
          {tableName}
          {/* {!isLoading && isFetching && (
        <Spinner size="sm" color="gray.500" ml="4" />
      )} */}
        </Heading>

        <Button
          onClick={onOpen}
          size="sm"
          fontSize="sm"
          colorScheme="blue"
          leftIcon={<Icon as={RiAddLine} fontSize="20" />}
        >
          Criar novo
        </Button>
      </Flex>
      <Table colorScheme="whiteAlpha">
        <Thead>
          <Tr>
            {isAdmin && <Th width={1}>Email</Th>}
            <Th>Description</Th>
            <Th>Deadline</Th>
            <Th minW={15}>Status</Th>
            <Th width={8}></Th>
          </Tr>
        </Thead>
        <Tbody>
          {todos.map((todo) => {
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
                {isAdmin && <Td>mgsantos177@gmail.com</Td>}
                <Td>{todo.description}</Td>
                <Td>
                  <Box>
                    <Text>
                      {dayjs(todo.deadline).format("ddd MMM DD YYYY")}
                    </Text>
                  </Box>
                </Td>
                <Td>
                  <Box>
                    <Text fontSize="17px">{todo.status}</Text>
                    {todo.status === "Completed" && (
                      <Text fontSize="12px">{`on ${dayjs(
                        todo.updated_at
                      ).format("ddd MMM DD YYYY")}`}</Text>
                    )}
                  </Box>
                </Td>
                <Td>
                  {todo.status !== "Completed" && (
                    <Stack direction="row">
                      <IconButton
                        aria-label="Edit"
                        icon={<Icon as={RiEdit2Fill} fontSize="20" />}
                        size="sm"
                        colorScheme="blue"
                        onClick={() => {
                          setTodoSelect(todo);
                          setOpenEditModal(true);
                        }}
                      />

                      <IconButton
                        aria-label="Conclude"
                        icon={<Icon as={RiCheckboxCircleFill} fontSize="20" />}
                        size="sm"
                        colorScheme="green"
                        onClick={() => {
                          setTodoSelect(todo);
                          setOpenModal(true);
                        }}
                      />
                    </Stack>
                  )}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <br />
      {todos.length <= 0 && <div>Você não possui tarefas</div>}
      {/* <Pagination /> */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent bg="gray.700">
          <ModalHeader>Create to do</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Deadline</FormLabel>
              <Input
                type="date"
                placeholder="Deadline"
                onChange={(e) => setDeadline(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleSubmit()}>
              Save
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={openModal} onClose={() => setOpenModal(false)}>
        <ModalContent bg="gray.700">
          <ModalHeader>Complete todo</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            pb={6}
          >{`Do you want to complete ${todoSelected?.description}  ? `}</ModalBody>
          <ModalFooter>
            <Button
              colorScheme="green"
              mr={3}
              onClick={() => onCompleteModal()}
            >
              Yes
            </Button>
            <Button onClick={() => setOpenModal(false)} colorScheme="red">
              No
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={openEditModal} onClose={() => setOpenEditModal(false)}>
        <ModalContent bg="gray.700">
          <ModalHeader>Edit to do</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                placeholder="Description"
                defaultValue={todoSelected?.description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Deadline</FormLabel>
              <Input
                type="date"
                placeholder="Deadline"
                defaultValue={dayjs(todoSelected?.deadline).format()}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => onEditModal()}>
              Save
            </Button>
            <Button onClick={() => setOpenEditModal(false)} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
