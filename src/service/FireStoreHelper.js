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

/**
 * @description Function to GET All record for a Collection from firestore.
 * @param collection - Name of the collection where we want to GET data.
 */

export const getRecordAll = (collection) => {
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

/**
 * @description Function to GET All record with specic query, order and pagination for a Collection from firestore.
 * @param collection - Name of the collection where we want to GET data.
 * @param queryArray - Query that will perform on perticular collection.
 * @param orderBy - Order by "asc" or "desc" by perticular column.
 * @param startAfter - Used for paginations. Provide last page or document in this. Query will get data after this record
 * @param limit - Provide how many number of record in the request.

 */

export const getRecordWithQuery = (
  collection,
  queryArray: Array = null,
  orderBy: Array = null,
  startAfter = null,
  limit = null
) => {
  return new Promise(function(resolve, reject) {
    let ref = firestore().collection(collection);
    let queryRef = ref;

    if (queryArray !== null && queryArray.length === 3) {
      queryRef = queryRef.where(queryArray[0], queryArray[1], queryArray[2]);
    }

    if (orderBy !== null) {
      if (typeof orderBy[1] === undefined) {
        orderBy[1] = "asc";
      }
      queryRef = queryRef.orderBy(orderBy[0], orderBy[1]);
    }

    if (startAfter !== null) {
      queryRef = queryRef.startAfter(startAfter);
    }

    if (limit !== null) {
      queryRef = queryRef.limit(limit);
    }

    queryRef
      .get()
      .then((snapshot) => {
        resolve(snapshot);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
