import { View, Text, StyleSheet, Dimensions, Pressable, Button, TouchableOpacity } from 'react-native';
import React from 'react';
import { GlobalStyles } from '../../../GlobalStyle';
import DateTimeBadge from './DateTimeBadge';
import { useNavigation } from '@react-navigation/native';
import { style } from 'deprecated-react-native-prop-types/DeprecatedImagePropType';
import { storeprintOnceData } from '../../Services/store/slices/printOnce';
import { useDispatch, useSelector } from 'react-redux';

// const daa = {
//   Charge: 360,
//   RId: 18,
//   ReservationDate: '2022-07-29T16:23:49',
//   ReserveNepalidate: '2079-4-13',
//   ReserverLocation: 'Kama',
//   UserId: 2,
//   UserName: 'anib',
//   VehicleNumber: 'ग १ ख ८५३६',
//   vehicleId: 271,
// };
const windowWidth = Dimensions.get('window').width;



const ReservationCard = ({ data }) => {
  const dispatch = useDispatch();
  data.isReservation = true;
  const navigation = useNavigation();

  const user = useSelector(state => state.storeUserData.userData);
  const printOnce = () => {
    dispatch(storeprintOnceData(true));
    navigation.navigate('ReceiptInfoScreen', {
      data: data,
      ReservationPrint: true
    });
  }

  return (
    <>
      <View

        style={[styles.cardCotnainer, GlobalStyles.boxShadow]}>
        <View style={styles.leftcontainer}>
          <Text style={[GlobalStyles.heading, { color: 'red' }]}>
            सवारी नं: {data.VehicleNumber}
          </Text>
          <Text
            style={[
              GlobalStyles.body,
              {
                color: secondary,
              },
            ]}>{`रसिद नं: ${data.RId}`}</Text>
          <Text style={[GlobalStyles.body, { color: '#525866' }]}>
            रुट: {data.ReserverLocation}
          </Text>
        </View>

        {user.RoleId === 1 || user.RoleId === 2 ? (
          <View style={{ flexDirection: 'column', marginRight: 50 }}>

            <TouchableOpacity style={styles.btn} onPress={printOnce}>
              <Text style={styles.btnText}>प्रिन्ट</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, { backgroundColor: '#5783db' }]} onPress={() => {
              navigation.navigate('EditReservation', {
                data: data,
              });


            }}>
              <Text style={[styles.btnText,]}>
                सम्पादन </Text>
            </TouchableOpacity>

          </View>
        ) : (
          <View style={{ flexDirection: 'column', marginRight: 50, justifyContent: 'center', alignContent: 'center' }}>

            <TouchableOpacity style={[styles.btn, { paddingVertical: 12 }]} onPress={printOnce}>
              <Text style={styles.btnText}>प्रिन्ट</Text>
            </TouchableOpacity>



          </View>
        )
        }

        <DateTimeBadge
          data={data.ReservationDate}
          nepaliDate={data.ReserveNepalidate}
          ReserveDays={data.ReserveDays}
          isActive={true}
        />
      </View>
    </>
  );
};

export default ReservationCard;

const styles = StyleSheet.create({
  cardCotnainer: {
    backgroundColor: 'red',
    width: windowWidth - 9,
    borderRadius: 4,
    marginBottom: 8,
    backgroundColor: '#fefefe',
    paddingHorizontal: 44,
    paddingVertical: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  cardTitle: {
    color: 'red',
  },
  leftcontainer: {
    width: windowWidth * 0.72,
  },
  btn: {
    backgroundColor: '#a881af',
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 2,
    marginRight: 30,
    borderRadius: 5


  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
