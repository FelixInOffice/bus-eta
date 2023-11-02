<template>
  <div style="color: red" @click="testing()">
    Testing page (home)
    {{ sortedBusStop }}

    <Popup v-if="errorPopupControl" :title="errorTitle" :content="errorContent">
      <Button
        v-if="errorPopupControl"
        @click="errorPopupControl = !errorPopupControl"
        >Close</Button
      >
    </Popup>

    <Popup
      v-if="!permissionStatus && !errorPopupControl"
      title="載入中..."
      content="正在取得你的當前位置..."
    />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive, computed } from "vue";
import { useBusStore } from "@/stores/busData";
import Popup from "@/components/common/Popup.vue";

const sortedBusStop = ref(null);

const permissionStatus = ref(false);
const errorPopupControl = ref(false);
const errorTitle = ref("");
const errorContent = ref("");
const currentLocation = reactive({
  speed: null,
  timestamp: null,
  latitude: null,
  longitude: null,
});

const busStore = useBusStore();

onMounted(() => {
  handleWatchPosition();
  busStore.getAllBusStop();
});

function testing() {
  // busStore.getAllBusRoute();
  // busStore.getAllBusStop();
  // busStore.getAllBusETAByBusStop('D360B3EBF155C15A');
  // const stopID = busStore.allBusStop.map((busStop) => ({ stop: busStop.stop }));

  sortedBusStop.value = computed(() => {
    return busStore.allBusStop
      .map((busStop) => {
        const distance = getDistanceFromLatLonInKm(
          currentLocation.latitude,
          currentLocation.longitude,
          busStop.lat,
          busStop.long
        );
        if (distance < 0.2) {
          return { ...busStop, distance };
        }
      })
      .sort((a, b) => a.distance - b.distance);
  });
}

function handleWatchPosition() {
  navigator.geolocation.watchPosition(success, error, {
    enableHighAccuracy: true,
  });
}

function success(position) {
  permissionStatus.value = true;
  errorPopupControl.value = false;

  const speed = position.coords.speed;
  const timestamp = position.timestamp;
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;

  currentLocation.speed = Math.round(speed * 3.6);
  currentLocation.timestamp = timestamp;
  currentLocation.latitude = latitude;
  currentLocation.longitude = longitude;
}

function error(err) {
  permissionStatus.value = false;
  errorPopupControl.value = true;

  errorTitle.value = "錯誤碼：" + err.code;
  errorContent.value = err.message;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2 - lat1); // deg2rad below
  var dLon = deg2rad(lon2 - lon1);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function formatDistance(distance) {
  if (distance < 1) {
    return Math.round(distance * 1000) + " 米";
  } else {
    return distance.toFixed(2) + " 公里";
  }
}
</script>
