import React from "react";
import { firestore } from "../setup/firebase/FirebaseSetup";
import { Auth } from "../setup/firebase/FirebaseSetup";
import storage from "@react-native-firebase/storage";

const collectionRef = (
  parentCollection,
  parantDocId = null,
  innerCollection = null,
  innerDocId = null,
  collection = null
) => {
  if (
    parantDocId === null &&
    innerCollection === null &&
    innerDocId === null &&
    collection === null
  ) {
    return firestore().collection(parentCollection);
  } else if (
    innerCollection === null &&
    innerDocId === null &&
    collection === null
  ) {
    return firestore()
      .collection(parentCollection)
      .doc(parantDocId);
  } else if (innerDocId === null && collection === null) {
    return firestore()
      .collection(parentCollection)
      .doc(parantDocId)
      .collection(innerCollection);
  } else if (collection === null) {
    return firestore()
      .collection(parentCollection)
      .doc(parantDocId)
      .collection(innerCollection)
      .doc(innerDocId);
  } else {
    return firestore()
      .collection(parentCollection)
      .doc(parantDocId)
      .collection(innerCollection)
      .doc(innerDocId)
      .collection(collection);
  }
};

/**
 * @description Function to add new record in firestore.
 * @param collection - Name of the collection where we want to add data.
 * @param data - data object that we want to add.
 */

export const addRecord = (collection, data) => {
  data.created_at = firestore.Timestamp.now();
  data.created_by = Auth().currentUser.uid;

  return new Promise(function(resolve, reject) {
    let ref = collectionRef(collection).doc();
    data.id = finalref.id;
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
 * @description Function to add new record in Innner Collection of collection.
 * @param parentCollection -Parent collection Name of the collection where we want to add data.
 * @param parentDocId -Parent collection docId
 * @param collection - Name of the collection where we want to add data.
 * @param docID - collection docId if you want to give (not mandatory)
 * @param data - data object that we want to add.
 * @param innerCollection -Inner Collection Name of the collection where we want to add data.
 */
export const addCollectionRecordInDoc = (
  data,
  parentCollection,
  parentDocId = null,
  innerCollection = null,
  innerDocID = null,
  collection
) => {
  return new Promise(function(resolve, reject) {
    const ref = collectionRef(
      parentCollection,
      parentDocId,
      innerCollection,
      innerDocID,
      collection
    ).doc();
    data.created_at = firestore.Timestamp.now();
    data.created_by = Auth().currentUser.uid;
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

  return new Promise(function(resolve, reject) {
    let ref = collectionRef(collection, id);
    data.updated_at = firestore.Timestamp.now();
    data.updated_by = Auth().currentUser.uid;
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
 * @description Function to Delete Inner Coolection record from firestore.
 * @param parentCollection -Parent collection Name of the collection where we want to add data.
 * @param parentDocId -Parent collection docId
 * @param innerCollection - Name of the collection where we want to add data.
 * @param innerDocId - collection docId if you want to give (not mandatory)
 * @param data - data object that we want to add.
 * @param collection -Inner Collection Name of the collection where we want to add data.
 */

export const deleteRecord = (
  parentCollection,
  parantDocId,
  innerCollection = null,
  innerDocId = null,
  collection = null,
  id = null
) => {
  // eslint-disable-next-line complexity
  return new Promise(function(resolve, reject) {
    let ref = collectionRef(
      parentCollection,
      parantDocId,
      innerCollection,
      innerDocId,
      collection
    );
    ref = id === null ? ref : ref.doc(id);
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
 * @description Function to soft Delete record from firestore. Record will be still in the database but with value deleted = true
 * @param collection - Name of the collection where we want to edit data.
 * @param id - id of the object that we want to edit.
 * @param data - which field you have to update.
 */

export const deleteRecordSoft = (collection, id, data) => {
  data.updated_at = firestore.Timestamp.now();
  data.updated_by = Auth().currentUser.uid;

  return new Promise(function(resolve, reject) {
    let ref = collectionRef(collection, id);
    ref
      .update(data)
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @description Function to GET Single record for a Collection based on id from firestore.
 * @param collection - Name of the collection where we want to GET data.
 * @param id - document id of collection where we want to GET data.
 */

export const getRecord = (
  parentCollection,
  parantDocId,
  innerCollection = null,
  innerDocId = null,
  collection = null
) => {
  return new Promise(function(resolve, reject) {
    let ref = collectionRef(
      parentCollection,
      parantDocId,
      innerCollection,
      innerDocId,
      collection
    );
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
 * @description Function to GET All record for a Collection from firestore.
 * @param collection - Name of the collection where we want to GET data.
 * @param innerDocId - ID of Document.
 * @param innerCollection - inner Collection Name where we want to GET data.
 */

/**
 * @description Function to GET All record with specic query, order and pagination for a Collection from firestore.
 * @param collection - Name of the collection where we want to GET data.
 * @param queryArray - Query that will perform on perticular collection. It contais Array or Array (Array<Array>) to have multiple queries.
 *                     Every inner Array must have 3 parameters. ["key","operation","compare_with"]
 * @param orderBy - Order by "asc" or "desc" by perticular column.
 * @param startAfter - Used for paginations. Provide last page or document in this. Query will get data after this record
 * @param limit - Provide how many number of record in the request.
 */

export const getRecordWithQuery = (
  collection,
  queryArray = null,
  orderBy = null,
  startAfter = null,
  limit = null,
  innerDocId = null,
  innerCollection = null,
  innerOfInnerDocId = null,
  innerOfInnerCol = null
) => {
  return new Promise(function(resolve, reject) {
    let ref = collectionRef(
      collection,
      innerDocId,
      innerCollection,
      innerOfInnerDocId,
      innerOfInnerCol
    );
    let queryRef = ref;

    if (queryArray !== null) {
      queryArray.forEach((query) => {
        queryRef = queryRef.where(query[0], query[1], query[2]);
      });
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

/**
 * @description Function to Store image on storage of Firebase.
 * @param collection - Name of the collection where we want to store image.
 * @param userId - Id of user for give collectionRef id on storage.
 * @param uri - URI of image which you want to store on storage.
 * Note :- platform iOS -> uri & plaform android -> path
 */
export const storeImageOnFireStorage = (collection, userId, uri) => {
  return new Promise(function(resolve, reject) {
    let ref = storage().ref(`${collection}/${userId}`);
    ref
      .putFile(uri)
      .then((snapshot) => {
        //You can check the image is now uploaded in the storage bucket
        ref
          .getDownloadURL()
          .then((url) => {
            //from url you can fetched the uploaded image easily
            resolve(url);
          })
          .catch((e) => reject(e));
      })
      .catch((e) => reject(e));
  });
};
