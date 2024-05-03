/* eslint-disable prettier/prettier */
import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const Register = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onPress = ()=>{
    if (name == '' || email == '' || password == '')
    {
      console.log('error');
    } else {
      const userId = uuid.v4();
      firestore().collection('users').doc(userId).set({
        userId:userId,
        name:name,
        email:email,
        password:password,
      }).then((res)=>{
        console.log(res);
        navigation.navigate('Users');
      }).catch((error)=>{
        console.log(error);
      });
    }
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your name"
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
      />
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
      <Button title="register" onPress={onPress} style={styles.button} />
      <TouchableOpacity
      style={{marginTop:20,alignItems:'center',justifyContent:'center'}}
      onPress={()=>navigation.navigate('Login')}
      >
        <Text style={{color:'#000'}}>Login</Text>
      </TouchableOpacity>
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

export default Register;
