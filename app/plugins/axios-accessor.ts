import { Plugin } from "@nuxt/types";
import { initializeAxios } from "~/src/utils/api";

const accessor: Plugin = ({ $axios }) => {
  initializeAxios($axios);
};

export default accessor;
