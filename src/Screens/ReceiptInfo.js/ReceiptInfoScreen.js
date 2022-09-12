import {
  Alert,
  DeviceEventEmitter,
  Dimensions,
  Image,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {SecondaryBtn, PrimaryBtn} from '../../Components/UI/cButtons';
import {
  CancelAssignedRouteOfVehicle,
  GetVehicleRouteDetailsByyReceiptId,
} from '../../Services/appServices/VehicleManagementService';
import {GlobalStyles} from '../../../GlobalStyle';
import {
  BluetoothManager,
  BluetoothEscposPrinter,
} from 'react-native-bluetooth-escpos-printer';
import ImgToBase64 from 'react-native-image-base64';
import ViewShot from 'react-native-view-shot';
import Logo from '../../Assets/images/logo.png';
import LoadingContainer from '../../Components/UI/LoadingContainer';
import {storeprintOnceData} from '../../Services/store/slices/printOnce';

const windowWidth = Dimensions.get('window').width;

const ReceiptInfoScreen = ({route}) => {
  const user = useSelector(state => state.storeUserData.userData);
  const {id, isActive} = route.params;
  const dispatch = useDispatch();
  const [ReceiptDetails, setReceiptDetails] = useState();
  const [Qr, setQr] = useState();
  const navigation = useNavigation();
  const [IsModalVisible, setIsModalVisible] = useState(false);
  const [Remarks, setREmarks] = useState('');
  const [VehicleId, setVehicleId] = useState();
  const [errors, setErrors] = useState({});
  const [DeviceAddress, setDeviceAddress] = useState(null);
  const ref = useRef();
  const [CaptureImage, setCaptureImage] = useState('');
  const AutoPrint = useSelector(state => state.storePrintOnce.printOnce);

  const ToSendData = {
    CompanyName: ReceiptDetails !== undefined ? ReceiptDetails.CompanyName : '',
    CompanyAddress:
      ReceiptDetails !== undefined ? ReceiptDetails.CompanyAddress : '',
    CompanyPhoneNumber:
      ReceiptDetails !== undefined ? ReceiptDetails.CompanyPhoneNumber : '',
    VehicleNumber:
      ReceiptDetails !== undefined ? ReceiptDetails.VehicleNumber : '',
    Driver: ReceiptDetails !== undefined ? ReceiptDetails.Driver : '',
    OwnerName: ReceiptDetails !== undefined ? ReceiptDetails.OwnerName : '',
    EntryDate:
      ReceiptDetails !== undefined ? ReceiptDetails.RouteDate.split('T') : '',
    EntryNepaliDate:
      ReceiptDetails !== undefined ? ReceiptDetails.NepaliDate : '',
    StaffContact:
      ReceiptDetails !== undefined ? ReceiptDetails.DriverNumber : '',
    Amount: ReceiptDetails !== undefined ? ReceiptDetails.ReceiptAmt : '',
    remarks: ReceiptDetails !== undefined ? ReceiptDetails.Remarks : '',
    route: ReceiptDetails !== undefined ? ReceiptDetails.Route : '',
    IsActive: ReceiptDetails !== undefined && ReceiptDetails.Isactive,
    CounterName: ReceiptDetails !== undefined ? ReceiptDetails.CounterName : '',
  };

  // console.log("to send data", ReceiptDetails)

  useEffect(() => {
    dispatch(
      GetVehicleRouteDetailsByyReceiptId(id, res => {
        // console.log("res", res)
        if (res?.VechileRouteByReceiptId.length > 0) {
          setReceiptDetails(res?.VechileRouteByReceiptId[0]);

          handleCapture();
        }
      }),
    );
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener(
        BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
        rsp => {
          // deviceAlreadPaired(rsp);
          // console.log("resp", rsp)
          if (rsp !== undefined) {
            setDeviceAddress(rsp);
          }
        },
      );
    }
    scanDevices();
  }, []);

  const scanDevices = useCallback(() => {
    // setLoading(true);
    // console.log("scannded")
    BluetoothManager.scanDevices().then(
      s => {
        // const pairedDevices = s.paired;
        var found = s.found;
        // console.log("found", found)
        try {
          found = JSON.parse(found); //@FIX_it: the parse action too weired..
          // console.log("found", found)
        } catch (e) {
          //ignore
        }
        var fds = found;
        if (found && found.length) {
          fds = found;
        }
      },
      er => {
        // ignore
      },
    );
  }, []);

  const handleCapture = () => {
    ref.current.capture().then(uri => {
      let img = ImgToBase64.getBase64String(uri)
        .then(base64String => setCaptureImage(base64String))
        .catch(err => console.log('error'));
    });
  };

  const print = () => {
    // console.log('inseide the function', DeviceAddress);
    if (DeviceAddress !== undefined) {
      let address = JSON.parse(DeviceAddress.devices)[0].address;
      // console.log(address)
      // console.log('CaptureImage', CaptureImage);

      // console.log(JSON.parse(DeviceAddress))
      if (CaptureImage !== '') {
        BluetoothManager.connect(address).then(
          s => {
            BluetoothEscposPrinter.printerAlign(
              BluetoothEscposPrinter.ALIGN.CENTER,
            );
            BluetoothEscposPrinter.setBlob(0);
            BluetoothEscposPrinter.printText('\n\r', {
              encoding: 'utf-8',
              codepage: 0,
              widthtimes: 3,
              heigthtimes: 2,
              fonttype: 1,
            });
            BluetoothEscposPrinter.printPic(CaptureImage, {
              height: 550,
              width: 375,
            });
          },
          e => {
            // setLoading(false);
            alert(e);
          },
        );
      }
    }
    dispatch(storeprintOnceData({}));
  };

  useEffect(() => {
    if (AutoPrint) {
      // console.log('device address', DeviceAddress);
      if (DeviceAddress !== null && CaptureImage !== '') {
        setTimeout(() => {
          // console.log('inininininiiniin');

          print();
        }, 3000);
      }
    }
  }, [DeviceAddress, CaptureImage]);

  useEffect(() => {
    getDataURL();
  }, []);

  const handleError = (error, input) => {
    setErrors(prevState => ({...prevState, [input]: error}));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isOpValid = true;
    if (Remarks === '' || Remarks === undefined) {
      handleError('कृपया गाडीको आईडी प्रविष्ट गर्नुहोस्', 'Remarks');
      isOpValid = false;
    }
    return isOpValid;
  };

  let svg = useRef(null);
  const getDataURL = () => {
    svg?.toDataURL(callback);
  };

  function callback(dataURL) {
    setQr(dataURL);
  }
  const htmlData = `${id}`;

  const handleCancel = () => {
    let isValidate = validate();
    let data = {
      vehicleid: VehicleId,
      receiptid: id,
      remarks: Remarks,
    };
    // console.log('Data', data)
    // return
    if (isValidate) {
      dispatch(
        CancelAssignedRouteOfVehicle(data, res => {
          if (res?.SuccessMsg === true) {
            Alert.alert('सफलता !', 'रसिद सफलतापूर्वक रद्द गरियो', [
              {text: 'ok', onPress: () => navigation.pop(1)},
            ]);
          } else {
            Alert.alert('असफलता !', 'फेरी प्रयास गर्नु होला', [{text: 'ok'}]);
          }
        }),
      );
    } else {
      Alert.alert('अलर्ट !', ' कृपया टिप्पणीहरू प्रविष्ट गर्नुहोस्', [
        {text: 'ok'},
      ]);
    }
  };

  return (
    <View style={GlobalStyles.mainContainer}>
      {ReceiptDetails === undefined && <LoadingContainer />}

      <ViewShot
        ref={ref}
        options={{fileName: 'Your-File-Name', format: 'jpg', quality: 0.9}}
        style={{backgroundColor: '#fefefe'}}>
        <View style={styles.PrintScreenContainer}>
          <View style={styles.contenHeadContainer}>
            <Text style={styles.CTitle}>{ToSendData.CompanyName}</Text>
            <Text style={styles.CAddress}>
              {ToSendData.CompanyAddress}, {ToSendData.CompanyPhoneNumber}
            </Text>
          </View>

          <View style={styles.spaceBetween}>
            <View style={styles.contentCol}>
              <Text style={styles.subTitle}>रसिद नं:</Text>
              <Text style={styles.subContent}>{id}</Text>
            </View>
            <View style={styles.contentCol}>
              <Text style={styles.subTitle}>मिति:</Text>
              <Text style={styles.subContent}>
                {ToSendData.EntryNepaliDate}
              </Text>
            </View>
            <View style={styles.contentCol}>
              <Text style={styles.subTitle}>समय:</Text>
              <Text style={styles.subContent}>{ToSendData.EntryDate[1]}</Text>

              {/* <Text style={styles.subTitle}>रकम:</Text>
              <Text style={styles.subContent}>{ToSendData.Amount}</Text> */}
            </View>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.subTitle}>मालिक:</Text>
            <Text style={styles.subContent}>{ToSendData.OwnerName}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.subTitle}>सवारी नं:</Text>
            <Text style={styles.subContent}>{ToSendData.VehicleNumber}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.subTitle}>रुट:</Text>
            <Text style={styles.subContent}>{ToSendData.route}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.subTitle}>चालक:</Text>
            <Text style={styles.subContent}>{ToSendData.Driver}</Text>
          </View>
          <View style={styles.contentRow}>
            <Text style={styles.subTitle}>फोन नं:</Text>
            <Text style={styles.subContent}>{ToSendData.StaffContact}</Text>
          </View>

          {/*           
          <View style={styles.contentRow}>
            <Text style={styles.subTitle}>मिति:</Text>
            <Text style={styles.subContent}>{ToSendData.EntryNepaliDate}</Text>
            </View> */}
          <View style={styles.contentRow}>
            <Text style={styles.subTitle}>टिप्पणीहरू:</Text>
            <Text style={styles.subContent}>{ToSendData.remarks}</Text>
          </View>

          <View class={styles.contentContainer} style={styles.spaceBetween}>
            <Image style={styles.tinyLogo} source={Logo} />
            <QRCode
              value={htmlData}
              size={120}
              getRef={e => {
                svg = e;
              }}
            />
          </View>
          <View style={styles.spaceBetween}>
            <View style={styles.contentCol}>
              <Text style={styles.subTitle}>काउन्टरको नाम:</Text>
              <Text style={styles.subContent}>{ToSendData.CounterName}</Text>
            </View>
            <View style={styles.contentCol}>
              <Text style={styles.subTitle}>टिकट वितरणकर्ता:</Text>
              <Text style={styles.subContent}>{user.UserName}</Text>
            </View>
          </View>
        </View>
      </ViewShot>

      <View
        style={[
          styles.BtnContainerStyle,
          {
            width: windowWidth - 16,
          },
        ]}>
        {ToSendData.route !== '' && (
          <>
            {ToSendData.IsActive ? (
              <>
                {user.RoleId === 1 || user.RoleId === 2 ? (
                  <>
                    <SecondaryBtn
                      title="रद्द गर्नुहोस्"
                      onPress={() => setIsModalVisible(!IsModalVisible)}
                    />
                    <PrimaryBtn title="पुन-प्रिन्ट" onPress={print} />
                  </>
                ) : (
                  <AppButton title="पुन-प्रिन्ट" onPress={print}></AppButton>
                )}
              </>
            ) : (
              <Text
                style={{
                  color: '#e78a8a',
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                रसिद रद्द गरिएको छ।
              </Text>
            )}
          </>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={IsModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!IsModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text>के तपाइँ रद्द गर्न चाहनुहुन्छ?</Text>
            <TextInput
              value={Remarks}
              onChangeText={e => setREmarks(e)}
              style={styles.inputStyleContainer}
              multiline
              numberOfLines={4}
              placeholder={'remarks'}
              onFocus={() => handleError(null, 'Remarks')}></TextInput>
            {errors.Remarks && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                }}>
                {errors.Remarks}
              </Text>
            )}
            <View style={[styles.BtnContainerStyle]}>
              <SecondaryBtn
                title="होइन"
                onPress={() => {
                  setIsModalVisible(!IsModalVisible);
                  setREmarks('');
                }}
              />
              <PrimaryBtn title="हो" onPress={() => handleCancel()} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ReceiptInfoScreen;

const styles = StyleSheet.create({
  PrintScreenContainer: {
    width: windowWidth - 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  contenHeadContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  contentCol: {
    flexDirection: 'column',
  },
  contentRow: {
    width: '100%',
    flexDirection: 'row',
    marginBottom: 8,
  },
  spaceBetween: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  CAddress: {
    fontSize: 14,
  },
  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 4,
  },
  subContent: {
    fontSize: 16,
    fontWeight: 'normal',
  },
  centeredView: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#47333399',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: windowWidth - 16,
    // height: 300,
    backgroundColor: '#fefefe',
    paddingHorizontal: 8,
    borderRadius: 8,
    paddingVertical: 16,
  },
  inputStyleContainer: {
    backgroundColor: '#ece7e7',
    width: windowWidth - 32,
    fontSize: 14,
    paddingHorizontal: 4,
    paddingVertical: 12,
    color: '#5c5656',
    borderRadius: 4,
    marginVertical: 8,
  },

  BtnContainerStyle: {
    // width: windowWidth - 16,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignItems: 'stretch'
  },
  tinyLogo: {
    width: 120,
    height: 120,
  },
});
