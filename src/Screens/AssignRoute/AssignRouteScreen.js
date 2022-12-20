import {
  Alert,
  Keyboard,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { GlobalStyles } from '../../../GlobalStyle';
import { Dimensions } from 'react-native';
import AppButton from '../../Components/UI/AppButton';
import { Input } from 'react-native-elements/dist/input/Input';
import Filter from '../../Components/UI/Filter';
import {
  GetCompanyDetail,
  InsertUpdateDayWiseVehicleRoutes,
} from '../../Services/appServices/VehicleManagementService';
import NepaliDate from 'nepali-date-converter';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { storeprintOnceData } from '../../Services/store/slices/printOnce';
import Chips from '../../Components/UI/Chips';

const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

const AssignRouteScreen = () => {
  //AutoPrint

  const vehicle = useSelector(state => state.storeVehicleData);

  const [VehicleId, setVehicleId] = useState();
  const [VehicleNumberPlate, setVehicleNumberPlate] = useState('');
  const [RouteId, setRouteId] = useState();
  const [RouteName, setRouteName] = useState('');
  const [NDate, setNDate] = useState('');
  const [NepDate, setNepDate] = useState('');
  const [ReceiptAmount, setReceiptAmount] = useState(null);
  const [errors, setErrors] = useState({});
  const [IsVisible, setIsVisible] = useState(false);
  const [IsRouteVisible, setIsRouteVisible] = useState(false);
  // const [VehicleList, setVehicleList] = useState();
  const [NewVehicleList, setNewVehicleList] = useState(vehicle.vehicleData);
  // const [RouteList, setRouteList] = useState();
  const [NewRouteList, setNewRouteList] = useState(vehicle.vehicleRoute);
  const [Remarks, setRemarks] = useState('');
  const dispatch = useDispatch();
  const [IsInputDisable, setIsInputDisable] = useState(false);
  const isAsignedFocus = useIsFocused();
  const navigation = useNavigation();
  const user = useSelector(state => state.storeUserData.userData);
  const [CID, setCID] = useState();





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
    if (RouteName === '' || RouteName === undefined) {
      handleError('कृपया रुट प्रविष्ट गर्नुहोस्', 'RouteName');
      isOpValid = false;
    }

    return isOpValid;
  };

  const handleProceed = () => {

    dispatch(storeprintOnceData(true));

    let isValidated = validate();
    let data = {
      DId: 0,
      VehicleId: VehicleId,
      RouteId: RouteId,
      EntryDate: NDate,
      RouteDate: NDate,
      CounterId: user.counterId,
      UserId: user.UId,
      IsActive: true,
      Remarks: Remarks !== '' ? Remarks : 'n/a',
      CompanyId: CID,
      ReceiptAmt: parseInt(ReceiptAmount),
      NepaliDate: NepDate,
    };

    if (isValidated) {
      dispatch(
        InsertUpdateDayWiseVehicleRoutes(data, res => {
          // "CreatedId": 5,
          // "Message": "Route Assigned for Vehicle",
          // "SuccessMsg": true,
          if (res?.SuccessMsg === true) {
            navigation.navigate('ReceiptInfoScreen', {
              id: res?.CreatedId,
              VId: VehicleId,
            });
          } else {
            Alert.alert(
              'सतर्कता !',
              'सवारी साधनका लागि रुट पहिले नै तोकिएको छ।',
              [
                {
                  text: 'ठिक छ',
                  onPress: () => {
                    setVehicleId();
                    setVehicleNumberPlate('');
                    setRouteId();
                    setRouteName('');
                  },
                },
              ],
            );
          }
        }),
      );
    } else {
      Alert.alert('सतर्कता !', 'कृपया आवश्यक डाटा भर्नुहोस्।', [
        { text: 'ठिक छ' },
      ]);
    }
  };
  // NepaliDate

  useEffect(() => {
    let today = new Date();
    const newDate =
      today.getFullYear() +
      '-' +
      (today.getMonth() + 1) +
      '-' +
      today.getDate();
    const newTime = today.toLocaleTimeString();
    const fialEntryDate = newDate + 'T' + newTime;
    setNDate(fialEntryDate);

    let daa = new NepaliDate(today).getBS();
    const newNepaliDate = daa.year + '-' + (daa.month + 1) + '-' + daa.date;

    setNDate(fialEntryDate);
    setNepDate(newNepaliDate);
  }, [isAsignedFocus]);

  // autoprint

  useEffect(() => {
    setVehicleId();
    setVehicleNumberPlate('');
    setRouteId();
    setRouteName('');
  }, [isAsignedFocus]);

  useEffect(() => {
    // dispatch(GetActiveVehicleList(user.companyId, (res) => {
    //   if (res?.ActiveVehicleList !== []) {
    //     setVehicleList(res?.ActiveVehicleList);
    //     setNewVehicleList(res?.ActiveVehicleList)
    //   }
    // }))
    // dispatch(GetActiveVehicleRoute((res) => {
    //   if (res?.RouteDetails != []) {
    //     setRouteList(res?.RouteDetails);
    //     setNewRouteList(res?.RouteDetails);
    //   }
    // }))

    dispatch(
      GetCompanyDetail(res => {
        if (res?.GetCompanyDetails.length > 0) {
          setCID(res?.GetCompanyDetails[0].CId);
        }
      }),
    );
  }, []);

  const handleChangeRoute = val => {
    if (val === undefined || val === '') {
      setNewRouteList(vehicle.vehicleRoute);
    } else {
      setNewRouteList(val);
    }
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

  const handleSelectRoute = (RId, RouteName, Charge) => {
    setRouteId(RId);
    setRouteName(RouteName);
    setIsRouteVisible(!IsRouteVisible);
    setIsInputDisable(!IsInputDisable);
  };

  const onChipClick = e => {

    setReceiptAmount(e._dispatchInstances.memoizedProps.children[1].toString());
  };

  return (
    <ScrollView>

      <View style={GlobalStyles.mainContainer}>
        <View style={styles.container}>
          <View style={styles.dummyInputContainer}>
            <Text style={[styles.dummyTitle]}>सवारी नं:</Text>
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
            <Text style={styles.dummyTitle}>रुट:</Text>
            {/* <BottomSheet hasDraggableIcon ref={bottomSheet} height={300} >
              <Filter data={data} returnData={handleChange} selectTestFilter />
            </BottomSheet> */}
            <Pressable
              onPress={() => {
                setIsRouteVisible(!IsRouteVisible);
                setIsInputDisable(!IsInputDisable);
                handleError(null, 'RouteName');
              }}
              disabled={IsInputDisable}>
              <Text style={styles.dummyInput}>{RouteName}</Text>
            </Pressable>
            {errors.RouteName && (
              <Text
                style={{
                  fontSize: 12,
                  color: 'red',
                }}>
                {errors.RouteName}
              </Text>
            )}
          </View>
          <Input

            value={Remarks}
            placeholder="टिप्पणीहरू"
            placeholderTextColor={'grey'}
            labelStyle={{ color: 'black' }}
            onChangeText={e => setRemarks(e)}
            label="टिप्पणीहरू:"
            inputStyle={{
              fontSize: 14,
              color: 'black',
            }}
            inputContainerStyle={{
              borderWidth: 1,
              borderColor: '#dad8d8',
              paddingHorizontal: 3,
              borderRadius: 4,
              backgroundColor: '#dad8d8',
              color: 'black',
              marginBottom: -12,
            }}
          />
          <View style={styles.dummyInputContainer}>
            <Text style={styles.dummyTitle}>रकम:</Text>
            {/* <Text style={styles.dummyInput}>{ReceiptAmount}</Text> */}
          </View>
          <Input
            onChangeText={e => setReceiptAmount(e)}
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
              // color: 'red';
              marginBottom: -12,
            }}
            keyboardType="numeric"
            value={ReceiptAmount}
          />
          <Chips onChipClick={onChipClick} />
          <View style={styles.dummyInputContainer}>
            <Text style={styles.dummyTitle}>मिति:</Text>
            <Text style={styles.dummyInput}>{NepDate}</Text>
          </View>
          <AppButton title="पेश" onPress={() => handleProceed()} />
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
                    vehicleList={true}
                  />
                  <ScrollView>
                    {NewVehicleList !== undefined &&
                      NewVehicleList.map(e => (
                        <Pressable
                          style={styles.selectCard}
                          onPress={() => handleSelect(e.VId, e.VehicleNumber)}
                          key={e.VId}>
                          <Text style={{ color: 'black' }}>{e.VehicleNumber}</Text>
                        </Pressable>
                      ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
            <Modal
              animationType="slide"
              transparent={true}
              visible={IsRouteVisible}
              onRequestClose={() => {
                setIsRouteVisible(!IsRouteVisible);
                setIsInputDisable(!IsInputDisable);
              }}>
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Filter
                    data={vehicle.vehicleRoute}
                    returnData={handleChangeRoute}
                    forRouteList
                    forSearch
                    vehicleList={true}

                  />
                  <ScrollView>
                    {NewRouteList !== undefined &&
                      NewRouteList.map(e => (
                        <Pressable
                          style={styles.selectCard}
                          onPress={() =>
                            handleSelectRoute(e.RId, e.RouteName, e.Charge)
                          }
                          key={e.RId}>
                          <Text style={{ color: 'black' }}>{e.RouteName}</Text>
                        </Pressable>
                      ))}
                  </ScrollView>
                </View>
              </View>
            </Modal>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default AssignRouteScreen;

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
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1d1a1a',
  },
  dummyInput: {
    backgroundColor: '#dad8d8',
    fontSize: 14,
    paddingHorizontal: 4,
    paddingVertical: 12,
    color: 'black',
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
    width: windowWidth - 50,
    borderWidth: 1,
    marginLeft: "auto",
    marginRight: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 16,
    marginBottom: 4,
    borderRadius: 4,
    borderColor: '#c7c2c2',
  },
});
