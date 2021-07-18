import { Plugin } from "@nuxt/types";
import firebase from "~/plugins/firebase";
import { initializeAxios, initializeFirebase } from "~/src/utils/api";

const accessor: Plugin = ({ $axios }) => {
  initializeAxios($axios);
  initializeFirebase(firebase.app());
};

export default accessor;
