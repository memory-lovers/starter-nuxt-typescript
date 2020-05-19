import { NuxtAxiosInstance } from "@nuxtjs/axios";

let $axios: NuxtAxiosInstance;

export function initializeAxios(axiosInstance: NuxtAxiosInstance) {
  console.info("**** initializeAxios");
  $axios = axiosInstance;
}

export { $axios };
