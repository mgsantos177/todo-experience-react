import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SidebarDrawerProvider } from "./contexts/SidebarDrawerContext";
import AdminAllTodos from "./pages/admin/AdminAllTodos";
import AdminDelayedTodos from "./pages/admin/AdminDelayedTodos";
import Home from "./pages/Home";
import SignIn from "./pages/signIn";
import SignOn from "./pages/signOn";
import MyTodosList from "./pages/users/myTodosList";
import { theme } from "./styles/theme";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signOn" element={<SignOn />} />
            <Route path="/home" element={<Home />} />
            <Route path="/user" element={<MyTodosList />} />
            <Route path="/admin/all" element={<AdminAllTodos />} />
            <Route path="/admin/delayed" element={<AdminDelayedTodos />} />
          </Routes>
        </SidebarDrawerProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
