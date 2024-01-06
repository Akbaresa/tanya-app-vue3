import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCYiyAwuwVSyV7UbEraZK6HrsWzM_62W4k",
  authDomain: "tanya-storage.firebaseapp.com",
  projectId: "tanya-storage",
  storageBucket: "tanya-storage.appspot.com",
  messagingSenderId: "768818726166",
  appId: "1:768818726166:web:b9cf31c30791549b9f7c37",
  measurementId: "G-8K2NFV2E37"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export { storage }
