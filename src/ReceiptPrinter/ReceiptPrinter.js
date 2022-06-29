import React, { useState, useEffect, useCallback } from 'react';
import {
  ActivityIndicator,
  Button,
  DeviceEventEmitter,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  Pressable,
  ScrollView,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import { BluetoothManager, BluetoothEscposPrinter, BluetoothTscPrinter } from 'react-native-bluetooth-escpos-printer';
import ItemList from './ItemList';
import SamplePrint from './SamplePrint';
import { styles } from './styles';

const ReceiptPrinter = () => {
  const [pairedDevices, setPairedDevices] = useState([]);
  const [foundDs, setFoundDs] = useState([]);
  const [bleOpend, setBleOpend] = useState(false);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [boundAddress, setBoundAddress] = useState('');

  useEffect(() => {
    BluetoothManager.isBluetoothEnabled().then(
      enabled => {
        setBleOpend(Boolean(enabled));
        setLoading(false);
      },
      err => {
        err;
      },
    );
    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, rsp => {
        deviceAlreadPaired(rsp);
        console.log("res", rsp)
      });
      // DeviceEventEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, rsp => {
      //   deviceFoundEvent(rsp);
      // });
      // DeviceEventEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
      //   setName('');
      //   setBoundAddress('');
      // });
      // DeviceEventEmitter.addListener(BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
      //   ToastAndroid.show('Device Not Support Bluetooth !', ToastAndroid.LONG);
      // });
    }


    scanDevices()

  }, []);

  const deviceAlreadPaired = useCallback(
    rsp => {
      var ds = null;
      if (typeof rsp.devices === 'object') {
        ds = rsp.devices;
      } else {
        try {
          ds = JSON.parse(rsp.devices);
        } catch (e) { }
      }
      if (ds && ds.length) {
        let pared = pairedDevices;
        if (pared.length < 1) {
          pared = pared.concat(ds || []);
        }
        setPairedDevices(pared);
      }
    },
    [pairedDevices],
  );

  const deviceFoundEvent = useCallback(
    rsp => {
      var r = null;
      try {
        if (typeof rsp.device === 'object') {
          r = rsp.device;
        } else {
          r = JSON.parse(rsp.device);
        }
      } catch (e) {
        // ignore error
      }

      if (r) {
        let found = foundDs || [];
        if (found.findIndex) {
          let duplicated = found.findIndex(function (x) {
            return x.address == r.address;
          });
          if (duplicated == -1) {
            found.push(r);
            setFoundDs(found);
          }
        }
      }
    },
    [foundDs],
  );

  const connect = row => {

    // console.log("address", row);
    setLoading(true);
    BluetoothManager.connect('00:AA:11:BB:22:CC').then(
      s => {
        console.log("paired", s)
        // setLoading(false);
        // setBoundAddress(row.address);
        // setName(row.name || 'UNKNOWN');
        // alert("connnectd")
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const unPair = address => {
    setLoading(true);
    BluetoothManager.unpaire(address).then(
      s => {
        setLoading(false);
        setBoundAddress('');
        setName('');
      },
      e => {
        setLoading(false);
        alert(e);
      },
    );
  };

  const scanDevices = useCallback(() => {
    setLoading(true);
    BluetoothManager.scanDevices().then(
      s => {
        console.log(s)
        let data = JSON.parse(s)
        setFoundDs(data.found);

        setLoading(false);
      },
      er => {
        setLoading(false);
      },
    );
  }, [foundDs]);

  // console.log(foundDs);



  return (
    <>
      <View>
        <Text>poato</Text>
        <Button title='refresh' onPress={() => {
          scanDevices()
          console.log("pressed")
        }}></Button>
        <Button title='connect' onPress={() => {
          connect()
        }}></Button>


        <Button
          onPress={async () => {
            await BluetoothEscposPrinter.printText("                 \n\r", {});
            await BluetoothEscposPrinter.setBlob(10);
            await BluetoothEscposPrinter.printText("Col one\n\r", {
              encoding: 'GBK',
              codepage: 0,
              widthtimes: 3,
              heigthtimes: 3,
              fonttype: 1
            })
            await BluetoothEscposPrinter.printText("                 \n\r", {});
            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
            await BluetoothEscposPrinter.printText("Luniva Yatayat\n\r", {});
            await BluetoothEscposPrinter.printText("Kupandoel, Lalitput\n\r", {});
            await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
            await BluetoothEscposPrinter.printText("Receipt no: 1111\n\r", {});
            await BluetoothEscposPrinter.printText("Vehicle no: BA.121021\n\r", {});
            await BluetoothEscposPrinter.printText("Fare: Rs500\n\r", {});
            await BluetoothEscposPrinter.printText("date: 2022-0506\n\r", {});
            await BluetoothEscposPrinter.printText("time: 20:30\n\r", {});
            await BluetoothEscposPrinter.printText("driver: ram moktan\n\r", {});
            await BluetoothEscposPrinter.printText("phone number: 090909009\n\r", {});
            await BluetoothEscposPrinter.printText("owner: ram moktan\n\r", {});
            await BluetoothEscposPrinter.printText("root: kathmandu to pokhara\n\r", {});
            await BluetoothEscposPrinter.printText("remarks: kathmandu to pokhara\n\r", {});
            // qr code
            await BluetoothEscposPrinter.printText("Printerd By: suman\n\r", {});
            await BluetoothEscposPrinter.printText("                 \n\r", {});
            await BluetoothEscposPrinter.printText("                 \n\r", {});
            await BluetoothEscposPrinter.printText("                 \n\r", {});

          }
          }
          title="Print BarCode"
        />
        <ScrollView>
          {
            foundDs !== [] &&
            foundDs.map(e => (
              <Pressable style={{
                borderWidth: 1,
                marginHorizontal: 10,
                marginBottom: 8,
                borderRadius: 4,
                padding: 4,
              }}
                onPress={() => {
                  connect(e)
                }}
                key={e.address}
              >
                <Text>{e.address}</Text>
                <Text>{e.name}</Text>
              </Pressable>

            ))
          }
        </ScrollView>

      </View>
    </>
  );
};


export default ReceiptPrinter