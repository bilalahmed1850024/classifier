import React, {Component, useEffect} from 'react';
import SplashScreen from 'react-native-splash-screen'
import { View , ActivityIndicator} from 'react-native';
import auth from '@react-native-firebase/auth';

class SplashScreens extends Component {
  state ={
    user: null
  }
  componentDidMount(){
    auth().onAuthStateChanged(user => {
      user ? this.props.navigation.navigate("First") : this.props.navigation.navigate("Login")
    });
    SplashScreen.hide();
   }

   

  render() {
    
    return (
      <View>
         <ActivityIndicator size="large" color="#00ff00" />
      </View>
    );
  }
}
const styles = {
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
}

export default SplashScreens;







