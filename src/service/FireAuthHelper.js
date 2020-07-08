import React from "react";
import { Auth } from "../setup/firebase/FirebaseSetup";

/**
 * @description Function to Login with Email/Password.
 * @param email - Email of the user.
 * @param password - Password of the user.
 */

export const signInWithEmail = (email, password) => {
  return new Promise(function(resolve, reject) {
    Auth()
      .signInWithEmailAndPassword(email, password)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @description Function to Register with Email/Password.
 * @param email - Email of the user.
 * @param password - Password of the user.
 */

export const signUpWithEmail = (email, password) => {
  return new Promise(function(resolve, reject) {
    Auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

/**
 * @description Function to Signout user.
 * @param null.
 */

export const signOutUser = () => {
  return new Promise(function(resolve, reject) {
    Auth()
      .signOut()
      .then((user) => {
        resolve(user);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

let userLoaded = false;

/**
 * @description Function check if User is logged in or not.
 * @param null.
 * @returns User object if logged in otherwise null
 */

export const checkAuthState = () => {
  return new Promise((resolve, reject) => {
    if (userLoaded && Auth().currentUser != null) {
      resolve(Auth().currentUser);
    }
    const unsubscribe = Auth().onAuthStateChanged((user) => {
      userLoaded = true;
      unsubscribe();
      resolve(user);
    }, reject);
  });
};

/**
 * @description Function to get Current LoggedIn User.
 * @param null.
 * @returns User object if logged in otherwise null
 */

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    if (Auth().currentUser) {
      resolve(Auth().currentUser);
    } else {
      const unsubscribe = Auth().onAuthStateChanged((user) => {
        userLoaded = true;
        unsubscribe();
        resolve(user);
      }, reject);
    }
  });
};
