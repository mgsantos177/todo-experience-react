import { Box, Stack, Text, Link } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { Link as LinkRoute } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export function SidebarNav() {
  const { user } = useContext(AuthContext);

  return (
    <Stack spacing="12" align="flex-start">
      <Box>
        <Text fontWeight="bold" fontSize="small">
          Tasks
        </Text>
        <Stack spacing="16px" marginTop="8" align="stretch">
          <LinkRoute to={"/home"}>
            <Text>Home</Text>
          </LinkRoute>
          <LinkRoute to={"/user"}>
            <Text>My Tasks</Text>
          </LinkRoute>
        </Stack>
      </Box>
      {user?.isAdmin && (
        <Box>
          <Text fontWeight="bold" fontSize="small">
            Administrador
          </Text>
          <Stack spacing="16px" marginTop="8" align="stretch">
            <LinkRoute to={"/admin/all"}>
              <Text>All Users Todos</Text>
            </LinkRoute>

            <LinkRoute to={"/admin/delayed"}>
              <Text>All Delayed Todos</Text>
            </LinkRoute>
          </Stack>
        </Box>
      )}
    </Stack>
  );
}
