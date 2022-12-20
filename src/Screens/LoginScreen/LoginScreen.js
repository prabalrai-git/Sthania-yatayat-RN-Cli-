import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { Icon, Input } from 'react-native-elements';
import { GlobalStyles } from '../../../GlobalStyle';
import { Dimensions } from 'react-native';
import { useDispatch } from 'react-redux';
import { storeUserData } from '../../Services/store/slices/profileSlice';
import LoadingContainer from '../../Components/UI/LoadingContainer';
import { GetCounterDetail } from '../../Services/appServices/VehicleManagementService';
import { LoginBtn } from '../../Components/UI/cButtons';
import { getLoginApi } from '../../Services/appServices/loginService';

const windowWidth = Dimensions.get('window').width;
const windowheight = Dimensions.get('window').height;

const LoginScreen = () => {
  const [errors, setErrors] = useState({});
  const [UserName, setUserName] = useState('');
  const [Password, setPassword] = useState('');
  const dispatch = useDispatch();
  const [IsLoading, setIsLoading] = useState(false);
  const [IsDisabled, setIsDisabled] = useState(false);
  const [ShowPassword, setShowPassword] = useState(true);
  const [CounterName, setCounterName] = useState('');
  const [CounterId, setCounterId] = useState();
  const [CompanyId, setCompanyId] = useState();
  const [IsVisible, setIsVisible] = useState(false);
  const [CounteList, setCounteList] = useState();

  const validate = () => {
    Keyboard.dismiss();
    let isOpValid = true;
    if (UserName === '' || UserName === undefined) {
      handleError('please enter Username', 'UserName');
      isOpValid = false;
    }
    if (Password === '' || Password === undefined) {
      handleError('please enter Password', 'Password');
      isOpValid = false;
    }
    if (CounterName === '' || CounterName === undefined) {
      handleError('please enter Counter Name', 'CounterName');
      isOpValid = false;
    }
    return isOpValid;
  };

  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };

  const handleProceed = () => {
    let isValidated = validate();
    setIsDisabled(true);
    setIsLoading(true);

    // return
    let data = {
      username: UserName,
      password: Password,
    };
    if (isValidated) {
      dispatch(
        getLoginApi(data, (res, status) => {
          if (status === 200) {
            let uData = {
              Role: res?.UserDetails[0].Role,
              RoleId: res?.UserDetails[0].RoleId,
              UId: res?.UserDetails[0].UId,
              UserContactNumber: res?.UserDetails[0].UserContactNumber,
              UserFullName: res?.UserDetails[0].UserFullName,
              UserName: res?.UserDetails[0].UserName,
              counterId: CounterId !== undefined ? CounterId : '',
              companyId: CompanyId !== undefined ? CompanyId : '',
            };
            dispatch(storeUserData(uData));
          } else {
            Alert.alert('त्रुटि!', 'प्रयोगकर्ता नाम र पासवर्ड मिलेन।', [
              {
                text: 'ठिक छ',
                onPress: () => {
                  setIsDisabled(false);
                  setIsLoading(false);
                },
              },
            ]);
          }
        }),
      );
    } else {
      Alert.alert('सतर्कता !', 'कृपया आवश्यक डाटा भर्नुहोस्।', [
        {
          text: 'ठिक छ',
          onPress: () => {
            setIsDisabled(false);
            setIsLoading(false);
          },
        },
      ]);
    }
    setIsDisabled(false);
    setIsLoading(false);
  };

  const handleSelect = (cId, counterName, CompId) => {
    setCounterName(counterName);
    setCounterId(cId);
    setIsVisible(!IsVisible);
    setCompanyId(CompId);
    // setIsInputDisable(!IsInputDisable)

  };

  useEffect(() => {
    let isApiSubscribed = true;
    dispatch(
      GetCounterDetail(res => {
        if (res?.CounterDetails.length > 0) {
          let temp = res?.CounterDetails.filter(e => e.IsActive === true);
          if (isApiSubscribed) {
            setCounteList(temp);
          }
        }
      }),
    );
    return () => {
      isApiSubscribed = false;
    };
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform === 'ios' ? 'padding' : 'height'}
      style={styles.logincontainer}>
      <View
        style={{
          alignItems: 'center',
        }}>
        <Image
          source={require('../../Assets/images/logo2.png')}
          style={styles.logo}></Image>
      </View>
      <View style={styles.dummyInputContainer}>
        <Text style={styles.dummyTitle}>Counter:</Text>
        <Pressable
          onPress={() => {
            setIsVisible(!IsVisible);
            handleError(null, 'CounterName');
          }}
          style={styles.dummyInput}>
          <Icon
            name={'shopping-store'}
            color={'#dad8d8'}
            type={'fontisto'}
            style={styles.icon}
            size={20}></Icon>
          <Text style={[styles.dummyInputTxt, { color: 'black' }]}>{CounterName}</Text>
        </Pressable>
        <Text
          style={{
            fontSize: 12,
            color: 'red',
          }}>
          {' '}
          {errors.CounterName ? errors.CounterName : ''}
        </Text>
      </View>
      <Input
        value={UserName}
        placeholder="User Name"
        onChangeText={e => setUserName(e)}
        onFocus={() => handleError(null, 'UserName')}
        label="User Name"
        errorMessage={errors.UserName}
        inputStyle={{
          fontSize: 14,
          color: '#5c5656',
        }}
        leftIcon={
          <Icon
            name={'user'}
            color={'#dad8d8'}
            type={'antdesign'}
            style={styles.icon}
            size={20}></Icon>
        }
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: '#dad8d8',
          paddingHorizontal: 3,
          borderRadius: 4,
          backgroundColor: '#faf4f4',
          marginTop: 4,
        }}
      />

      <Input
        value={Password}
        placeholder="Password"
        onChangeText={e => setPassword(e)}
        onFocus={() => handleError(null, 'Password')}
        label="Password"
        errorMessage={errors.Password}
        secureTextEntry={ShowPassword}
        leftIcon={
          <Icon
            name={'key'}
            color={'#dad8d8'}
            type={'antdesign'}
            style={styles.icon}
            size={20}></Icon>
        }
        rightIcon={
          <Pressable
            onPressIn={() => {
              setShowPassword(!ShowPassword);
            }}
            onPressOut={() => {
              setShowPassword(!ShowPassword);
            }}>
            <Icon
              name={'eyeo'}
              color={'#dad8d8'}
              type={'antdesign'}
              size={20}></Icon>
          </Pressable>
        }
        inputStyle={{
          fontSize: 14,
          color: '#5c5656',
        }}
        inputContainerStyle={{
          borderWidth: 1,
          borderColor: '#dad8d8',
          paddingHorizontal: 3,
          borderRadius: 4,
          backgroundColor: '#faf4f4',
          marginTop: 4,
        }}
      />

      <LoginBtn
        title={'लग - इन'}
        onPress={() => handleProceed()}
        disabled={IsDisabled}></LoginBtn>

      <Modal
        animationType="slide"
        transparent={true}
        visible={IsVisible}
        onRequestClose={() => {
          setIsVisible(!IsVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <ScrollView>
              {CounteList !== undefined &&
                CounteList.map(e => (
                  <Pressable
                    style={styles.selectCard}
                    onPress={() => {
                      handleSelect(e.CId, e.CounterName, e.CompanyId)
                    }
                    }
                    key={e.CId}>
                    <Text style={{ color: 'black' }}>{e.CounterName}</Text>
                  </Pressable>
                ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={IsLoading}>
        <View style={GlobalStyles.mainContainer}>
          <LoadingContainer />
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  logincontainer: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
  },
  icon: {
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
    borderColor: '#dad8d8',
  },
  dummyInputContainer: {
    width: windowWidth - 16,
    marginLeft: 8,
    marginBottom: 10,
  },
  dummyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#878991',
  },
  dummyInput: {
    backgroundColor: '#faf4f4',
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#dad8d8',
  },
  dummyInputTxt: {
    fontSize: 14,
    color: '#8d868s',
    marginLeft: 4,
  },
  centeredView: {
    backgroundColor: '#fefefe',
    bottom: 0,
    position: 'absolute',
    left: 0,
    right: 0,
    flex: 1,
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
    width: windowWidth - 16,
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 16,
    marginTop: 4,
    borderRadius: 4,
    borderColor: '#c7c2c2',
  },
});
