import React, { useState } from "react";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  Label,
  Input,
  Form,
  Item,
  Button,
  Text,
} from "native-base";
import { StyleSheet } from "react-native";
import { signInWithEmail } from "../service/FireAuthHelper";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**
   * @description Function to Login with Email/Password.
   * @param null.
   */

  const loginWithEmail = () => {
    signInWithEmail(email, password)
      .then((user) => {
        console.log(user);
        alert("User logged in Successfully");
        setEmail("");
        setPassword("");
        navigation.navigate("ProfileScreen");
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Login</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel style={{ margin: 20 }}>
            <Label>Email</Label>
            <Input
              placeholder="Email Address"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </Item>
          <Item floatingLabel style={{ margin: 20 }}>
            <Label>Password</Label>
            <Input
              placeholder="Password"
              value={password}
              onChangeText={(text) => setPassword(text)}
              secureTextEntry={true}
            />
          </Item>
        </Form>
        <Button rounded style={styles.button} onPress={loginWithEmail}>
          <Text> Login </Text>
        </Button>

        <Button
          rounded
          style={styles.button}
          onPress={() => navigation.navigate("SignUpScreen")}
        >
          <Text> Register </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
});
