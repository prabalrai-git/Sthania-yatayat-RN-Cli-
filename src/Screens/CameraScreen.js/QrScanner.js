import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Camera, useCameraDevices  } from 'react-native-vision-camera'
// import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import { useEffect } from 'react'

const QrScanner = () => {
  const [barcode, setBarcode]  = useState()
  const [isScanned, setIsScanned] = useState(false);

  // const [frameProcessor, barcodes] = useScanBarcodes([
  //   BarcodeFormat.ALL_FORMATS, // You can only specify a particular format
  // ]);

  useEffect(() => {

    console.log(GetPermission())
  }, [])

  // React.useEffect(() => {
  //   toggleActiveState();
  //   return () => {
  //     barcodes;
  //   };
  // }, [barcodes]);


  const GetPermission = async () => {
    const newCameraPermission = Camera.requestCameraPermission()
    return(
      newCameraPermission
    )
  }
  const devices = useCameraDevices()
  const device = devices.back;

  // const toggleActiveState = async () => {
  //   if (barcodes && barcodes.length > 0 && isScanned === false) {
  //     setIsScanned(true);
  //     // setBarcode('');
  //     barcodes.forEach(async (scannedBarcode) => {
  //       if (scannedBarcode.rawValue !== '') {
  //         setBarcode(scannedBarcode.rawValue);
  //         Alert.alert(barcode);
  //       }
  //     });
  //   }
  // };

  // console.log(device.id)


  return (
    <View style={{
      flex: 1,
    }}>
      {/* <Text>QrScanner</Text> */}
      {
        device !== undefined ?
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
        />
        : <Text>Dcive not found
          
        </Text>
      }

    </View>
  )
}

export default QrScanner

const styles = StyleSheet.create({})