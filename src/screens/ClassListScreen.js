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
import {
  getRecordAll,
  deleteRecord,
  getRecordWithQuery,
} from "../service/FireStoreHelper";

import { FlatList } from "react-native-gesture-handler";

const ClassListScreen = ({ navigation }) => {
  const [allClasses, setAllClasses] = useState([]);
  const [lastVisibleClass, setLastVisibleClass] = useState(null);

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

  const getClasses = () => {
    getRecordWithQuery(CLASS, null, ["order"], lastVisibleClass, 10)
      .then((querySnapshot) => {
        classes = allClasses;
        setLastVisibleClass(querySnapshot.docs[querySnapshot.docs.length - 1]);

        if (querySnapshot.empty) {
        } else {
          querySnapshot.forEach((documentSnapshot) => {
            classes.push(documentSnapshot.data());
          });

          setAllClasses(classes);
        }
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getClasses();
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
        onEndReached={() => {
          console.log("onEndReached");
          if (lastVisibleClass !== null) {
            console.log("onEndReached getClasses");
            getClasses();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

export default ClassListScreen;

const styles = StyleSheet.create({});
