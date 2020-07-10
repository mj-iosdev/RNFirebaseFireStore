import React, { useState, useEffect } from "react";
import { StyleSheet, Modal } from "react-native";
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
  View,
} from "native-base";
import { addRecord, editRecord } from "../service/FireStoreHelper";
import SelectOptionModal from "../modals/SelectOptionModal";
import { CLASS, STUDENT } from "../constants/index";

const AddStudentScreen = ({ navigation, route }) => {
  const [studFirstName, setStudFirstName] = useState("");
  const [studLastName, setStudLastName] = useState("");
  const [subClass, setSubClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { mode, selStudent } = route.params;

  const addStudent = () => {
    if (
      studFirstName.trim().length > 0 &&
      studLastName.trim().length > 0 &&
      subClass != null
    ) {
      if (mode === "edit") {
        editRecord(STUDENT, selStudent.id, {
          first_name: studFirstName,
          last_name: studLastName,
          class_id: selStudent.class_id,
          class_name: selStudent.class_name,
        })
          .then((snapshot) => {
            navigation.goBack();
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        addRecord(STUDENT, {
          first_name: studFirstName,
          last_name: studLastName,
          class_id: subClass.id,
          class_name: subClass.class_name,
        })
          .then((snapshot) => {
            navigation.goBack();
          })
          .catch((error) => {
            alert(error);
          });
      }
    } else if (subClass == null) {
      alert("Please select Class");
    } else {
      alert("Please enter Student Name");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (mode === "edit") {
      setStudFirstName(selStudent.first_name);
      setStudLastName(selStudent.last_name);
      let selClass = {
        id: selStudent.class_id,
        class_name: selStudent.class_name,
      };
      setSubClass(selClass);
    }
    return () => {};
  }, []);

  return (
    <Container>
      <Modal
        animationType={"slide"}
        transparent={false}
        visible={showModal}
        onRequestClose={() => {
          console.log("Modal has been closed.");
        }}
      >
        <SelectOptionModal
          collection={CLASS}
          onClose={toggleModal}
          onSelect={(selClass) => {
            if (selClass !== null) {
              setSubClass(selClass);
              if (mode === "edit") {
                selStudent.class_id = selClass.id;
                selStudent.class_name = selClass.class_name;
              }
            }
            toggleModal();
          }}
          selectedClass={subClass}
        />
      </Modal>
      <Header>
        <Left>
          <Button transparent onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" />
          </Button>
        </Left>
        <Body>
          <Title>{mode === "add" ? "Add Student" : "Update Student"}</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel style={{ margin: 20 }}>
            <Label>First Name</Label>
            <Input
              placeholder="First Name"
              value={studFirstName}
              onChangeText={setStudFirstName}
            />
          </Item>
          <Item floatingLabel style={{ margin: 20 }}>
            <Label>Last Name</Label>
            <Input
              placeholder="Last Name"
              value={studLastName}
              onChangeText={setStudLastName}
            />
          </Item>
          <Item style={{ margin: 20 }} onPress={toggleModal}>
            <Left>
              <Text>
                {subClass ? `Class: ${subClass.class_name}` : "Select Class"}
              </Text>
            </Left>
            <Right>
              <Icon name="chevron-forward" color="blue" />
            </Right>
          </Item>
        </Form>
        <Button rounded style={styles.button} onPress={addStudent}>
          <Text>{mode === "add" ? "Add Student" : "Update Student"} </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default AddStudentScreen;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
});
