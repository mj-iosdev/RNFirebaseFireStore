import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
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
import { STUDENT } from "../constants";
import {
  getRecordAll,
  deleteRecord,
  getRecordWithQuery,
} from "../service/FireStoreHelper";

const StudentListScreen = ({ navigation }) => {
  const [allStudents, setAllStudents] = useState([]);
  const [lastVisibleStudent, setLastVisibleStudent] = useState(null);

  const addNewStudent = () => {
    navigation.navigate("AddStudentScreen", { mode: "add" });
  };

  const editStudent = (selStudent) => {
    navigation.navigate("AddStudentScreen", {
      mode: "edit",
      selStudent: selStudent,
    });
  };

  const deleteStudent = (selStudent) => {
    deleteRecord(STUDENT, selStudent.id)
      .then(() => {
        setAllStudents(
          allStudents.filter((stud) => {
            return stud.id !== selStudent.id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getStudents = () => {
    getRecordWithQuery(STUDENT, null, null, lastVisibleStudent, 10)
      .then((querySnapshot) => {
        let students = [...allStudents];

        if (querySnapshot.empty) {
          setLastVisibleStudent(null);
        } else {
          setLastVisibleStudent(
            querySnapshot.docs[querySnapshot.docs.length - 1]
          );

          querySnapshot.forEach((documentSnapshot) => {
            students.push(documentSnapshot.data());
          });

          setAllStudents(students);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getStudents();
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
          <Title>Students</Title>
        </Body>
        <Right>
          <Button transparent onPress={addNewStudent}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      {console.log("allStudents", allStudents.length)}

      <FlatList
        data={allStudents}
        renderItem={({ item, index }) => (
          <ListItem
            onPress={() => {
              navigation.navigate("StudentDetailScreen", {
                selStudent: item,
              });
            }}
          >
            <Body>
              <Text>
                {item.first_name} {item.last_name}
              </Text>
              <Text note>Class : {item.class_name}</Text>
            </Body>
            <View
              style={{
                alignSelf: "flex-end",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ marginHorizontal: 5 }}>
                <Icon
                  name="delete"
                  type="AntDesign"
                  onPress={() => {
                    deleteStudent(item);
                  }}
                />
              </View>
              <View style={{ marginHorizontal: 5 }}>
                <Icon
                  name="edit"
                  type="FontAwesome"
                  onPress={() => {
                    editStudent(item);
                  }}
                />
              </View>
            </View>
          </ListItem>
        )}
        onEndReached={() => {
          console.log("onEndReached");
          if (lastVisibleStudent !== null) {
            getStudents();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

export default StudentListScreen;

const styles = StyleSheet.create({});
