import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { GlobalStyles } from '../../../GlobalStyle'
import * as Print from 'expo-print';
import QRCode from 'react-native-qrcode-svg';
import AppButton from '../../Components/UI/AppButton';
import { GetCompanyDetail, GetStaffDetailsByVehicleIdd, GetVehicleRouteDetailsByyReceiptId } from '../../Services/appServices/VehicleManagementService';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

// "params": Object {
//   "CId": 9,
//   "state": Object {
//     "CompanyId": 1,
//     "CounterId": 1,
//     "DId": 0,
//     "EntryDate": "2022-6-15T13:15:58",
//     "IsActive": true,
//     "NepaliDate": "dummy date",
//     "ReceiptAmt": 300,
//     "Remarks": "dummy purpose only",
//     "RouteDate": "2022-6-15T13:15:58",
//     "RouteId": 1,
//     "UserId": 7,
//     "VehicleId": 1,
//   },

const windowWidth = Dimensions.get('window').width;

const PrintScreen = ({ route }) => {
  const { id } = route.params;
  const dispatch = useDispatch();
  const [CompanyDetail, setCompanyDetail] = useState();
  const [StaffContact, setStaffContact] = useState();
  const [ReceiptDetails, setReceiptDetails] = useState();
  const [Qr, setQr] = useState();
  const navigation = useNavigation();
  const user = useSelector(state => state.storeUserData.userData);


  const ToSendData = {
    CompanyName: CompanyDetail !== undefined ? CompanyDetail.CompanyName : '',
    CompanyAddress: CompanyDetail !== undefined ? CompanyDetail.CompanyAddress : '',
    VehicleNumber: ReceiptDetails !== undefined ? ReceiptDetails.VehicleNumber : '',
    Driver: ReceiptDetails !== undefined ? ReceiptDetails.Driver : '',
    OwnerName: ReceiptDetails !== undefined ? ReceiptDetails.OwnerName : '',
    EntryDate: ReceiptDetails !== undefined ? ReceiptDetails.RouteDate.split("T") : '',
    EntryNepaliDate:  ReceiptDetails !== undefined ? ReceiptDetails.NepaliDate: '',
    StaffContact: StaffContact !== undefined ? StaffContact.toString() : '',
    Amount: ReceiptDetails !== undefined ? ReceiptDetails.ReceiptAmt : '',
    remarks: ReceiptDetails !== undefined ? ReceiptDetails.Remarks : '',
    route: ReceiptDetails !== undefined ? ReceiptDetails.Route : ''
  }

  useEffect(() => {
    dispatch(GetCompanyDetail((res) => {
      if (res?.GetCompanyDetails.length > 0) {
        setCompanyDetail(res?.GetCompanyDetails[0])
      }
    }))
    dispatch(GetVehicleRouteDetailsByyReceiptId(id, (res) => {
      if (res?.VechileRouteByReceiptId.length > 0) {
        setReceiptDetails(res?.VechileRouteByReceiptId[0])
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
  const htmlData = `${id}`



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
      <View style={{ paddingTop: 10 }}>
        <AppButton title='प्रिन्ट' onPress={print}></AppButton>
      </View>

    </View>
  )
}

export default PrintScreen

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
  }
})