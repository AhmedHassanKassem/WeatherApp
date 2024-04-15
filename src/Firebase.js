import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCXjPeRxjLoJLZYfekc04J76xMmkcmG1EA",
  authDomain: "weatherauth-57158.firebaseapp.com",
  projectId: "weatherauth-57158",
  storageBucket: "weatherauth-57158.appspot.com",
  messagingSenderId: "775995314123",
  appId: "1:775995314123:web:e0bb9f223cf62a059eb04e"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export {auth}