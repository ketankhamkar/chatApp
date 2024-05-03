/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React,{useEffect,useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

let myUid = '';

const Users = ({navigation}) => {

  const [allUsers, setAllUsers] = useState([]);

  const getData = async()=>{
    const userId = await AsyncStorage.getItem('userId');
    myUid = await AsyncStorage.getItem('userId');
    firestore().collection('users').where("userId","!=",userId).get().then(res=>{
      if (res.docs != []){
      console.log(userId);
      setAllUsers(res.docs);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const renderItem = ({item}) => {
    const {name = '', userId = ''} = item._data;
    return (
      <View>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Chats',{userId:userId,name:name,myUid:myUid})}
        style={{width:'100%',alignItems: 'center'}}>
        <Text style={{color: '#000', paddingVertical: 10}}>{name}</Text>
        <View
          style={{
            width: '100%',
            height: 1,
            backgroundColor: '#000',
            opacity: 0.3,
          }}
        />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <FlatList data={allUsers} renderItem={renderItem} />
    </View>
  );
};

export default Users;
