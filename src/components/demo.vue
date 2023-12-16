<template>
    <div>
      <button @click="connect">Connect</button>
      <button @click="disconnect">Disconnect</button>
      <div v-if="connected">
        <input v-model="message" placeholder="Enter message" />
        <button @click="send">Send</button>
      </div>
      <div v-for="data in receivedData" :key="data.id">
        {{ data }}
      </div>
    </div>
  </template>
  
  <script>
  import { SerialPort } from 'serialport';
  
  export default {
    data() {
      return {
        connected: false,
        port: null,
        message: '',
        receivedData: []
      };
    },
    methods: {
      async connect() {
        try {
          const ports = await SerialPort.list();
          const port = new SerialPort(ports[0].path, { baudRate: 9600 });
          port.on('data', this.handleData);
          this.port = port;
          this.connected = true;
        } catch (error) {
          console.error(error);
        }
      },
      disconnect() {
        if (this.port) {
          this.port.close();
          this.port = null;
          this.connected = false;
        }
      },
      send() {
        if (this.port && this.message) {
          this.port.write(this.message);
          this.message = '';
        }
      },
      handleData(data) {
        this.receivedData.push({ id: Date.now(), data: data.toString() });
      }
    }
  };
  </script>
  