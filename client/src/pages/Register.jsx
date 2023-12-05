import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from "@mantine/core";
import style from "./Register.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [idCard, setIdCard] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/users", {
        email: email,
        name: name,
        password: password,
        identityCard: idCard,
      })
      .then(() => {
        navigate("/login");
        setEmail("");
        setName("");
        setPassword("");
        setIdCard("");
      });
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={style.title}>
        Create a account
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Already have an account?{" "}
        <NavLink to="/login" style={{ textDecoration: "none" }}>
          <Anchor size="sm" component="button">
            Sign in
          </Anchor>
        </NavLink>
      </Text>

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Name"
            id="name"
            placeholder="your full name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextInput
            label="Email"
            id="email"
            placeholder="your email"
            required
            mt="md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextInput
            label="No.Identity Card"
            id="idCard"
            placeholder="your No.Identity Card"
            required
            mt="md"
            value={idCard}
            onChange={(e) => setIdCard(e.target.value)}
          />
          <PasswordInput
            label="Password"
            id="password"
            placeholder="Your password"
            required
            mt="md"
            onChange={(e) => setPassword(e.target.value)}
          />

          <Group justify="space-between" mt="lg">
            <Checkbox label="Remember me" />
            <Anchor component="button" size="sm">
              Forgot password?
            </Anchor>
          </Group>
          <Button fullWidth mt="xl" type="submit">
            Sign Up
          </Button>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
