/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {Input, Button} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToNext=async(userId,name)=>{
    try {
        await AsyncStorage.setItem('userId', userId);
        await AsyncStorage.setItem('name', name);
        navigation.navigate('Users');
      } catch (e) {
        console.log(e);
      }
  };

  const onPress = ()=>{
    if ( email == '' || password == '')
    {
      console.log('error');
    } else {
      firestore().collection('users').where("email","==",email).get().then(res=>{
        if(res.docs !==[]){
            console.log(JSON.stringify(res.docs[0].data().userId));
            goToNext(
                res.docs[0].data().userId,
                res.docs[0].data().name
            );
        } else {
            Alert.alert('user not found');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('user not found');
      });

    }
  };

  return (
    <View style={styles.container}>
      
      <Input
        placeholder="Enter your email"
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="Enter your password"
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={onPress} style={styles.button} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  button: {
    width: 370,
    marginTop: 10,
  },
});

export default Login;
