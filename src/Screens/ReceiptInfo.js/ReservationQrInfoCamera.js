import {
    Alert,
    DeviceEventEmitter,
    Dimensions,
    Image,
    Keyboard,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';
import {
    GetReservationDetailsByRId,
    GetVehicleRouteDetailsByyReceiptId,
} from '../../Services/appServices/VehicleManagementService';
import { GlobalStyles } from '../../../GlobalStyle';
import {
    BluetoothManager,
} from 'react-native-bluetooth-escpos-printer';
import ImgToBase64 from 'react-native-image-base64';
import ViewShot from 'react-native-view-shot';
import Logo from '../../Assets/images/logo2.png';
import LoadingContainer from '../../Components/UI/LoadingContainer';
import { ScrollView } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ReservationQrInfoCamera = ({ route }) => {
    const user = useSelector(state => state.storeUserData.userData);
    const { id, isActive } = route.params;
    const dispatch = useDispatch();
    const [ReceiptDetails, setReceiptDetails] = useState();
    const [Qr, setQr] = useState();
    const navigation = useNavigation();
    // const [IsModalVisible, setIsModalVisible] = useState(false);
    const [Remarks, setREmarks] = useState('');
    const [VehicleId, setVehicleId] = useState();
    const [errors, setErrors] = useState({});
    const [DeviceAddress, setDeviceAddress] = useState();
    const ref = useRef();
    const [CaptureImage, setCaptureImage] = useState('');
    const [reservationData, setReservationData] = useState();










    // Pokhara Header Data

    const printHeader = {
        title: 'पोखरा यातायात प्रा.ली',
        addressAndContact: 'शिवटोल -0९, पोखरा, ०६१-५५२२८०/५४४६८० '

    }

    // Sthaniya yatayat Header Data

    // const printHeader = {
    //   title: "श्री स्थानिया यातायात प्रा.ली",
    //   addressAndContact: 'पोखरा, 01-5909085'
    // }










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
        // console.log(id, 'this is id')
        dispatch(GetReservationDetailsByRId(id, res => {
            // console.log(res, 'newres');
            setReservationData(res.GetReservationDetailsByRId[0]);
        }));
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

    // const print = async () => {
    //   if (DeviceAddress !== undefined) {
    //     let address = JSON.parse(DeviceAddress.devices)[0].address;
    //     // console.log(address)
    //     // console.log(JSON.parse(DeviceAddress))
    //     if (CaptureImage !== '') {
    //       BluetoothManager.connect(address).then(
    //         s => {
    //           BluetoothEscposPrinter.printerAlign(
    //             BluetoothEscposPrinter.ALIGN.CENTER,
    //           );
    //           BluetoothEscposPrinter.setBlob(0);
    //           BluetoothEscposPrinter.printText('\n\r', {
    //             encoding: 'utf-8',
    //             codepage: 0,
    //             widthtimes: 3,
    //             heigthtimes: 2,
    //             fonttype: 1,
    //           });
    //           BluetoothEscposPrinter.printPic(CaptureImage, {
    //             height: 550,
    //             width: 375,
    //           });
    //         },
    //         e => {
    //           // setLoading(false);
    //           alert(e);
    //         },
    //       );
    //     }
    //   }

    // useEffect(() => {
    //     getDataURL();
    // }, []);

    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };

    // const validate = () => {
    //   Keyboard.dismiss();
    //   let isOpValid = true;
    //   if (Remarks === '' || Remarks === undefined) {
    //     handleError('कृपया गाडीको आईडी प्रविष्ट गर्नुहोस्', 'Remarks');
    //     isOpValid = false;
    //   }
    //   return isOpValid;
    // };

    // let svg = useRef(null);
    // const getDataURL = () => {
    //     svg?.toDataURL(callback);
    // };

    // function callback(dataURL) {
    //     setQr(dataURL);
    // }
    const htmlData = `${"R" + id}`;



    return (

        reservationData && (

            < View style={GlobalStyles.mainContainer} >
                {/* {ReceiptDetails === undefined && <LoadingContainer />} */}
                < ScrollView >

                    <ViewShot
                        ref={ref}
                        options={{ fileName: 'Your-File-Name', format: 'jpg', quality: 0.9 }}
                        style={{ backgroundColor: '#fefefe' }}>
                        <View style={[styles.PrintScreenContainer, { marginTop: 0 }]}>
                            <View style={styles.contenHeadContainer}>
                                <Text style={styles.CTitle}>

                                    {printHeader.title}
                                </Text>
                                <Text style={styles.CAddress}>


                                    {printHeader.addressAndContact}
                                </Text>
                            </View>

                            <View style={styles.spaceBetween}>
                                <View style={styles.contentCol}>
                                    <Text style={styles.subTitle}>रसिद नं:</Text>
                                    <Text style={styles.subContent}>{reservationData.RId}</Text>
                                </View>
                                <View style={styles.contentCol}>
                                    <Text style={styles.subTitle}>मिति:</Text>
                                    <Text style={styles.subContent}>
                                        {reservationData.ReserveNepalidate}
                                    </Text>
                                </View>
                                <View style={styles.contentCol}>
                                    <Text style={styles.subTitle}>समय:</Text>
                                    <Text style={styles.subContent}>{reservationData.ReservationDate.split("T")[1]}</Text>

                                </View>
                                <View style={styles.contentCol}>
                                    <Text style={styles.subTitle}>रिजर्व दिनहरू:</Text>
                                    <Text style={styles.subContent}>
                                        {reservationData.ReserveDays}
                                    </Text>

                                </View>
                            </View>
                            <View style={{ marginRight: 280 }} >
                                <Text style={styles.subTitle}>रकम:</Text>
                                <Text style={styles.subContent}>
                                    {reservationData.Charge}

                                </Text>
                            </View>

                            <View style={styles.contentRow}>
                                <Text style={styles.subTitle}>सवारी नं:</Text>
                                <Text style={styles.subContent}>
                                    {reservationData.VehicleNumber}
                                </Text>
                            </View>
                            <View style={styles.contentRow}>
                                <Text style={styles.subTitle}>रिजर्व स्थान:</Text>
                                <Text style={styles.subContent}>
                                    {reservationData.ReserverLocation}
                                </Text>
                            </View>
                            {/* <View style={styles.contentRow}>
              <Text style={styles.subTitle}>चालक:</Text>
              <Text style={styles.subContent}>{ToSendData.Driver}</Text>
            </View>
            <View style={styles.contentRow}>
              <Text style={styles.subTitle}>फोन नं:</Text>
              <Text style={styles.subContent}>{ToSendData.StaffContact}</Text>
            </View> */}

                            {/*           
            <View style={styles.contentRow}>
              <Text style={styles.subTitle}>मिति:</Text>
              <Text style={styles.subContent}>{ToSendData.EntryNepaliDate}</Text>
              </View> */}
                            <View style={styles.contentRow}>
                                <Text style={styles.subTitle}>टिप्पणीहरू:</Text>
                                <Text style={styles.subContent}>{reservationData.ReserveRemarks}</Text>
                            </View>

                            <View class={styles.contentContainer} style={styles.spaceBetween}>
                                <Image style={styles.tinyLogo} source={Logo} />
                                <QRCode
                                    value={htmlData}
                                    size={120}
                                // getRef={e => {
                                //     svg = e;
                                // }}
                                />
                            </View>
                            <View style={styles.spaceBetween}>
                                <View style={styles.contentCol}>
                                    <Text style={styles.subTitle}>काउन्टरको नाम:</Text>
                                    <Text style={styles.subContent}>{reservationData.UserName}</Text>
                                </View>
                                <View style={styles.contentCol}>
                                    <Text style={styles.subTitle}>टिकट वितरणकर्ता:</Text>
                                    <Text style={styles.subContent}>{reservationData.UserName}</Text>
                                </View>
                            </View>
                        </View>
                    </ViewShot>

                    {/* <View
              style={[
                styles.BtnContainerStyle,
                {
                  width: windowWidth - 16,
                },
              ]}>
              <PrimaryBtn title="पुन-प्रिन्ट" onPress={print} />
            </View> */}

                </ScrollView >

            </View >
        )



    );
};


export default ReservationQrInfoCamera;

const styles = StyleSheet.create({
    PrintScreenContainer: {
        padding: 12,
        paddingTop: 0,
        marginTop: 10,
        width: windowWidth - 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        color: 'black',
    },
    contenHeadContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        color: 'black'

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
        width: windowWidth - 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap'
    },
    CTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black'

    },
    CAddress: {
        fontSize: 16,
        color: 'black'

    },
    subTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 4,
        color: 'black'

    },
    subContent: {
        fontSize: 18,
        fontWeight: 'normal',
        color: 'black'

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
        color: 'black'

    },
});
