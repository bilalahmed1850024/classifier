import React from 'react';
import {TouchableOpacity} from "react-native"
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import SplashScreens from './src/screens/SplashScreen';
import ForgotPassw from './src/screens/ForgotPassw';
import ProductList from './src/screens/productList';
import UploadProduct from './src/screens/uploadProduct';
import UpdateProduct from './src/screens/updateProduct';
import  {DrawerContent}  from './src/screens/productList';
import {Provider} from "./src/component/Context/ProductContext"
import { NavigationEvents} from 'react-navigation';
import {DrawerActions} from 'react-navigation-drawer';


const Stack = createStackNavigator();

const Drawer = createDrawerNavigator();

function DrawerRoutes() {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="First" component={ProductList} />
      <Drawer.Screen name="Upload" component={UploadProduct} />
      <Drawer.Screen name="Update" component={UpdateProduct} />
    </Drawer.Navigator>
  );
}


function Apps() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />
        <Stack.Screen name="Sign" component={Signup} options={{headerShown: false}} />
        <Stack.Screen name="Splash" component={SplashScreens} />
        <Stack.Screen
          name="First"
          component={DrawerRoutes}
          options={{
            headerLeft: 
            () => (
              <Icon.Button
                name="ios-menu"
                size={25}
                backgroundColor="#009387"
                />
            ),
          }}
        />
        <Stack.Screen name="Forgot" component={ForgotPassw} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const App = Apps;

export default () =>{
  return <Provider>
    <App />
  </Provider>
}

// const demApp = ({navigation}) => {
//   return (
//     <Stack.Screen
//       name="First"
//       component={DrawerRoutes}
//       options={{
//         title: 'ProductList',
//         headerLeft: () => (
//           <Icon.Button
//             name="ios-menu"
//             size={25}
//             backgroundColor="#009387"
//             onPress={() => navigationnavigate('DrawerOpen')}></Icon.Button>
//         ),
//       }}
//     />
//   );
// };
