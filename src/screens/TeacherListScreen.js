import React from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Title,
  Content,
  List,
  ListItem,
  Label,
  Input,
  Form,
  Item,
  Button,
  Text,
  Icon,
} from "native-base";

const TeacherListScreen = ({ navigation }) => {
  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>Teachers</Title>
        </Body>
        <Right />
      </Header>
      <Content />
    </Container>
  );
};

export default TeacherListScreen;

const styles = StyleSheet.create({});
