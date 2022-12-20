import {
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import SearchButton from './SearchButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;

const Filter = ({
  data,
  returnData,
  DailyRouteVehicleFilter,
  forVehicleList,
  forRouteList,
  datePicker,
  retDate,
  forSearch,
  forReservation,
  vehicleList
}) => {
  const [SearchKeyWord, setSearchKeyWord] = useState('');
  const navigation = useNavigation();
  const [selectedRange, setRange] = useState({});

  const handlSearch = val => {
    const pushArr = [];
    if (data !== undefined && data !== '') {
      {
        DailyRouteVehicleFilter &&
          data.map(e => {
            if (
              e.DId.toString().includes(val) ||
              e.VehicleNumber.toString().includes(val)
            ) {
              pushArr.push(e);
            }
          });
      }

      {
        forVehicleList &&
          data.map(e => {
            e.VehicleNumber.toString().includes(val) && pushArr.push(e);
          });
      }
      {
        forRouteList &&
          data.map(e => {
            e.RouteName.toString().includes(val) && pushArr.push(e);
          });
      }
    }
    returnData(pushArr);
  };

  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  // const [toshow, setToShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChangeData = (event, selectedValue) => {
    setShow(false);
    if (mode == 'date') {
      const currentDate = selectedValue || date;
      setDate(currentDate);
      retDate(currentDate);
    } else {
    }
  };
  const showDatepicker = () => {
    // setToShow(true);
    setShow(true);
  };
  const handleNavigation = () => {
    navigation.navigate('AddEditReservationScreen');
  };

  return (
    <View style={[styles.filterContainer, { justifyContent: vehicleList ? 'space-around' : 'space-between' }]}>
      {datePicker && (
        <TouchableOpacity onPress={() => showDatepicker()}>
          <Icon
            name={'calendar'}
            color={'#fefefe'}
            type={'antdesign'}
            style={styles.icon}
            size={28}></Icon>
        </TouchableOpacity>
      )}
      {forSearch && (
        <>
          <TextInput
            value={SearchKeyWord}
            placeholder="खोज्नुहोस्"
            placeholderTextColor="black"
            onChangeText={e => setSearchKeyWord(e)}
            style={styles.inputContainerStylse}></TextInput>
          <SearchButton
            title={'खोज्नुहोस्'}
            onPress={() => handlSearch(SearchKeyWord)}
            width={windowWidth * 0.32}></SearchButton>
        </>
      )}
      {forReservation && (
        <>
          <TouchableOpacity onPress={() => showDatepicker()}>
            <Icon
              name={'calendar'}
              color={'#fefefe'}
              type={'antdesign'}
              style={styles.icon}
              size={28}></Icon>
          </TouchableOpacity>
          <SearchButton
            title={'थप्नुहोस्'}
            onPress={() => handleNavigation()}
            width={windowWidth * 0.3}></SearchButton>
        </>
      )}

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
  );
};

export default Filter;

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    width: windowWidth - 20,
    justifyContent: 'space-between',
    marginVertical: 8,
  },
  inputContainerStylse: {
    borderWidth: 1,
    borderColor: '#dad8d8',
    paddingHorizontal: 3,
    borderRadius: 4,
    backgroundColor: '#dad8d8',
    width: windowWidth * 0.5,
    fontSize: 14,
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  icon: {
    // width: windowWidth * 0.1,
    // borderWidth: 1,
    // height: 20,
    padding: 8,
    borderRadius: 4,
    backgroundColor: '#184581',
  },

});
