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
import { SUBJECT } from "../constants";
import {
  getRecordAll,
  deleteRecord,
  getRecordWithQuery,
} from "../service/FireStoreHelper";

const SubjectListScreen = ({ navigation }) => {
  const [allSubjects, setAllSubjects] = useState([]);
  const [lastVisibleSubject, setLastVisibleSubject] = useState(null);

  const addNewSubject = () => {
    navigation.navigate("AddSubjectScreen", { mode: "add" });
  };

  const editSubject = (selSubject) => {
    navigation.navigate("AddSubjectScreen", {
      mode: "edit",
      selSubject: selSubject,
    });
  };

  const deleteSubject = (selSubject) => {
    deleteRecord(SUBJECT, selSubject.id)
      .then(() => {
        setAllSubjects(
          allSubjects.filter((sub) => {
            return sub.id !== selSubject.id;
          })
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getSubjects = () => {
    console.log("getSubjects called");
    getRecordWithQuery(SUBJECT, null, ["class_name"], lastVisibleSubject, 10)
      .then((querySnapshot) => {
        let subjects = [...allSubjects];

        if (querySnapshot.empty) {
          setLastVisibleSubject(null);
        } else {
          setLastVisibleSubject(
            querySnapshot.docs[querySnapshot.docs.length - 1]
          );

          querySnapshot.forEach((documentSnapshot) => {
            subjects.push(documentSnapshot.data());
          });

          setAllSubjects(subjects);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getSubjects();
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
          <Title>Subjects</Title>
        </Body>
        <Right>
          <Button transparent onPress={addNewSubject}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      {console.log("allSubjects", allSubjects.length)}

      <FlatList
        data={allSubjects}
        renderItem={({ item, index }) => (
          <ListItem>
            <Body>
              <Text>{item.subject_name}</Text>
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
                    deleteSubject(item);
                  }}
                />
              </View>
              <View style={{ marginHorizontal: 5 }}>
                <Icon
                  name="edit"
                  type="FontAwesome"
                  onPress={() => {
                    editSubject(item);
                  }}
                />
              </View>
            </View>
          </ListItem>
        )}
        onEndReached={() => {
          console.log("onEndReached");
          if (lastVisibleSubject !== null) {
            getSubjects();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

export default SubjectListScreen;

const styles = StyleSheet.create({});
