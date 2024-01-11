// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDI8C2ij4URKzMNNtmFTOTB4IgcnBiRMfI",
  authDomain: "tanya-app.firebaseapp.com",
  projectId: "tanya-app",
  storageBucket: "tanya-app.appspot.com",
  messagingSenderId: "943227113395",
  appId: "1:943227113395:web:ed94e617478256a69145c6",
  measurementId: "G-B9FYLDLCKS"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
export { storage }

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getStorage } from "firebase/storage";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCYiyAwuwVSyV7UbEraZK6HrsWzM_62W4k",
//   authDomain: "tanya-storage.firebaseapp.com",
//   projectId: "tanya-storage",
//   storageBucket: "tanya-storage.appspot.com",
//   messagingSenderId: "768818726166",
//   appId: "1:768818726166:web:6e904f1122e1439c9f7c37",
//   measurementId: "G-WZ2Y1SB926"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = getStorage(app)
// export { storage }

