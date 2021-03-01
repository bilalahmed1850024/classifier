import React, {Component} from 'react';
// import {AntDesign} from '@expo/vector-icons';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-community/google-signin';
import {Spinner} from '../common';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Platform,
  TextInput,
  TouchableOpacity,
  Alert
} from 'react-native';

class Signup extends Component {
  state = {
    email: '',
    Password: '',
    loading: false,
    error: '',
    confirm: '',
  };
  userSignup() {
    if (
      this.state.email !== '' &&
      this.state.Password !== '' &&
      this.state.confirm !== ''
    ) {
      const {email, Password, confirm, loading} = this.state;

      this.setState({error: '', loading: true});
      if (confirm === Password) {
        auth()
          .createUserWithEmailAndPassword(email, Password)
          .then(this.onLoginSuccess.bind(this))
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              this.setState({
                error: 'That email address is already in use!',
                loading: false,
              });
            }

            if (error.code === 'auth/invalid-email') {
              this.setState({
                error: 'That email address is invalid!',
                loading: false,
              });
            }

            Alert.alert(error);
          });
      } else {
        this.setState({loading: false});
        Alert.alert('your password does not match with current Password');
      }
    } else {
      Alert.alert('please fill all the feild First');
    }
  }

  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: '',
    });
    this.props.navigation.navigate('First');
  }

  onLoginFailed() {
    this.setState({
      loading: false,
    });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="large" />;
    }
    return (
      <TouchableOpacity
        style={styles.LogIn}
        onPress={this.userSignup.bind(this)}>
        <Text style={styles.textSign}>Sign up</Text>
      </TouchableOpacity>
    );
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        '844154849783-jhbv029g49r4ehn104h8tj9nfmjnoq16.apps.googleusercontent.com',
    });
  }

  async onGoogleButtonPress() {
    this.setState({error: '', loading: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn().then(() => {
      this.props.navigation.navigate('First');
      this.setState({loading: false});
    });

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth()
      .signInWithCredential(googleCredential)
      .then(() => {
        this.props.navigation.navigate('First');
      });
  }

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.text_header}>welcome</Text>
          </View>
          <View style={styles.footer}>
            <ScrollView >
            <Text style={styles.text_footer}>Email</Text>
            <View style={styles.action}>
              {/* <AntDesign name="user" size={24} color="grey" /> */}
              <TextInput
                placeholder="Your Email"
                style={styles.textInput}
                value={this.state.email}
                onChangeText={(email) => this.setState({email})}
              />
              {/* <AntDesign name="user" size={24} color="grey" /> */}
            </View>
            <Text style={[styles.text_footer, {marginTop: 10}]}>Password</Text>
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
            <Text style={[styles.text_footer, {marginTop: 10}]}>
              Confirm Password
            </Text>
            <View style={styles.action}>
              <TextInput
                placeholder=" Confirm Password"
                secureTextEntry={true}
                style={styles.textInput}
                autoCapitalize="none"
                value={this.state.confirm}
                onChangeText={(confirm) => this.setState({confirm})}
              />
            </View>
            {Platform.OS === 'android' ? (
              <View style={styles.googleButton}>
                <GoogleSigninButton
                  style={styles.googleSign}
                  size={GoogleSigninButton.Size.Wide}
                  onPress={() =>
                    this.onGoogleButtonPress()
                      .then(() => this.onGoogleLoginSuccess)
                      .catch((error) => alert(error))
                  }
                />
              </View>
            ) : null}
            {/* <Text>{this.state.error}</Text> */}
            {/* <View style={styles.button}> */}
            {this.renderButton()}
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
    paddingHorizontal: 20,
    // paddingBottom: 10,
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
    paddingBottom: 4,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -18,
    left: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 5,
    borderColor: 'red',
  },
  LogIn: {
    marginTop: 10,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#009387',
  },
  signIn: {
    marginTop: 10,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#009387',
  },
  textSign: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  googleButton: {
    margin: 0,
    marginTop: 10,
    marginBottom: 0,
  },
  googleSign: {
    width: 320,
    height: 48,
    backgroundColor: '#009387',
  },
};

export default Signup;
