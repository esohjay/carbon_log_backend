"use strict";
// // // import * as admin from "firebase-admin";
// // // import { App } from "firebase-admin/app";
// // // import {getFirestore} from 'firebase-admin/firestore'
// // // import { decryptToString } from "./secure-file";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.auth = void 0;
// // // const secureFileName = "./serviceAccount.json.secure";
// // // decryptToString(secureFileName)
// // //   .then((jsonStr) => {
// // //     const serviceAccount = JSON.parse(jsonStr);
// // //     admin.initializeApp({
// // //       credential: admin.credential.cert(serviceAccount),
// // //     });
// // //   })
// // //   .catch((e) => {
// // //     console.log(e);
// // //   });
// // // export const db = getFirestore()
// // import admin from "firebase-admin";
// import { getFirestore } from "firebase-admin/firestore";
// import { decryptToString } from "./secure-file";
// const secureFileName = "./serviceAccount.json.secure";
// // // const jsonStr = decryptToString(secureFileName);
// // // if (!jsonStr) {
// // //   throw new Error("Error decrypting service file");
// // // }
// // // const serviceAccount = JSON.parse(jsonStr);
// // // export default admin.initializeApp({
// // //   credential: admin.credential.cert(serviceAccount),
// // // });
// // // Wrap the asynchronous logic in an async function
// // async function initializeFirebase() {
// //   try {
// //     const jsonStr = await decryptToString(secureFileName);
// //     const serviceAccount = JSON.parse(jsonStr);
// //     // Initialize Firebase Admin
// //     return admin.initializeApp({
// //       credential: admin.credential.cert(serviceAccount),
// //     });
// //     // Export the Firestore instance
// //     // export const db = getFirestore();
// //   } catch (e) {
// //     console.error(e);
// //   }
// // }
// // // Call the async function to initialize Firebase
// // export const firebaseApp = initializeFirebase();
// // Import only what you need
// import { initializeApp, App, cert } from "firebase-admin/app";
// import { getAuth } from "firebase-admin/auth";
// // const jsonStr = await decryptToString(secureFileName);
// // const serviceAccount = JSON.parse(jsonStr);
// async function initializeFirebase() {
//     let app: App
//   try {
//     const jsonStr = await decryptToString(secureFileName);
//     const serviceAccount = JSON.parse(jsonStr);
//     app = initializeApp({
//         credential: cert(serviceAccount),
//       });
//       if (!app) {
//         throw new Error("Error decrypting service file");
//       }
// return app
//     // Export the Firestore instance
//     // export const db = getFirestore();
//   } catch (e) {
//     console.error(e);
//   }
// }
// const app = initializeFirebase()
// // const app: App = initializeApp({
// //   credential: cert(serviceAccount),
// // });
// // if (!app) {
// //   throw new Error("Error decrypting service file");
// // }
// export const auth = getAuth(app);
// export const db = getFirestore();
const app_1 = require("firebase-admin/app");
const auth_1 = require("firebase-admin/auth");
const firestore_1 = require("firebase-admin/firestore");
const secure_file_1 = require("./secure-file");
const secureFileName = "./serviceAccount.json.secure";
let auth; // Declare the auth variable at the top level
function initializeFirebase() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const jsonStr = yield (0, secure_file_1.decryptToString)(secureFileName);
            const serviceAccount = JSON.parse(jsonStr);
            // Initialize Firebase Admin
            const app = (0, app_1.initializeApp)({
                credential: (0, app_1.cert)(serviceAccount),
            });
            if (!app) {
                throw new Error("Error initializing Firebase app");
            }
            exports.auth = auth = (0, auth_1.getAuth)(app); // Assign the value to the top-level auth variable
            return app;
        }
        catch (e) {
            console.error(e);
            throw e; // Re-throw the error to handle it outside
        }
    });
}
// Use an async IIFE (Immediately Invoked Function Expression) to await the initialization
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const app = yield initializeFirebase();
    }
    catch (e) {
        console.error("Failed to initialize Firebase:", e);
    }
}))();
exports.db = (0, firestore_1.getFirestore)();
