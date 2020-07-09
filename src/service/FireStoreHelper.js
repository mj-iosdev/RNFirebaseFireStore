import React from "react";
import { firestore } from "../setup/firebase/FirebaseSetup";
import { Auth } from "../setup/firebase/FirebaseSetup";
import { CLASS, STUDENT, SUBJECT, TEACHER } from "../constants/index";

/**
 * @description Function to add new record in firestore.
 * @param collection - Name of the collection where we want to add data.
 * @param data - data object that we want to add.
 */

export const addRecord = (collection, data) => {
  data.created_at = firestore.Timestamp.now();
  data.created_by = Auth().currentUser.uid;
  data.deleted = false;

  return new Promise(function(resolve, reject) {
    let ref = firestore()
      .collection(collection)
      .doc();
    data.id = ref.id;
    ref
      .set(data)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @description Function to edit record in firestore.
 * @param collection - Name of the collection where we want to edit data.
 * @param id - id of the object that we want to edit.
 * @param data - data object that we want to edit.
 */

export const editRecord = (collection, id, data) => {
  data.updated_at = firestore.Timestamp.now();
  data.updated_by = Auth().currentUser.uid;
  data.deleted = false;

  return new Promise(function(resolve, reject) {
    let ref = firestore()
      .collection(collection)
      .doc(id);
    ref
      .update(data)
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @description Function to Delete record from firestore.
 * @param collection - Name of the collection where we want to edit data.
 * @param id - id of the object that we want to edit.
 * @param data - data object that we want to edit.
 */
export const deleteRecord = (collection, id) => {
  return new Promise(function(resolve, reject) {
    let ref = firestore()
      .collection(collection)
      .doc(id);
    ref
      .delete()
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const getAllRecord = (collection) => {
  return new Promise(function(resolve, reject) {
    let ref = firestore().collection(collection);
    ref
      .get()
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
