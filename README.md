# React Native Firebase FireStore Helper

FireStore Helper with React Native

This is a demo project with use of React Native to FireStore Helper with different methods provided by Firebase. You can ADD, UPDATE, DELETE, GET, GET with QUERY, GET with PAGINATION etc.

This project was built using [React Native Firebase](https://rnfirebase.io/).

Methods supported right now

**1. addRecord** : Function to add new record in firestore.
```
export const addRecord = (collection, data) => {
}
```
**2. editRecord** : Function to edit record in firestore.
```
export const editRecord = (collection, id, data) => {
}
```
**3. deleteRecord** : Function to Delete record permanently from firestore.
```
export const deleteRecord = (collection, id) => {
}
```
**4. deleteRecordSoft** : Function to soft Delete record from firestore. Record will be still in the database but with value deleted = true.
```
export const deleteRecordSoft = (collection, id) => {
}
```
**5. getRecord** : Function to GET Single record for a Collection based on id from firestore.
```
export const getRecord = (collection, id) => {
}
```
**6. getRecordAll** : Function to GET All record for a Collection from firestore.
```
export const getRecordAll = (collection) => {
}
```
**7. getRecordWithQuery** : Function to GET All record with specic query, order and pagination for a Collection from firestore.
```
export const getRecordWithQuery = (collection,queryArray: Array<Array> = null,orderBy: Array = null,startAfter = null,limit = null) => {
}
```


## How to run the demo project

1. To run the project
  
  ```
  npm install
  ```
  
  ```
  npx pod-install
  ```
  
2. Create a Firebase project 
  
  [Firebase](https://console.firebase.google.com/)
  
3. Add config object from Firebase Webapp in to /src/setup/firebase/FirebaseConfig.js
  
  ```
    const firebaseConfig = {
      apiKey: "",
      authDomain: "",
      databaseURL: "",
      projectId: "",
      storageBucket: "",
      messagingSenderId: "",
      appId: "",
      measurementId: "",
  };
``` 
4. Add Data to bare FireStore database. Node names : Class, Subject, Student
Add Class first, after that Subject and then Students data to check the app. You can change constants name from ./src/constants/index.js

## How to use 
1. First copy ./src/setup/firebase folder in your directory. Initialise FirebaseSetup file after your index.js load. It'll initialise firebase project first time when your project starts/
  
```
import FirebaseSetup from "./src/setup/firebase/FirebaseSetup";
AppRegistry.registerComponent(appName, () => FirebaseSetup);
``` 

2. Copy .src/service folder in your directory. Import methods as per your requirements from FireStoreHelper.js file. Every method returns [Promise](https://www.newline.co/fullstack-react/30-days-of-react/day-15/).  

```
import { addRecord, editRecord } from "../service/FireStoreHelper";

addRecord(CLASS, { class_name: className, order: parseInt(className) })
          .then((snapshot) => {
            navigation.goBack();
          })
          .catch((error) => {
            alert(error);
          });
``` 
3. You can find parameter names, description above that method in FireStoreHelper.js file

## To do

- [x] Add basic database operations
- [ ] Add Firebase Storage option
