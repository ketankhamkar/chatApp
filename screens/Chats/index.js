/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import {View,Text, TouchableOpacity} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Chats = ({navigation,route})=> {
  const [messages, setMessages] = useState([]);
  const { name , userId, myUid } = route.params;

  useEffect(() => {
    const subscriber = firestore()
    .collection('chats')
    .doc(myUid + userId)
    .collection('messages')
    .orderBy('createdAt','desc');
    subscriber.onSnapshot(querysnapshot=>{
      const allmessages = querysnapshot.docs.map(item =>{
        return {...item._data,createdAt:Date.parse(new Date())};
      });
      setMessages(allmessages);
    });
    // return ()=> subscriber();
  }, []);

  const onSend = useCallback((messages = []) => {
    const msg = messages[0];
    const myMsg = {
      ...msg,
      sendBy:myUid,
      sendTo:userId,
      createdAt:Date.parse(msg.createdAt),
    };
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, myMsg));
    firestore()
    .collection('chats')
    .doc('' + myUid + userId)
    .collection('messages')
    .add(myMsg);

    firestore()
    .collection('chats')
    .doc('' + userId + myUid)
    .collection('messages')
    .add(myMsg);
  }, []);

  return (
    < View style={{flex:1}}>
      <View style={{height:50,flexDirection:'row',alignItems:'center',backgroundColor:'#033dfc'}}>
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <TouchableOpacity
        onPress={()=>navigation.goBack()}
        >
        <Text style={{color:'#fff'}}>back</Text>
        </TouchableOpacity>
        </View>
        <View style={{flex:4}}>
        <Text style={{color:'#fff',fontSize:18}}>{name}</Text>
        </View>
      </View>
    <GiftedChat
      messages={messages}
      messagesContainerStyle={{backgroundColor:'#fff'}}
      scrollToBottom={true}
      renderUsernameOnMessage
      onSend={(messages) => onSend(messages)}
      user={{
        _id: myUid,
        name:name,
      }}
    />
    </View>
  );
};

export default Chats;
