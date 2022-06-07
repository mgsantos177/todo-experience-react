import { Stack, Box, Button } from "@chakra-ui/react";

export function Pagination() {
  return (
    <Stack direction="row" mt="8" justify="space-between" align="center">
      <Box>
        {" "}
        <strong>0</strong> - <strong>10</strong> of <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          bg="gray.700"
          _hover={{
            bg: "gray.500",
          }}
        >
          1
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          bg="gray.700"
          disabled
          _disabled={{
            bg: "blue.500",
            cursor: "default",
          }}
        >
          2
        </Button>
        <Button
          size="sm"
          fontSize="xs"
          width="4"
          bg="gray.700"
          disabled
          _disabled={{
            bg: "blue.500",
            cursor: "default",
          }}
        >
          3
        </Button>
      </Stack>
    </Stack>
  );
}
