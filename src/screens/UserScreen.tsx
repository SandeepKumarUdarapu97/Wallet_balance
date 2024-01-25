/* eslint-disable react-native/no-inline-styles */
import React, { useState, useMemo, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from '../components/Dropdown';
import moment from 'moment';
import { add } from '../redux/reducer/userReducer';
import { getHeight, getWidth } from '../util';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width, height } = Dimensions.get('window');
const UserScreen = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.user.data);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState();
  const [amountToBeAdded, setAmountToBeAdded] = useState('');

  useEffect(() => {
    if (userData) {
      setUsers(userData);
      if (!selectedUser) {
        setSelectedUser(userData[0]);
      } else {
        setSelectedUser(userData.find(user => user.id === selectedUser.id));
      }
    }
  }, [userData]);

  const updateAmount = () => {
    setAmountToBeAdded('');
    dispatch(
      add({
        balance: amountToBeAdded,
        id: selectedUser.id,
        type: 'credit',
        date: moment().format('DD/MM/yy hh:mm'),
      }),
    );
  };

  return (
    <View style={styles.main}>
      {users.length > 0 && (
        <Dropdown
          users={users}
          setSelectedUserF={item => {
            setSelectedUser(item);
          }}
        />
      )}
      {users.length > 0 && (
        <ScrollView
          contentContainerStyle={{ alignItems: 'flex-start' }}
          style={styles.detailsView}>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: getHeight(1),
              backgroundColor: 'white',
              padding: getHeight(0.5),
              alignSelf: 'center',
              borderRadius: getWidth(2),
              height: getHeight(6),
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TextInput
              placeholder="Enter the amount"
              style={styles.textInput}
              value={amountToBeAdded}
              onChangeText={(amount: number) => setAmountToBeAdded(amount)}
              onSubmitEditing={()=> amountToBeAdded > 0 && updateAmount()}
              keyboardType="numeric"
            />
            <TouchableOpacity
              disabled={amountToBeAdded === 0}
              onPress={() => updateAmount()}
              style={[
                styles.button,
                { opacity: amountToBeAdded === 0 ? 0.5 : 1 },
              ]}>
              <Text style={{ fontWeight: 'bold', color: '#D32F2F' }}>Add</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              width: getWidth(92),
              backgroundColor: 'white',
              padding: getHeight(0.2),
              borderTopLeftRadius: getWidth(2),
              borderTopRightRadius: getWidth(2),
              alignItems: 'center',
              justifyContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: getWidth(6),
                fontWeight: 'bold',
                color: '#D32F2F',
                marginBottom: getHeight(-0.5),
              }}>
              Balance
            </Text>
            <Text
              style={{
                fontSize: getWidth(6),
                color: 'rgba(0, 0, 0, 0.6)',
                fontWeight: '600',
              }}>
              {selectedUser.balance}
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              width: getWidth(92),
              backgroundColor: 'white',
              paddingHorizontal: getWidth(2),
              borderBottomLeftRadius: getWidth(2),
              borderBottomRightRadius: getWidth(2),
              alignItems: 'center',
              justifyContent: 'space-between',
              alignSelf: 'center',
              marginTop: getHeight(0.3),
              height: getHeight(8),
            }}>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '49%',
              }}>
              <Text
                style={{
                  fontSize: getWidth(4.5),
                  fontWeight: 'bold',
                  color: '#D32F2F',
                  marginBottom: getHeight(-0.5),
                }}>
                Today
              </Text>
              <Text
                style={{
                  fontSize: getWidth(4.5),
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: '600',
                }}>
                {moment().format('HH:mm ')}
              </Text>
            </View>
            <View
              style={{
                backgroundColor: 'rgba(128, 128, 128, 0.5)',
                height: getHeight(4),
                padding: 1,
              }}
            />
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: '49.5%',
              }}>
              <Text
                style={{
                  fontSize: getWidth(4.5),
                  fontWeight: 'bold',
                  color: '#D32F2F',
                  marginBottom: getHeight(-0.5),
                }}>
                Last added amount
              </Text>
              <Text
                style={{
                  fontSize: getWidth(4.5),
                  color: 'rgba(0, 0, 0, 0.6)',
                  fontWeight: '600',
                }}>
                {selectedUser.last_amount_added}
              </Text>
            </View>
          </View>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: getHeight(1),
              fontWeight: 'bold',
              color: '#D32F2F',
              fontSize: getWidth(5),
            }}>
            Last Transactions
          </Text>

          <FlatList
            style={styles.flatListMain}
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            data={selectedUser.last_transaction.slice(0, 3)}
            renderItem={item => {
              return (
                <View style={styles.flatListChild}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: getWidth(0.5),
                      paddingHorizontal: getHeight(1),
                      borderRadius: getWidth(2),
                      borderColor:
                        item.item.type === 'debit' ? '#D32F2F' : 'green',
                    }}>
                    <Icon
                      name="rupee-sign"
                      size={getHeight(2.5)}
                      color="#a86140"
                    />
                    <Text
                      style={{
                        fontWeight: 'bold',
                        fontSize: getWidth(6),
                        marginBottom: getHeight(0.5),
                        color: '#a86140',
                      }}>
                      {item.item.amount}
                    </Text>
                  </View>
                  <Text>{item.item.date_time}</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      width: getWidth(21),
                      alignItems: 'center',
                      justifyContent: 'center',
                      paddingHorizontal: getHeight(1.5),
                      paddingVertical: getHeight(0.75),
                      borderRadius: getWidth(2),
                      backgroundColor:
                        item.item.type === 'debit' ? '#D32F2F' : 'green',
                    }}>
                    <Text
                      style={{
                        fontWeight: '500',
                        fontSize: getWidth(4),
                        marginBottom: getHeight(0.5),
                        color: 'white',
                      }}>
                      {item.item.type.toUpperCase()}
                    </Text>
                  </View>
                </View>
              );
            }}
          />
          {/* <View
            style={{flex: 1,width:getWidth(96), backgroundColor: 'white', padding: getHeight(1),borderRadius:getWidth(2)}}>
            <Text>{`Name: ${selectedUser.name}`}</Text>
            <Text>{`Wallet Balance: ${selectedUser.balance}`}</Text>
            <Text>Last transactions :-</Text>
            <FlatList
              style={styles.flatListMain}
              data={selectedUser.last_transaction.slice(0, 3)}
              renderItem={item => {
                return (
                  <View style={styles.flatListChild}>
                    <Text>{`Type: ${item.item.type}`}</Text>
                    <Text>{`Amount: ${item.item.amount}`}</Text>
                    <Text>{`Date&time: ${item.item.date_time}`}</Text>
                  </View>
                );
              }}
            />
            <Text>{`Last amount added: ${selectedUser.last_amount_added}`}</Text>
            <View style={styles.updateSection}>
              <Text>{`Date & Time: ${moment().format('DD/MM/yy hh:mm')}`}</Text>
            </View>
            <View style={{flexDirection: 'row', marginBottom: getHeight(2)}}>
              <TextInput
                placeholder="Amount to be added"
                style={styles.textInput}
                value={amountToBeAdded}
                onChangeText={(amount: number) => setAmountToBeAdded(amount)}
              />
              <TouchableOpacity
                disabled={amountToBeAdded === 0}
                onPress={() => updateAmount()}
                style={[
                  styles.button,
                  {opacity: amountToBeAdded === 0 ? 0.5 : 1},
                ]}>
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
          </View> */}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  detailsView: {
    marginTop: getHeight(1),
    width: width,
    paddingHorizontal: getWidth(2),
  },
  flatListMain: {
    marginTop: getHeight(1),
  },
  button: {
    borderRadius: getHeight(0.5),
    borderWidth: getHeight(0.2),
    width: getWidth(15),
    height: getHeight(4),
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#a86140',
  },
  textInput: {
    width: getWidth(75),
    borderRadius: getHeight(0.5),
    height: getHeight(5),
  },
  updateSection: {
    width: getWidth(96),
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: getHeight(2),
  },
  flatListChild: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    marginBottom: getHeight(1),
    padding: getHeight(1),
    borderRadius: getWidth(2),
    width: getWidth(92),
    marginLeft: getWidth(2),
  },
});

export default UserScreen;
