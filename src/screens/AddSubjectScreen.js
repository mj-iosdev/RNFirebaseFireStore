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
import { CLASS, SUBJECT } from "../constants/index";

const AddSubjectScreen = ({ navigation, route }) => {
  const [subjectName, setSubjectName] = useState("");
  const [subClass, setSubClass] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const { mode, selSubject } = route.params;

  const addSubject = () => {
    if (subjectName.trim().length > 0 && subClass != null) {
      if (mode === "edit") {
        editRecord(SUBJECT, selSubject.id, {
          subject_name: subjectName,
          class_id: selSubject.class_id,
          class_name: selSubject.class_name,
        })
          .then((snapshot) => {
            navigation.goBack();
          })
          .catch((error) => {
            alert(error);
          });
      } else {
        addRecord(SUBJECT, {
          subject_name: subjectName,
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
      alert("Please enter Subject Name");
    }
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    if (mode === "edit") {
      setSubjectName(selSubject.subject_name);
      let selClass = {
        id: selSubject.class_id,
        class_name: selSubject.class_name,
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
                selSubject.class_id = selClass.id;
                selSubject.class_name = selClass.class_name;
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
          <Title>{mode === "add" ? "Add Subject" : "Update Subject"}</Title>
        </Body>
        <Right />
      </Header>
      <Content>
        <Form>
          <Item floatingLabel style={{ margin: 20 }}>
            <Label>Subject Name</Label>
            <Input
              placeholder="Subject Name"
              value={subjectName}
              onChangeText={setSubjectName}
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
        <Button rounded style={styles.button} onPress={addSubject}>
          <Text>{mode === "add" ? "Add Subject" : "Update Subject"} </Text>
        </Button>
      </Content>
    </Container>
  );
};

export default AddSubjectScreen;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
});
