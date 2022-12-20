import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {GlobalStyles} from '../../../GlobalStyle';
import {useDispatch} from 'react-redux';
import {GetVehicleRouteDetailsByyReceiptId} from '../../Services/appServices/VehicleManagementService';
import DateTimeBadge from './DateTimeBadge';
import {useNavigation} from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const DailyRouteCard = ({data}) => {
  const dispatch = useDispatch();
  const [VehicleNumber, setVehicleNumber] = useState();
  const navigation = useNavigation();

  useEffect(() => {
    dispatch(
      GetVehicleRouteDetailsByyReceiptId(data.DId, res => {
        if (res?.VechileRouteByReceiptId.length > 0) {
          setVehicleNumber(res?.VechileRouteByReceiptId[0]);
        }
      }),
    );
  }, []);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('ReceiptInfoScreen', {
          id: data.DId,
          isActive: data.IsActive,
          VId: data.VehicleId,
        });
      }}
      style={[styles.cardCotnainer, GlobalStyles.boxShadow]}>
      <View style={styles.leftcontainer}>
        <Text style={[GlobalStyles.heading, {color: 'red'}]}>
          सवारी नं: {data.VehicleNumber}
        </Text>
        <Text
          style={[
            GlobalStyles.body,
            {
              color: secondary,
            },
          ]}>{`रसिद नं: ${data.DId}`}</Text>
        <Text style={[GlobalStyles.body, {color: '#525866'}]}>
          रुट: {VehicleNumber !== undefined ? VehicleNumber.Route : ''}
        </Text>
      </View>

      <DateTimeBadge
        data={data.RouteDate}
        nepaliDate={VehicleNumber !== undefined ? VehicleNumber.NepaliDate : ''}
        isActive={data.IsActive}
      />
    </Pressable>
  );
};

export default DailyRouteCard;

const styles = StyleSheet.create({
  cardCotnainer: {
    backgroundColor: 'red',
    width: windowWidth - 16,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#fefefe',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardTitle: {
    color: 'red',
  },
  leftcontainer: {
    width: windowWidth * 0.65,
  },
});
