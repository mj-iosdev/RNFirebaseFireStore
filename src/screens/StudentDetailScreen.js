import React, { useState, useEffect } from "react";
import { StyleSheet, Modal, FlatList } from "react-native";
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
import {
  addRecord,
  editRecord,
  getRecordWithQuery,
} from "../service/FireStoreHelper";
import SelectOptionModal from "../modals/SelectOptionModal";
import { CLASS, STUDENT, SUBJECT } from "../constants/index";

const StudentDetailScreen = ({ navigation, route }) => {
  const { mode, selStudent } = route.params;
  const [allSubject, setAllSubject] = useState([]);

  const getSubjects = (id) => {
    console.log("getSubjects");
    getRecordWithQuery(SUBJECT, [["class_id", "==", id]], null, null, null)
      .then((querySnapshot) => {
        let options = allSubject;
        if (querySnapshot.empty) {
        } else {
          querySnapshot.forEach((documentSnapshot) => {
            console.log("options => ", documentSnapshot.data());

            let { id, subject_name } = documentSnapshot.data();
            options.push({ id, subject_name });
          });

          setAllSubject([...options]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getSubjects(selStudent.class_id);
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
          <Title>Student Detail</Title>
        </Body>
        <Right />
      </Header>
      <List>
        <ListItem>
          <Text>First Name : {selStudent.first_name}</Text>
        </ListItem>
        <ListItem>
          <Text>Last Name : {selStudent.last_name}</Text>
        </ListItem>
        <ListItem>
          <Text>Class Name : {selStudent.class_name}</Text>
        </ListItem>
        <ListItem>
          <Text>Subjects</Text>
          {console.log("allSubject => ", allSubject.length)}
          {allSubject.length > 0 ? (
            <FlatList
              data={allSubject}
              extraData={allSubject}
              renderItem={({ item, index }) => (
                <ListItem>
                  <Left>
                    <Text style={{ flex: 1 }}>{item.subject_name}</Text>
                  </Left>
                </ListItem>
              )}
            />
          ) : (
            <></>
          )}
        </ListItem>
      </List>
    </Container>
  );
};

export default StudentDetailScreen;

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    width: 200,
    alignSelf: "center",
    marginBottom: 20,
  },
});
