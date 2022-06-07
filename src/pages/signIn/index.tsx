import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { FormEvent, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  const { isAuthenticated, signIn } = useContext(AuthContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const data = {
      email,
      password,
    };

    await signIn(data);
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex
        as="form"
        width="100%"
        maxWidth={360}
        height={400}
        bg="blackAlpha.600"
        p="24px"
        borderRadius={8}
        flexDir="column"
        onSubmit={handleSubmit}
        justify="center"
      >
        <Text
          display="flex"
          align="center"
          justifyContent="center"
          paddingBottom={5}
          fontSize="20px"
        >
          Todo Experience
        </Text>
        <Stack spacing="16px">
          <Input
            bg="white.100"
            color="blackAlpha.900"
            name="email"
            type="email"
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            bg="white.100"
            color="blackAlpha.900"
            name="password"
            type="password"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Stack>
        <Button type="submit" mt="6" colorScheme="blue" size="lg">
          Sign In
        </Button>
        <Link
          style={{
            paddingTop: "15px",
          }}
          to="/signOn"
        >
          Sign On
        </Link>
      </Flex>
    </Flex>
  );
}
