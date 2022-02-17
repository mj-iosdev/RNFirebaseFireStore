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

const SelectOptionModal = ({
  navigation,
  collection,
  onClose,
  onSelect,
  selectedClass,
}) => {
  const [allOption, setAllOption] = useState([]);
  const [lastVisibleClass, setLastVisibleClass] = useState(null);

  const getOptions = () => {
    getRecordWithQuery(collection, null, ["order"], lastVisibleClass, 20)
      .then((querySnapshot) => {
        let options = allOption;
        setLastVisibleClass(querySnapshot.docs[querySnapshot.docs.length - 1]);

        if (querySnapshot.empty) {
        } else {
          querySnapshot.forEach((documentSnapshot) => {
            let {
              id,
              class_name,
              is_selected = false,
            } = documentSnapshot.data();
            if (selectedClass !== null) {
              if (selectedClass.id === id) {
                is_selected = true;
              }
            }
            options.push({ id, class_name, is_selected });
          });
          console.log(options);
          setAllOption(options);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOptions();
  }, []);

  return (
    <Container>
      <Header>
        <Left>
          <Button transparent onPress={onClose}>
            <Icon type="AntDesign" name="close" />
          </Button>
        </Left>
        <Body>
          <Title>Select Class</Title>
        </Body>
        <Right />
      </Header>
      <FlatList
        data={allOption}
        renderItem={({ item, index }) => (
          <ListItem
            onPress={() => {
              onSelect(item);
            }}
          >
            <Left>
              <Text style={{ flex: 1 }}>Class {item.class_name}th</Text>
            </Left>
            <Right>
              <Icon
                type="AntDesign"
                name="check"
                style={{ color: item.is_selected ? "red" : "grey" }}
              />
            </Right>
          </ListItem>
        )}
        onEndReached={() => {
          if (lastVisibleClass !== null) {
            getOptions();
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </Container>
  );
};

export default SelectOptionModal;

const styles = StyleSheet.create({});
