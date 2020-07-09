import React, { useState, useEffect } from "react";
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
import { addRecord, editRecord } from "../service/FireStoreHelper";
import { CLASS } from "../constants/index";
const AddClassScreen = ({ navigation, route }) => {
  const [className, setClassName] = useState("");
  const { mode, selClass } = route.params;

  const addClass = () => {
    if (className.trim().length > 0) {
      if (mode === "edit") {
        editRecord(CLASS, selClass.id, { class_name: className })
          .then((snapshot) => {
            navigation.goBack();
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        addRecord(CLASS, { class_name: className })
          .then((snapshot) => {
            navigation.goBack();
          })
          .catch((error) => {
            alert(error);
          });
      }
    } else {
      alert("Please enter Class Name");
    }
  };

  useEffect(() => {
    if (mode === "edit") {
      setClassName(selClass.class_name);
    }
    return () => {};
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{mode === "add" ? "Add Class" : "Update Class"}</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel style={{ margin: 20 }}>
            <Label>Class Name</Label>
            <Input
              placeholder="Class Name"
              value={className}
              onChangeText={setClassName}
            />
          </Item>
        </Form>
        <Button rounded style={styles.button} onPress={addClass}>
          <Text>{mode === "add" ? "Add Class" : "Update Class"} </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default AddClassScreen;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
});
