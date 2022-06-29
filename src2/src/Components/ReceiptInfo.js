import { Alert, Dimensions, Keyboard, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { GlobalStyles } from '../../GlobalStyle';
import { useDispatch, useSelector } from 'react-redux';
import { CancelAssignedRouteOfVehicle, GetCompanyDetail, GetStaffDetailsByVehicleIdd, GetVehicleRouteDetailsByyReceiptId } from '../Services/appServices/VehicleManagementService';
import * as Print from 'expo-print';
import QRCode from 'react-native-qrcode-svg';
import AppButton from './UI/AppButton';
import LoadingContainer from './UI/LoadingContainer';
import { useNavigation } from '@react-navigation/native';
import { PrimaryBtn, SecondaryBtn } from './UI/cButtons';
import { Input } from 'react-native-elements';

const windowWidth = Dimensions.get('window').width;


const ReceiptInfo = ({ route }) => {

  const roleId = useSelector(state => state.storeUserData.userData.RoleId);
  const { id, isActive } = route.params
  const dispatch = useDispatch();
  const [CompanyDetail, setCompanyDetail] = useState();
  const [StaffContact, setStaffContact] = useState();
  const [ReceiptDetails, setReceiptDetails] = useState();
  const [Qr, setQr] = useState();
  const navigation = useNavigation();
  const [IsModalVisible, setIsModalVisible] = useState(false);
  const [Remarks, setREmarks] = useState('');
  const [VehicleId, setVehicleId] = useState();
  const [errors, setErrors] = useState({});
  const user = useSelector(state => state.storeUserData.userData);


  const ToSendData = {
    CompanyName: CompanyDetail !== undefined ? CompanyDetail.CompanyName : '',
    CompanyAddress: CompanyDetail !== undefined ? CompanyDetail.CompanyAddress : '',
    VehicleNumber: ReceiptDetails !== undefined ? ReceiptDetails.VehicleNumber : '',
    Driver: ReceiptDetails !== undefined ? ReceiptDetails.Driver : '',
    OwnerName: ReceiptDetails !== undefined ? ReceiptDetails.OwnerName : '',
    EntryDate: ReceiptDetails !== undefined ? ReceiptDetails.RouteDate.split("T") : '',
    EntryNepaliDate: ReceiptDetails !== undefined ? ReceiptDetails.NepaliDate : '',
    StaffContact: StaffContact !== undefined ? StaffContact.toString() : '',
    Amount: ReceiptDetails !== undefined ? ReceiptDetails.ReceiptAmt : '',
    remarks: ReceiptDetails !== undefined ? ReceiptDetails.Remarks : '',
    route: ReceiptDetails !== undefined ? ReceiptDetails.Route : '',
    IsActive: ReceiptDetails !== undefined && ReceiptDetails.Isactive,
  }

  // console.log("ToSendData", ToSendData);

  useEffect(() => {
    dispatch(GetCompanyDetail((res) => {
      if (res?.GetCompanyDetails.length > 0) {
        setCompanyDetail(res?.GetCompanyDetails[0])
      }
    }))
    dispatch(GetVehicleRouteDetailsByyReceiptId(id, (res) => {
      if (res?.VechileRouteByReceiptId.length > 0) {
        setReceiptDetails(res?.VechileRouteByReceiptId[0])
        setVehicleId(res?.VechileRouteByReceiptId[0].VId)
        dispatch(GetStaffDetailsByVehicleIdd(res?.VechileRouteByReceiptId[0].VId, (res) => {
          let temp = [];
          if (res?.StaffDetails.length > 0) {
            // setStaffDetail(res?.StaffDetails)
            res?.StaffDetails.map(e => {
              temp.push(e.StaffContactNumber);
            })
            setStaffContact(temp);
          }
        }))
      }
    }))
  }, [])

  // console.log("receip id details", ReceiptDetails)

  const print = async () => {
    if (Qr != undefined) {
      await Print.printAsync({
        html,
      });
      navigation.popToTop();
    } else {
    }


  }
  useEffect(() => {
    getDataURL()
  }, [])

  const handleError = (error, input) => {
    setErrors(prevState =>
      ({ ...prevState, [input]: error }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isOpValid = true
    if (Remarks === '' || Remarks === undefined) {
      handleError('कृपया गाडीको आईडी प्रविष्ट गर्नुहोस्', 'Remarks')
      isOpValid = false
    }
    return isOpValid;
  }


  const html = `
  <html>
    <head>
      <style>
      .body {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        /* align-items: center; */
      }
      .content {
        display: flex;
        flex-direction: column;
        margin-bottom: 4px;
      }
      span {
        font-size: 13px;
      }
      </style>
    </head>

    <div class="body">
    <div class='content' style="align-items: center;">
      <span>${ToSendData.CompanyName}</span>
      <span>${ToSendData.CompanyAddress}</span>
    </div>

    <div style="display: flex; justify-content: space-between;">
    <div class="content">
        <span>रसिद नं:</span>
        <span>${id}</span>
      </div>
      <div class="content">
        <span>सवारी नं:</span>
        <span>${ToSendData.VehicleNumber}</span>
      </div>
      <div class="content">
        <span>रकम:</span>
        <span>${ToSendData.Amount}</span>
      </div>
    </div>

    <div style="display: flex; justify-content: space-between;">
    <div class="content">
      <span>मिति:</span>
      <span>${ToSendData.EntryNepaliDate}</span>
    </div>
    <div class="content">
      <span>समय: </span>
      <span>${ToSendData.EntryDate[1]}</span>
    </div>
    </div>

    <div class="content">
      <span>चालक: ${ToSendData.Driver}</span>
    </div>
    <div class="content">
      <span>फोन नं: ${ToSendData.StaffContact}</span>
    </div>
    <div class="content">
      <span>मालिक: ${ToSendData.OwnerName}</span>
    </div>
    <div class="content">
      <span>रुट: ${ToSendData.route}</span>
    </div>
    <div class="content">
      <span>टिप्पणीहरू:${ToSendData.remarks}</span>
    </div>
    
    <div class="content">
      <img src='data:image/jpeg;base64, ${Qr}' alt="" width="80px">
    </div>
    <div class="content">
    <span>${user.UserName} द्वारा छापिएको</span>
  </div>
  </div>
  </html>
  `;

  let svg = useRef(null);
  const getDataURL = () => {
    svg?.toDataURL(callback);
  };

  function callback(dataURL) {
    setQr(dataURL)
  }
  const htmlData = `${id}`;

  const handleCancel = () => {
    let isValidate = validate();
    let data = {
      vehicleid: VehicleId,
      receiptid: id,
      remarks: Remarks,
    }
    // console.log('Data', data)
    // return
    if (isValidate) {
      dispatch(CancelAssignedRouteOfVehicle(data, (res) => {

        if (res?.SuccessMsg === true) {
          Alert.alert(
            "सफलता !",
            "रसिद सफलतापूर्वक रद्द गरियो",
            [
              { text: 'ok', onPress: () => navigation.pop(1) }
            ]
          )
        } else {
          Alert.alert(
            "असफलता !",
            "फेरी प्रयास गर्नु होला",
            [
              { text: 'ok' }
            ]
          )
        }
      }))
    } else {
      Alert.alert(
        "अलर्ट !",
        " कृपया टिप्पणीहरू प्रविष्ट गर्नुहोस्",
        [
          { text: 'ok' }
        ]
      )
    }
  }

  return (
    <View style={GlobalStyles.mainContainer}>

      <View style={styles.PrintScreenContainer}>
        <View style={styles.contenHeadContainer}>
          <Text style={styles.CTitle}>{ToSendData.CompanyName}</Text>
          <Text style={styles.CAddress}>{ToSendData.CompanyAddress}</Text>
        </View>


        <View style={styles.spaceBetween}>
          <View style={styles.contentCol}>
            <Text style={styles.subTitle}>रसिद नं:</Text>
            <Text style={styles.subContent}>{id}</Text>
          </View>
          <View style={styles.contentCol}>
            <Text style={styles.subTitle}>सवारी नं:</Text>
            <Text style={styles.subContent}>{ToSendData.VehicleNumber}</Text>
          </View>
          <View style={styles.contentCol}>
            <Text style={styles.subTitle}>रकम:</Text>
            <Text style={styles.subContent}>{ToSendData.Amount}</Text>
          </View>
        </View>

        <View style={styles.contentRow}>
          <Text style={styles.subTitle}>चालक:</Text>
          <Text style={styles.subContent}>{ToSendData.Driver}</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.subTitle}>फोन नं:</Text>
          <Text style={styles.subContent}>{ToSendData.StaffContact}</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.subTitle}>मालिक:</Text>
          <Text style={styles.subContent}>{ToSendData.OwnerName}</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.subTitle}>रुट:</Text>
          <Text style={styles.subContent}>{ToSendData.route}</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.subTitle}>मिति:</Text>
          <Text style={styles.subContent}>{ToSendData.EntryNepaliDate}</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.subTitle}>समय:</Text>
          <Text style={styles.subContent}>{ToSendData.EntryDate[1]}</Text>
        </View>
        <View style={styles.contentRow}>
          <Text style={styles.subTitle}>टिप्पणीहरू:</Text>
          <Text style={styles.subContent}>{ToSendData.remarks}</Text>
        </View>

        <View class={styles.contentContainer} style="align-items: center;">
          <QRCode
            value={htmlData}
            size={120}
            getRef={(e) => {
              (svg = e)
            }}
          />
        </View>
      </View>
      <View style={[styles.BtnContainerStyle, {
        width: windowWidth - 16,
      }]}>

        {
          ToSendData.route !== '' &&
          <>
            {
              ToSendData.IsActive
                ?
                <>
                  {
                    (roleId === 1 || roleId === 2) ?
                      <>
                        <SecondaryBtn title='रद्द गर्नुहोस्' onPress={() => setIsModalVisible(!IsModalVisible)} />
                        <PrimaryBtn title='पुन-प्रिन्ट' onPress={print} />
                      </>
                      :
                      <AppButton title='पुन-प्रिन्ट' onPress={print}></AppButton>
                  }
                </>
                :
                <Text style={{
                  color: '#e78a8a',
                  fontSize: 24,
                  fontWeight: 'bold'
                }}>रसिद रद्द गरिएको छ।</Text>

            }
          </>
        }



      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={IsModalVisible}
        onRequestClose={() => {
          setIsModalVisible(!IsModalVisible);
        }}
      >
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
              onFocus={() => handleError(null, 'Remarks')}
            ></TextInput>
            {
              errors.Remarks &&
              <Text style={{
                fontSize: 12,
                color: 'red'
              }}>{errors.Remarks}</Text>
            }
            <View style={[styles.BtnContainerStyle]}>
              <SecondaryBtn title='होइन' onPress={() => {
                setIsModalVisible(!IsModalVisible)
                setREmarks('')
              }} />
              <PrimaryBtn title='हो' onPress={() => handleCancel()} />
            </View>


          </View>
        </View>
      </Modal>

    </View>
  )
}

export default ReceiptInfo

const styles = StyleSheet.create({
  PrintScreenContainer: {
    width: windowWidth - 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
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
    width: "100%",
    flexDirection: 'row',
    justifyContent: 'space-between'
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
    alignItems: 'center'
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
    color: "#5c5656",
    borderRadius: 4,
    marginVertical: 8,

  },

  BtnContainerStyle: {
    // width: windowWidth - 16,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
    // alignItems: 'stretch'
  }
})