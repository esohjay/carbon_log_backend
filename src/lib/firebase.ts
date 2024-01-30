import { initializeApp, App, cert, ServiceAccount } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
// import { decryptToString } from "./secure-file";

// const secureFileName = "./serviceAccount.json.secure";
// const jsonStr = await decryptToString(secureFileName);
const serviceAccount = {
  type: "service_account",
  project_id: process.env.PROJECT_ID,
  private_key_id: process.env.PRIVATE_KEY_ID,
  private_key: (process.env.PRIVATE_KEY as string).replace(/\\n/g, "\n"),
  client_email: process.env.CLIENT_EMAIL,
  client_id: process.env.CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: process.env.CERT_URL,
  universe_domain: "googleapis.com",
} as ServiceAccount;

// Initialize Firebase Admin
const app: App = initializeApp({
  credential: cert(serviceAccount),
});

if (!app) {
  throw new Error("Error initializing Firebase app");
}

export const auth = getAuth(app); // Assign the value to the top-level auth variable
export const db = getFirestore();

// let auth: Auth; // Declare the auth variable at the top level
// let db: Firestore;
// let app : App;
// async function initializeFirebase(): Promise<App> {
//   try {
//     const jsonStr = await decryptToString(secureFileName);
//     const serviceAccount = JSON.parse(jsonStr);
//     // Initialize Firebase Admin
//     const app: App = initializeApp({
//       credential: cert(serviceAccount),
//     });

//     if (!app) {
//       throw new Error("Error initializing Firebase app");
//     }

//     auth = getAuth(app); // Assign the value to the top-level auth variable
//     console.log(auth.app.options.credential, "AUTH");
//     return app;
//   } catch (e) {
//     console.error(e);
//     throw e; // Re-throw the error to handle it outside
//   }
// }

// // Use an async IIFE (Immediately Invoked Function Expression) to await the initialization
// (async () => {
//   try {
//     const app: App = await initializeFirebase();
//     db = getFirestore();
//     return app
//   } catch (e) {
//     console.error("Failed to initialize Firebase:", e);
//   }
// })();

// // Export the auth variable at the top level
// export { auth, db };
