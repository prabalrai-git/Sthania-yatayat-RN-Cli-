import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GlobalStyles} from '../../../GlobalStyle';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import Filter from '../../Components/UI/Filter';
import DailyRouteCard from '../../Components/UI/DailyRouteCard';
import {GetReservationDetailsByDatee} from '../../Services/appServices/VehicleManagementService';
import ReservationCard from '../../Components/UI/ReservationCard';

const ReservationScreen = () => {
  const dispatch = useDispatch();
  const [TodayRouteList, setTodayRouteList] = useState();
  const [ReservedVehicle, setReservedVehicle] = useState();
  const IsSearchFocused = useIsFocused();

  // console.log("reserved vehicle",ReservedVehicle)

  const handleChange = () => [];

  const handleDateChange = () => {};
  const renderItem = ({item}) => <ReservationCard data={item} />;

  // today date

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  // console.log(today);

  useEffect(() => {
    const date = {
      fromdate: '2022-7-29',
      todate: today,
    };
    dispatch(
      GetReservationDetailsByDatee(date, res => {
        // console.log("res", res?.GetReservationDetails)
        setReservedVehicle(res?.GetReservationDetails);
      }),
    );
  }, [today]);

  return (
    <View style={GlobalStyles.mainContainer}>
      <Filter
        data={TodayRouteList !== undefined ? TodayRouteList : ''}
        returnData={handleChange}
        retDate={handleDateChange}
        forReservation
      />

      <SafeAreaView
        style={{
          flex: 1,
        }}>
        {ReservedVehicle !== [] ? (
          <FlatList
            data={ReservedVehicle}
            keyExtractor={item => item.RId}
            renderItem={renderItem}></FlatList>
        ) : (
          <>
            <LoadingContainer></LoadingContainer>
          </>
        )}
      </SafeAreaView>
    </View>
  );
};

export default ReservationScreen;

const styles = StyleSheet.create({});
