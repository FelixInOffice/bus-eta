import { defineStore } from 'pinia'

export const useTunnelRecordStore = defineStore('counter', () => {
  function addRecord(tunnel) {
    const localTunnelRecord = JSON.parse(localStorage.getItem('tunnelRecordArray')) || [];
    localTunnelRecord.unshift(tunnel);
    localStorage.setItem('tunnelRecordArray', JSON.stringify(localTunnelRecord));
  }

  return { addRecord }
})
