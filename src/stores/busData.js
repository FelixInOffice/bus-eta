import { reactive, ref } from "vue";
import { defineStore } from "pinia";
import axiosApp from "../network/axios";
import endpoints from "../network/endpoints";

export const useBusStore = defineStore("bus", () => {

  const allBusRoute = ref(null);
  const allBusStop = ref(null);
  const allBusETAByBusStop = ref(null);

  async function getAllBusRoute() {
    const { data } = await axiosApp.get(endpoints.allBusRoute);  
    allBusRoute.value = data.data;
  }

  async function getAllBusStop() {
    const { data } = await axiosApp.get(endpoints.allBusStop);  
    allBusStop.value = data.data;
  }

  async function getAllBusETAByBusStop(stop_id) {
    const { data } = await axiosApp.get(`https://data.etabus.gov.hk/v1/transport/kmb/stop-eta/${stop_id}`);  
    allBusETAByBusStop.value = data;
  }


  return { allBusRoute, getAllBusRoute, allBusETAByBusStop, getAllBusETAByBusStop, allBusStop, getAllBusStop };
});
