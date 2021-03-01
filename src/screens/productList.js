import React, {useEffect, useState, useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {View, StyleSheet, Image, Alert} from 'react-native';
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Left,
  Body,
  Right,
  Label,
} from 'native-base';

import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import {Context} from '../component/Context/ProductContext';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';

export function DrawerContent(props) {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const signOut = () =>{
    auth()
    .signOut()
    .then(() =>{
      props.navigation.navigate("Login")
    })
  }
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{flexDirection: 'row', marginTop: 15}}>
              <Avatar.Image source={require('../assest/pic.png')} size={50} />
              <View style={{marginLeft: 15, flexDirection: 'column'}}>
                <Title style={styles.title}>Bilal Ahmed</Title>
                <Caption style={styles.caption}>bilal</Caption>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  909
                </Paragraph>
                <Caption style={styles.caption}>Following</Caption>
              </View>
              <View style={styles.section}>
                <Paragraph style={[styles.paragraph, styles.caption]}>
                  100
                </Paragraph>
                <Caption style={styles.caption}>Followers</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Product List"
              onPress={() => {
                props.navigation.navigate('First');
              }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Update Product"
              // onPress={() => {
              //   props.navigation.navigate('Update');
              // }}
            />
            <DrawerItem
              icon={({color, size}) => (
                <Icon name="home-outline" color={color} size={size} />
              )}
              label="Upload Product"
              onPress={() => {
                props.navigation.navigate('Upload');
              }}
            />
          </Drawer.Section>
          <Drawer.Section title="preferences">
            <TouchableRipple
              onPress={() => {
                toggleTheme();
              }}>
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={isDarkTheme} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="exit-to-app" color={color} size={size} />
          )}
          label="Sign Out"
          onPress={() => {
            signOut()
          }}
        />
      </Drawer.Section>
    </View>
  );
}

function ProductList({navigation}) {
  const [states, setState] = useState(null);
  // const [Products, setProduct] = useState(null);
  // const SPACING = 10;
  // const ITEM_SIZE = width * 0.72;
  const {deleteProduct, getProducts, state} = useContext(Context);

  // useEffect(() => {
  //   firestore()
  //     .collection('products')
  //     .get()
  //     .then((responce) => {
  //       const products = [];
  //       responce.forEach((doc) => {
  //         const data = doc.data();
  //         products.push(data);
  //       });
  //       setProduct(products);
  //       console.log('23233', responce);
  //       console.log('34343', products);
  //       console.log('asas', Products);
  //     });
  // }, []);
  useEffect(() => {
    getProducts();
  
    const listener = navigation.addListener('focus', () => {
      getProducts();
      console.log(state[0], '=========================asdas=');
    });
    // return () => {
    //   listener;
    // };
  }, []);

  return (
    <View>
      <FlatList
        data={state}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <View>
              <Content>
                <Card>
                  <CardItem>
                    <Left>
                      <Thumbnail source={require('../assest/pic.png')} />
                      <Body>
                        <Text>{item.title}</Text>
                        <Text note>for sale</Text>
                      </Body>
                    </Left>
                    <Right>
                      <TouchableOpacity onPress={() => {
                          const user = auth().currentUser;
                          const render = user.uid;
                          const itemed = item.user;
                          render === itemed
                            ? deleteProduct(item.id)
                            : Alert.alert(
                                'you does not have any rights to delete',
                              );
                        }
                      
                      }>
                        <Icon name="delete-forever" color="black" size={35} /> 
                      </TouchableOpacity>
                    </Right>
                  </CardItem>
                  <CardItem cardBody>
                    <Image
                      source={{uri: item.Image}}
                      style={{height: 200, width: null, flex: 1}}
                    />
                  </CardItem>
                  <CardItem>
                    <Left>
                      <Icons name="dollar" size={30} color="#900" />
                      <Text>{item.amount}</Text>
                    </Left>
                    <Right>
                      <Button
                        bordered
                        danger
                        onPress={() => {
                          const user = auth().currentUser;
                          const render = user.uid;
                          const itemed = item.user;
                          render === itemed
                            ? navigation.navigate('Update', {id: item.id})
                            : Alert.alert(
                                'you does not have any rights to Update',
                              );
                        }}>
                        <Text>Update</Text>
                      </Button>
                    </Right>
                  </CardItem>
                </Card>
              </Content>
            </View>
          );
        }}
      />
    </View>
  );
}

// ProductList.navigationOptions = ({navigation}) => {
//   return {
//     headerLeft: (
//       <TouchableOpacity onPress={() => navigation.openDrawer()}>
//         <Feather name="plus" Size={25} />
//       </TouchableOpacity>
//     ),
//   };
// };
const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});

export default ProductList;
