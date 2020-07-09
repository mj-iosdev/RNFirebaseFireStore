import React, { useState, useEffect } from "react";
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
  Icon,
  List,
  Card,
  CardItem,
} from "native-base";
import { StyleSheet } from "react-native";
import { signOutUser, getCurrentUser } from "../service/FireAuthHelper";

const ProfileScreen = ({ navigation }) => {
  const [user, setUser] = useState(null);

  const signOut = () => {
    signOutUser()
      .then(() => {
        alert("User Signed out");
        navigation.navigate("LoginScreen");
      })
      .catch((error) => {
        alert(error);
      });
  };

  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setUser(user);
      })
      .catch((error) => {
        setUser(null);
        console.log(error);
      });
  }, []);

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>Profile</Title>
        </Body>
        <Right>
          <Button transparent onPress={signOut}>
            <Icon name="log-out" />
          </Button>
        </Right>
      </Header>

      <Content padder>
        <Card>
          <CardItem
            header
            button
            onPress={() => navigation.navigate("StudentListScreen")}
          >
            <Body>
              <Text>Students</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem
            header
            button
            onPress={() => navigation.navigate("TeacherListScreen")}
          >
            <Body>
              <Text>Teachers</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem
            header
            button
            onPress={() => navigation.navigate("ClassListScreen")}
          >
            <Body>
              <Text>Classes</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem
            header
            button
            onPress={() => navigation.navigate("SubjectListScreen")}
          >
            <Body>
              <Text>Subjects</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
});
