import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { GlobalStyles } from '../../../GlobalStyle';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Filter from '../../Components/UI/Filter';
// import DailyRouteCard from '../../Components/UI/DailyRouteCard';
import { GetReservationDetailsByDatee } from '../../Services/appServices/VehicleManagementService';
import ReservationCard from '../../Components/UI/ReservationCard';
import { Alert } from 'react-native';

const ReservationScreen = () => {
  const dispatch = useDispatch();
  const [TodayRouteList, setTodayRouteList] = useState();
  const [ReservedVehicle, setReservedVehicle] = useState();
  // const IsSearchFocused = useIsFocused();

  // today date

  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = yyyy + '-' + mm + '-' + dd;
  // console.log(today);

  useFocusEffect(
    React.useCallback(() => {
      // const unsubscribe = API.subscribe(userId, user => setUser(data));
      // return () => unsubscribe();
      const date = {
        fromdate: today,
        todate: today,
      };
      dispatch(
        GetReservationDetailsByDatee(date, res => {
          // console.log("res", res?.GetReservationDetails)
          setReservedVehicle(res?.GetReservationDetails);
        }),
      );
    }, []),
  );

  // console.log("reserved vehicle",ReservedVehicle)

  const handleChange = () => [];

  const handleDateChange = e => {
    let temp = JSON.stringify(e).split('T');
    let newDate = temp[0].replace('"', '');
    // console.log(temp, 'temp', newDate, 'newDate');
    let sDate = {
      fromdate: newDate,
      todate: newDate,

    }
    dispatch(
      GetReservationDetailsByDatee(sDate, res => {
        // console.log("res?.DatewiseRouteDetails", res?.DatewiseRouteDetails);
        // console.log(res, 'rerererer');
        if (res?.GetReservationDetails !== undefined) {
          setTodayRouteList(res?.DatewiseRouteDetails);
          setReservedVehicle(res?.GetReservationDetails);
        }

        else {
          setTodayRouteList([]);
          setReservedVehicle([]);
          Alert.alert(
            "अलर्ट",
            "यस दिनको लागि कुनै रिजर्व डेटा छैन ",
            [

              { text: "ठिक छ" }
            ]
          );
        }
      }),
    );
  };



  const renderItem = ({ item }) => <ReservationCard data={item} />;

  useEffect(() => {
    const date = {
      fromdate: today,
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

// const styles = StyleSheet.create({});
