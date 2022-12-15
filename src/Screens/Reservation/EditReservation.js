import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  Keyboard,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { GlobalStyles } from '../../../GlobalStyle';
import Filter from '../../Components/UI/Filter';
import { useSelector } from 'react-redux';
import { Input } from 'react-native-elements/dist/input/Input';
import DateTimePicker from '@react-native-community/datetimepicker';
import NepaliDate from 'nepali-date-converter';
import AppButton from '../../Components/UI/AppButton';
import { InsertUpdateReserveDetail } from '../../Services/appServices/VehicleManagementService';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { PrimaryBtn, SecondaryBtn } from '../../Components/UI/cButtons';
import { TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native';
// import {executeReducerBuilderCallback} from '@reduxjs/toolkit/dist/mapBuilders';

const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

// {
//   "Charge": 58,
// "RId": 3,
// "ReservationDate": "2022-07-29T16:10:50",
// "ReserveNepalidate": "2079-4-13",
// "ReserverLocation": "Vbb",
// "UserId": 2,
// "UserName": "anib",
// "VehicleNumber": "ग १ ख ५५२७",
// "vehicleId": 268
// }

const EditReservation = ({ route }) => {
  // console.log('route', route.params.data);
  const Temp = route.params.data;
  const vehicle = useSelector(state => state.storeVehicleData);
  const user = useSelector(state => state.storeUserData.userData);
  const [VehicleId, setVehicleId] = useState(Temp.vehicleId);
  const [VehicleNumberPlate, setVehicleNumberPlate] = useState(
    Temp.VehicleNumber,
  );
  const [NewVehicleList, setNewVehicleList] = useState(vehicle.vehicleData);
  const [IsInputDisable, setIsInputDisable] = useState(false);
  const [IsVisible, setIsVisible] = useState(false);
  const [Price, setPrice] = useState(Temp.Charge);
  const [Loocation, setLoocation] = useState(Temp.ReserverLocation);
  const [NDate, setNDate] = useState(Temp.ReservationDate);
  const [NepDate, setNepDate] = useState(Temp.ReserveNepalidate);
  const [ReserveDays, setReserveDays] = useState(Temp.ReserveDays);
  const [reserveRemarks, setReserveRemarks] = useState(Temp.ReserveRemarks);
  const [IsModalVisible, setIsModalVisible] = useState(false);
  const [Remarks, setREmarks] = useState('');

  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const navigation = useNavigation();

  const onChangeData = (event, selectedValue) => {
    setShow(false);
    if (mode == 'date') {
      const currentDate = selectedValue || date;
      setDate(currentDate);
      const newDate =
        currentDate.getFullYear() +
        '-' +
        (currentDate.getMonth() + 1) +
        '-' +
        currentDate.getDate();
      // const newTime = currentDate.toLocaleTimeString();
      const fialEntryDate = newDate; /*+ 'T' + newTime;*/
      setNDate(fialEntryDate);

      let daa = new NepaliDate(currentDate).getBS();
      const newNepaliDate = daa.year + '-' + (daa.month + 1) + '-' + daa.date;
      setNepDate(newNepaliDate);
    } else {
    }
  };
  // const showDatepicker = () => {
  //   // setToShow(true);
  //   setShow(true);
  // };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isOpValid = true;
    // const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    if (VehicleNumberPlate === '' || VehicleNumberPlate === undefined) {
      handleError('कृपया गाडीको आईडी प्रविष्ट गर्नुहोस्', 'VehicleNumberPlate');
      isOpValid = false;
    }
    // if (RouteName === '' || RouteName === undefined) {
    //   handleError('कृपया रुट प्रविष्ट गर्नुहोस्', 'RouteName')
    //   isOpValid = false
    // }
    if (Loocation === '' || Loocation === undefined) {
      handleError('कृपया स्थान प्रविष्ट गर्नुहोस्', 'Loocation');
      isOpValid = false;
    }
    if (Price === '' || Price === undefined) {
      handleError('कृपया मूल्य प्रविष्ट गर्नुहोस्', 'Price');
      isOpValid = false;
    }
    if (NDate === '' || NDate === undefined) {
      handleError('कृपया मिति प्रविष्ट गर्नुहोस्', 'NDate');
      isOpValid = false;
    }
    if (ReserveDays === '' || ReserveDays === undefined) {
      handleError('कृपया आरक्षित दिनहरू प्रविष्ट गर्नुहोस्', 'ReserveDays');
      isOpValid = false;
    }
    if (reserveRemarks === '' || reserveRemarks === undefined) {
      handleError("कृपया टिप्पणी प्रविष्ट गर्नुहोस्", 'reserveRemarks')
      isOpValid = false;
    }
    if (Remarks === '' || Remarks === undefined) {
      handleError("कृपया टिप्पणी प्रविष्ट गर्नुहोस्", 'Remarks')
      isOpValid = false;
    }

    return isOpValid;
  };

  const handleChangeVehicle = val => {
    if (val === undefined || val === '') {
      setNewVehicleList(vehicle.vehicleData);
    } else {
      setNewVehicleList(val);
    }
  };

  const handleSelect = (vId, NumberPlate) => {
    setVehicleId(vId);
    setVehicleNumberPlate(NumberPlate);
    setIsVisible(!IsVisible);
    setIsInputDisable(!IsInputDisable);
  };

  const handleProceed = () => {
    // console.log("user", user)
    let isValidated = validate();
    const data = {
      RId: Temp.RId,
      VehicleId: VehicleId !== undefined ? VehicleId : 'n/a',
      ReserverLocation: Loocation !== undefined ? Loocation : 'n/a',
      ReservationDate: NDate !== undefined ? NDate : 'n/a',
      ReserveNepaliDate: NepDate !== undefined ? NepDate : 'n/a',
      Charge: Price !== undefined ? Price : 'n/a',
      UserId: user.UId,
      IsActive: true,
      ReserveDays: ReserveDays !== undefined ? ReserveDays : 'n/a',
      ReserveRemarks: reserveRemarks !== undefined || null ? reserveRemarks : 'n/a'

    };
    // console.log("data", data);
    if (isValidated) {
      dispatch(
        InsertUpdateReserveDetail(data, res => {
          // console.log('res', res)
          if (res.SuccessMsg === true) {
            Alert.alert('सफलता', 'सफलतापूर्वक सम्पादन गरियो', [

              {
                text: 'ठिक छ',
                onPress: () => {
                  navigation.pop(1);
                },
              },
            ]);
          }
        }),
      );
    }
  };
  const handleCancel = () => {
    // console.log("user", user)
    let isValidated = validate();
    const data = {
      RId: Temp.RId,
      VehicleId: VehicleId !== undefined ? VehicleId : 'n/a',
      ReserverLocation: Loocation !== undefined ? Loocation : 'n/a',
      ReservationDate: NDate !== undefined ? NDate : 'n/a',
      ReserveNepaliDate: NepDate !== undefined ? NepDate : 'n/a',
      Charge: Price !== undefined ? Price : 'n/a',
      UserId: user.UId,
      IsActive: 0,
      ReserveDays: ReserveDays !== undefined ? ReserveDays : 'n/a',
      ReserveRemarks: reserveRemarks !== undefined || null ? reserveRemarks : 'n/a'

    };
    // console.log("data", data);
    if (isValidated) {
      dispatch(
        InsertUpdateReserveDetail(data, res => {
          // console.log('res', res)
          if (res.SuccessMsg === true) {
            Alert.alert('सफलता', 'सफलतापूर्वक रद्द गरियो', [
              {
                text: 'ठिक छ',
                onPress: () => {
                  navigation.pop(1);
                },
              },
            ]);
          }
        }),
      );
    }
  };

  return (
    <ScrollView>
      <View style={GlobalStyles.mainContainer}>
        <View style={styles.container}>
          <Text style={styles.dummyTitle}>रेसेर्वेशन आइडी: {Temp.RId}</Text>
          <View style={styles.dummyInputContainer}>
            <Text style={styles.dummyTitle}>सवारी नं:</Text>
            <Pressable
              onPress={() => {
                setIsVisible(!IsVisible);
                setIsInputDisable(!IsInputDisable);
                handleError(null, 'VehicleNumberPlate');
              }}
              disabled={IsInputDisable}>
              <Text style={styles.dummyInput}>{VehicleNumberPlate}</Text>
            </Pressable>
            {errors.VehicleNumberPlate && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                }}>
                {errors.VehicleNumberPlate}
              </Text>
            )}
          </View>

          <View style={styles.dummyInputContainer}>
            <Text style={styles.dummyTitle}>मिति(A.D):</Text>
            <Pressable
              onPress={() => {
                setShow(!show);
                handleError(null, 'NDate');
              }}>
              <Text style={styles.dummyInput}>{`${NDate !== undefined ? NDate : 'date'
                }`}</Text>
            </Pressable>
            {errors.NDate && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                }}>
                {errors.NDate}
              </Text>
            )}
          </View>

          <View style={styles.dummyInputContainer}>
            <Text style={styles.dummyTitle}>मिति(B.S):</Text>
            <Text style={styles.dummyInput}>{`${NepDate !== undefined ? NepDate : 'date'
              }`}</Text>
          </View>

          <Input
            value={Loocation}
            placeholder="Location"
            placeholderTextColor={'black'}
            onChangeText={e => setLoocation(e)}
            label="स्थान"
            labelStyle={{ color: 'black' }}
            inputStyle={{
              fontSize: 14,
              color: '#5c5656',
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#dad8d8',
              paddingHorizontal: 3,
              borderRadius: 4,
              backgroundColor: '#dad8d8',
              marginBottom: -12,
            }}
            // keyboardType="numeric"
            onFocus={() => handleError(null, 'Loocation')}
          />
          {errors.Loocation && (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 10,
                marginTop: -10,
                color: 'red',
              }}>
              {errors.Loocation}
            </Text>
          )}

          <Input
            value={Price !== null && Price.toString()}
            placeholder="Price"
            placeholderTextColor={'black'}
            onChangeText={e => setPrice(e)}
            label="मूल्य"
            labelStyle={{ color: 'black' }}
            inputStyle={{
              fontSize: 14,
              color: '#5c5656',
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#dad8d8',
              paddingHorizontal: 3,
              borderRadius: 4,
              backgroundColor: '#dad8d8',
              marginBottom: -12,
            }}
            keyboardType="numeric"
            onFocus={() => handleError(null, 'Price')}
          />
          {errors.Price && (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 10,
                marginTop: -10,
                marginBottom: 10,
                color: 'red',
              }}>
              {errors.Price}
            </Text>
          )}
          <Input
            value={ReserveDays !== null && ReserveDays.toString()}
            placeholder="Reserve Days"
            placeholderTextColor={'black'}
            onChangeText={e => setReserveDays(e)}
            label="रिजर्व दिन"
            labelStyle={{ color: 'black' }}
            inputStyle={{
              fontSize: 14,
              color: '#5c5656',
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#dad8d8',
              paddingHorizontal: 3,
              borderRadius: 4,
              backgroundColor: '#dad8d8',
              marginBottom: -12,
            }}
            keyboardType="numeric"
            onFocus={() => handleError(null, 'ReserveDays')}
          />
          {errors.ReserveDays && (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 10,
                marginTop: -10,
                marginBottom: 10,
                color: 'red',
              }}>
              {errors.ReserveDays}
            </Text>
          )}
          <Input
            value={reserveRemarks}
            placeholder="टिप्पणीहरू"
            placeholderTextColor={'black'}
            onChangeText={e => setReserveRemarks(e)}
            label="टिप्पणीहरू"
            labelStyle={{ color: 'black' }}
            inputStyle={{
              fontSize: 14,
              color: '#5c5656',
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#dad8d8',
              paddingHorizontal: 3,
              borderRadius: 4,
              backgroundColor: '#dad8d8',
              marginBottom: -12,
            }}
            onFocus={() => handleError(null, 'टिप्पणीहरू')}
          />
          {errors.ReserveDays && (
            <Text
              style={{
                fontSize: 12,
                marginLeft: 10,
                marginTop: -10,
                marginBottom: 10,
                color: 'red',
              }}>
              {errors.ReserveDays}
            </Text>
          )}
          <AppButton title="पेश" onPress={() => handleProceed()} />
          <TouchableOpacity style={{ width: windowWidth * 0.88, backgroundColor: 'red', marginLeft: 'auto', marginRight: 'auto', marginTop: 15, padding: 10, borderRadius: 4 }} onPress={() => setIsModalVisible(!IsModalVisible)}
          >
            <Text style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}>रद्द गर्नुहोस्</Text>
          </TouchableOpacity>

          {/* start of modal for cancellation  */}
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
                  style={styles.inputStyleContainer}
                  value={Remarks}
                  onChangeText={e => setREmarks(e)}
                  multiline
                  numberOfLines={4}
                  placeholder={'टिप्पणीहरू'}
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

          {/* endo fo modal for cancellation */}

          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={IsVisible}
              onRequestClose={() => {
                setIsVisible(!IsVisible);
                setIsInputDisable(!IsInputDisable);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Filter
                    data={vehicle.vehicleData}
                    returnData={handleChangeVehicle}
                    forVehicleList
                    forSearch
                  />
                  <ScrollView>
                    {NewVehicleList !== undefined &&
                      NewVehicleList.map(e => (
                        <Pressable
                          style={styles.selectCard}
                          onPress={() => handleSelect(e.VId, e.VehicleNumber)}
                          key={e.VId}>
                          <Text>{e.VehicleNumber}</Text>
                        </Pressable>
                      ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>

          {
            show && (
              <DateTimePicker
                testID="dateTimePicker"
                // timeZoneOffsetInMinutes={0}
                value={date}
                mode={mode}
                is24Hour={true}
                display="default"
                onChange={onChangeData}
                maximumDate={new Date()}
              />
            )

            // <Text>Potato</Text>
          }
        </View>
      </View>
    </ScrollView>
  );
};

export default EditReservation;

const styles = StyleSheet.create({
  container: {
    width: windowWidth - 20,
    // backgroundColor: '#fefeef',
    // borderWidth: 1,
    paddingVertical: 16,
  },
  dummyInputContainer: {
    width: windowWidth - 40,
    marginLeft: 8,
    // borderWidth: 1,
    marginBottom: 10,
  },
  dummyTitle: {
    paddingBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d1a1a',
  },
  dummyInput: {
    backgroundColor: '#dad8d8',
    fontSize: 14,
    paddingHorizontal: 4,
    paddingVertical: 12,
    color: '#5c5656',
    borderRadius: 4,
  },
  centeredView: {
    backgroundColor: '#fefefe',
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    flex: 1,
    // height: 300,
    alignItems: 'center',
    borderTopEndRadius: 16,
    borderTopStartRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0,

    elevation: 24,
  },
  modalView: {
    width: windowWidth - 16,
    height: windowheight * 0.5,
  },
  selectCard: {
    width: windowWidth - 40,
    borderWidth: 1,
    marginLeft: 10,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginBottom: 4,
    borderRadius: 4,
    borderColor: '#c7c2c2',
  },
  NepaliDateInput: {
    backgroundColor: '#858585',
  },
  BtnContainerStyle: {
    // width: windowWidth - 16,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // alignItems: 'stretch'
  },
  inputStyleContainer: {
    backgroundColor: '#ece7e7',
    width: windowWidth - 32,
    fontSize: 14,
    paddingHorizontal: 4,
    paddingVertical: 4,
    color: '#5c5656',
    borderRadius: 4,
    marginVertical: 8,
  },
  modalView: {
    width: windowWidth - 16,
    // height: 300,
    backgroundColor: '#fefefe',
    paddingHorizontal: 8,
    borderRadius: 8,
    paddingVertical: 16,
  },
  centeredView: {
    flex: 1,
    width: windowWidth,
    backgroundColor: '#47333399',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
