import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUserSecret,
  faAppleAlt,
  faExclamationCircle,
  faPlusCircle,
  faMinusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faUserSecret, faAppleAlt, faExclamationCircle, faPlusCircle, faMinusCircle);

import { initializeApp } from "firebase/app";
import firebaseConfig from "./utils/firebaseConfig";

import { getFirestore } from "firebase/firestore";

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();

import MyAlert from "./components/UI/MyAlert.vue";

import { InPlaceEditorComponent } from "@syncfusion/ej2-vue-inplace-editor";


const app = createApp(App);
app.use(router);
app.use(store);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.component("MyAlert", MyAlert);
app.component("ejs-inplaceeditor", InPlaceEditorComponent);
app.mount("#app");
