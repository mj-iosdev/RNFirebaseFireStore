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
  View,
} from "native-base";
import { CLASS } from "../constants/index";
import { getAllRecord } from "../service/FireStoreHelper";
import { FlatList } from "react-native-gesture-handler";
import { deleteRecord } from "../service/FireStoreHelper";

const ClassListScreen = ({ navigation }) => {
  const [allClasses, setAllClasses] = useState([]);

  const addNewClass = () => {
    navigation.navigate("AddClassScreen", { mode: "add" });
  };

  const editClass = (selClass) => {
    navigation.navigate("AddClassScreen", {
      mode: "edit",
      selClass: selClass,
    });
  };

  const deleteClass = (selClass) => {
    deleteRecord(CLASS, selClass.id)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllRecord(CLASS)
      .then((querySnapshot) => {
        classes = [];

        querySnapshot.forEach((documentSnapshot) => {
          classes.push(documentSnapshot.data());
        });

        setAllClasses(classes);
      })
      .catch((error) => {});
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
          <Title>Classes</Title>
        </Body>
        <Right>
          <Button transparent onPress={addNewClass}>
            <Icon name="add" />
          </Button>
        </Right>
      </Header>
      <FlatList
        data={allClasses}
        renderItem={({ item, index }) => (
          <ListItem>
            <Text style={{ flex: 1 }}>Class {item.class_name}th</Text>
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
                    deleteClass(item);
                  }}
                />
              </View>
              <View style={{ marginHorizontal: 5 }}>
                <Icon
                  name="edit"
                  type="FontAwesome"
                  onPress={() => {
                    editClass(item);
                  }}
                />
              </View>
            </View>
          </ListItem>
        )}
      />
    </Container>
  );
};

export default ClassListScreen;

const styles = StyleSheet.create({});
