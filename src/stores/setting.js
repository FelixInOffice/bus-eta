import { reactive } from "vue";
import { defineStore } from "pinia";
import settingData from "@/pageData/settingData";

export const useSettingStore = defineStore("setting", () => {

  const setting = reactive({});

  settingData.content.forEach(function (settingItem) {
    setting[settingItem.key] = settingItem.default;

    if (localStorage.getItem(settingItem.key)) {
      setting[settingItem.key] = JSON.parse(localStorage.getItem(settingItem.key));
    } else {
      localStorage.setItem(settingItem.key, setting[settingItem.key]);
    }
  });

  return { setting };
});
