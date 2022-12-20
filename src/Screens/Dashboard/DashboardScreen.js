import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import GreatingCard from '../../Components/UI/GreatingCard';
import DashboardButton from '../../Components/UI/DashboardButton';
import { Dimensions } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import DisplayCard from '../../Components/UI/DisplayCard';
import {
  GetActiveVehicleList,
  GetActiveVehicleRoute,
  GetRouteDetailsByDateWisee,
} from '../../Services/appServices/VehicleManagementService';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
  storeVehicleData,
  storeVehicleRoute,
} from '../../Services/store/slices/vehicleSlice';

const windowWidth = Dimensions.get('window').width;

const navdata = [
  {
    id: 1,
    title: 'रुट तोक्ने',
    route: 'AssignRouteScreen',
    icon: 'directions-bus',
    iconsFamily: 'MaterialIcons',
  },
  {
    id: 2,
    title: 'खोज',
    route: 'SearchScreen',
    icon: 'search',
    iconsFamily: 'MaterialIcons',
  },
  {
    id: 3,
    title: 'स्क्यान',
    route: 'ScanScreen',
    icon: 'qr-code-scanner',
    iconsFamily: 'MaterialIcons',
  },
  ,
  {
    id: 4,
    title: 'रिजर्व',
    route: 'ReservationScreen',
    icon: 'calendar-check',
    iconsFamily: 'font-awesome-5',
  },
];

const DashboardScreen = () => {
  const navigation = useNavigation();
  const [TodayAssignedList, setTodayAssignedList] = useState();
  const [TotalVehicle, setTotalVehicle] = useState();
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const data = useSelector(state => state);

  useEffect(() => {
    let date = new Date();
    const newDate =
      date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
    let isApiSubscribed = true;
    dispatch(
      GetRouteDetailsByDateWisee(newDate, res => {
        if (res?.DatewiseRouteDetails.length > 0) {
          if (isApiSubscribed) {
            setTodayAssignedList(res?.DatewiseRouteDetails.length);
          }
        }
      }),
    );
    // dispatch(GetActiveVehicleList(2, (res) => {
    //   if (res?.ActiveVehicleList.length > 0) {
    //     if (isApiSubscribed) {
    //       setTotalVehicle(res?.ActiveVehicleList.length);
    //     }
    //   }
    // }))
    getData();
    return () => {
      isApiSubscribed = false;
    };
  }, [isFocused]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    dispatch(
      GetActiveVehicleList(data.storeUserData.userData.companyId, res => {
        if (res?.ActiveVehicleList.length > 0) {
          setTotalVehicle(res?.ActiveVehicleList.length);
          dispatch(storeVehicleData(res?.ActiveVehicleList));
        }
      }),
    );
    dispatch(
      GetActiveVehicleRoute(data.storeUserData.userData.companyId, res => {
        if (res?.RouteDetails.length > 0) {
          dispatch(storeVehicleRoute(res?.RouteDetails));
        }
      }),
    );
  };
  return (
    <View style={styles.mainContainer}>
      <GreatingCard />
      <View style={styles.floatingContainer}>
        <DisplayCard
          assignetotal={TodayAssignedList !== undefined ? TodayAssignedList : 0}
          totlaVehicle={
            TotalVehicle !== undefined ? TotalVehicle : 0
          }></DisplayCard>
      </View>
      <View style={styles.mainDashboardCotnainer}>
        <View style={styles.dashboardCotnainer}>
          {navdata.map(e => (
            <DashboardButton
              title={e.title}
              onPress={() => navigation.navigate(e.route)}
              icon={e.icon}
              family={e.iconsFamily}
              key={e.id}></DashboardButton>
          ))}
        </View>
      </View>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  mainContainer: {
    width: windowWidth,
    flex: 1,
    backgroundColor: 'red',
    paddingTop: 8,
  },
  mainDashboardCotnainer: {
    flex: 1,
    backgroundColor: '#f9f9f9f9',
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  floatingContainer: {
    paddingTop: 8,
    paddingBottom: 16,
  },
  dashboardCotnainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 16,
    flexWrap: 'wrap',
  },
});
