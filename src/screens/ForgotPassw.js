import React,{ useState } from 'react';
import auth from '@react-native-firebase/auth';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';


function ForgotPassw({navigation}) {
    const [email, setEmail] = useState('')

    const forgotPassword = () =>{
        console.log(email)
        if(email !== ''){
            auth().sendPasswordResetEmail(email).then(() =>{
                alert("please check your Account and reset password")
                navigation.navigate("Login")
            })
            .catch((error) =>{alert(error) })
        }
        else{
            alert("please fill the form first")
        }
    }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>welcome</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>please enter your Correct Email </Text>
        <View style={styles.action}>
          <TextInput
            placeholder="Your Email"
            autoCapitalize="none"
            style={styles.textInput}
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        <TouchableOpacity
          style={styles.LogIn}
          onPress={() => forgotPassword(email)}
        >
          <Text style={styles.textSign}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
    paddingTop: 70,
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
    paddingTop: 30,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    left: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
    borderWidth: 5,
    borderColor: 'red',
  },
  LogIn: {
    marginTop: 40,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#009387',
  },
  signIn: {
    marginTop: 10,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#009387',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  forgotten: {
    marginTop: 5,
    left: 229,
  },
};

export default ForgotPassw;
