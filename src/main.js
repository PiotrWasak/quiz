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
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle, faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(
  faUserSecret,
  faAppleAlt,
  faExclamationCircle,
  faPlusCircle,
  faMinusCircle,
  faGoogle,
  faFacebookF,
  faEnvelope
);

import { initializeApp } from "firebase/app";
import firebaseConfig from "./utils/firebaseConfig";

import { getFirestore } from "firebase/firestore";

export const firebase = initializeApp(firebaseConfig);
export const db = getFirestore();

import MyAlert from "./components/UI/MyAlert.vue";

import { InPlaceEditorComponent } from "@syncfusion/ej2-vue-inplace-editor";
import {
  ToastComponent,
  ToastCloseArgs,
} from "@syncfusion/ej2-vue-notifications";
import { TextBoxComponent } from "@syncfusion/ej2-vue-inputs";
import { ButtonComponent } from "@syncfusion/ej2-vue-buttons";
import {
  AccordionComponent,
  AccordionItemDirective,
  AccordionItemsDirective,
} from "@syncfusion/ej2-vue-navigations";
import { CheckBoxComponent } from "@syncfusion/ej2-vue-buttons";
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-grids';
import { DialogComponent } from "@syncfusion/ej2-vue-popups";

import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const options = {
  // You can set your default options here
};

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Toast);
app.component("FontAwesomeIcon", FontAwesomeIcon);
app.component("MyAlert", MyAlert);
app.component("ejs-inplaceeditor", InPlaceEditorComponent);
app.component("ejs-toast", ToastComponent);
app.component("ejs-textbox", TextBoxComponent);
app.component("ejs-button", ButtonComponent);
app.component("ejs-accordion", AccordionComponent);
app.component("e-accordionitems", AccordionItemsDirective);
app.component("e-accordionitem", AccordionItemDirective);
app.component("ejs-checkbox", CheckBoxComponent);
app.component('ejs-grid', GridComponent);
app.component('e-columns', ColumnsDirective);
app.component('e-column', ColumnDirective);
app.component('ejs-dialog', DialogComponent)
app.mount("#app");
