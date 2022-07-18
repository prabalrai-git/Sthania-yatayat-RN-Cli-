// import { Alert, StyleSheet, Text, View, DeviceEventEmitter, Platform } from 'react-native'
// import React, { useCallback, useEffect } from 'react'
// import { BluetoothManager, BluetoothEscposPrinter } from 'react-native-bluetooth-escpos-printer'

// export const bluttothPrint = async () => {
//   // BluetoothManager.isBluetoothEnabled().then((enabled) => {
//   //   alert(enabled) // enabled ==> true /false
//   // }, (err) => {
//   //   alert(err)
//   // });
  
//   BluetoothManager.scanDevices().then(
//     s => {
//       var found = s.found;
//       console.log("found", found)
//       try {
//         found = JSON.parse(found);
//       } catch (e) {
//       }
//     })
//   DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
//     console.log("er", rsp)
//     // let device = JSON.parse(rsp)
//     BluetoothManager.connect(device.address).then(
//       s => {
//         // setLoading(false);
//         // setBoundAddress(row.address);
//         // setName(row.name || 'UNKNOWN');
//       },
//       e => {
//         // setLoading(false);
//         // alert(e);
//       },
//     );
//   });
//   // BluetoothEscposPrinter.printText('poatato\r\n\r\n\r\n', {});

// }
