import React, {Component} from 'react';
import auth from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen'
import {Spinner} from '../common';
// import {AntDesign} from '@expo/vector-icons';
import {
  View,
  Text,
  Platform,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';

class Login extends Component {
  state = {
    email: '',
    Password: '',
    error: '',
    loggedIn: null,
    loading: false,
  };

  onButtonPress() {
    if (this.state.email !== '' && this.state.Password !== '') {
      const {email, Password} = this.state;
      this.setState({error: '', loading: true});

      auth()
        .signInWithEmailAndPassword(email, Password)
        .then((user) => this.onLoginSuccess(user))
        .catch((error) => {
          alert(error);
          this.setState({loading: false, email: '', Password: ''});
        });
    } else {
      alert('please fill all the column properly');
    }
  }

  onLoginFailed() {
    alert(error);
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      Password: '',
      loading: false,
      error: '',
    });

    this.props.navigation.navigate('First');
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }
    return (
      <TouchableOpacity
        style={styles.LogIn}
        onPress={this.onButtonPress.bind(this)}>
        <Text style={styles.textSign}>Log In</Text>
      </TouchableOpacity>
    );
  }

  componentDidMount(){
    auth().onAuthStateChanged(user => {
      user ? this.props.navigation.navigate("First") : this.props.navigation.navigate("Login")
    });
    SplashScreen.hide();
   }
  render() {
    console.log(this.state.email);
    console.log(this.state.Password);

    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text_header}>welcome</Text>
          </View>
          <View style={styles.footer}>
            <Text style={styles.text_footer}>Email</Text>
            <ScrollView style={{marginBottom: 0}}>
              <View style={styles.action}>
                {/* <AntDesign name="user" size={24} color="grey" /> */}
                <TextInput
                  placeholder="Your Email"
                  autoCapitalize="none"
                  style={styles.textInput}
                  value={this.state.email}
                  onChangeText={(email) => this.setState({email})}
                />
                {/* <AntDesign name="user" size={24} color="grey" /> */}
              </View>
              <Text style={[styles.text_footer, {marginTop: 30}]}>
                Password
              </Text>
              <View style={styles.action}>
                <TextInput
                  placeholder=" your Password"
                  secureTextEntry={true}
                  style={styles.textInput}
                  autoCapitalize="none"
                  value={this.state.Password}
                  onChangeText={(Password) => this.setState({Password})}
                />
              </View>
              <TouchableOpacity>
                <Text
                  style={styles.forgotten}
                  onPress={() => this.props.navigation.navigate('Forgot')}>
                  forgotten Password
                </Text>
              </TouchableOpacity>
              {/* <Text>{this.state.error}</Text> */}
              {/* <View style={styles.button}> */}
              {this.renderButton()}
              <TouchableOpacity
                style={styles.signIn}
                onPress={() => this.props.navigation.navigate('Sign')}>
                <Text style={styles.textSign}>Sign Up</Text>
              </TouchableOpacity>
              {/* </View> */}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
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
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 2,
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
    marginTop: 35,
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
    left: 190,
  },
};

export default Login;
