import React, {useState, useEffect, useContext} from 'react';
import firestore, {firebase} from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import {Spinner} from '../common';
import moment from 'moment';
import {Context} from '../component/Context/ProductContext';
import Icon from 'react-native-vector-icons/FontAwesome5';
import ImagePicker from 'react-native-image-crop-picker';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

function updateProduct({route, navigation}) {
  const {id} = route.params;
  const {state, editProduct} = useContext(Context);
  const product = state.find((product) => product.id === parseInt(id));

  const [Image, setImage] = useState(`${product.Image}`);
  const [title, setTitle] = useState(`${product.title}`);
  const [amount, setAmount] = useState(`${product.amount}`);
  const [time, setTime] = useState(new Date().toLocaleString());
  const [createdBy, setCreatedBy] = useState(`${product.created}`);
  const [loading, setloading] = useState(false);
  const [identifier, setId] = useState('');
  

  bs = React.createRef();
  fall = new Animated.Value(1);

  const takePhotoFromCamera = async () => {
    await ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 200,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then((image) => {
        setImage(image.path);
        bs.current.snapTo(1);
      })
      // .then((image) => {
      //   console.log(image);
      //   console.log('received_Image', uri);
      //   setImage(uri);
      //   bs.current.snapTo(1);
      // })
      .catch((error) => {
        console.log(error);
      });
  };

  // const uploadImage = async (uri, imageName) => {
  //   const responce = await fetch(uri);
  //   const blob = await responce.blob();

  //   const imageRef = storage().ref(`images/${imageName}/`, imageName);
  //   await imageRef.putFile(uri, {contentType: 'image/jpg'}).catch((error) => {
  //     throw error;
  //   });
  //   imageRef.on(
  //     firebase.storage.TaskEvent.STATE_CHANGED,
  //   (snapshot) => {},
  //   (err) => {
  //     rej(err);
  //   },
  //     async () =>{
  //     const url = await imageRef.sna.getDownloadURL().catch((error) => {
  //     throw error;
  //   });
  //   return url;
  // }
  //   )
  // };

  const uploadImage = async (uri, imageName) => {
    const responce = await fetch(uri);
    const blob = await responce.blob();

    const imageRef = storage().ref(`images/${imageName}/`, imageName);
    await imageRef.putFile(uri, {contentType: 'image/jpg'}).catch((error) => {
      throw error;
    });
    const url = await imageRef.getDownloadURL().catch((error) => {
      throw error;
    });
    return url;
  };

  // const uploadImage = async (uri, imageName) => {
  //   const responce = await fetch(uri);
  //   const blob = await responce.blob();

  //   const imageRef = storage().ref(`images/${imageName}/`, imageName);
  //   await imageRef.putFile(uri, {contentType: 'image/jpg'}).catch((error) => {
  //     throw error;
  //   });
  //   const url = await imageRef.getDownloadURL().then(img => {
  //     console.log('img', img)
  //     imageRef
  //     .update({
  //       uri : img
  //     })
  //     .then(() => { console.log("image uploaded successfully")})
  //     .catch((error) => Alert.alert(error))
  //   })
  //   return url;
  // };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: true,
      compressImageQuality: 0.7,
    })
      .then((image) => {
        setImage(image.path);
        bs.current.snapTo(1);
      })
      .then(() => {
        console.log('function called');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderInner = () => (
    <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.panelTitle}>Upload Photo</Text>
        <Text style={styles.panelSubtitle}>choose Your Profile Picture</Text>
      </View>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={takePhotoFromCamera}>
        <Text style={styles.panelButtonTitle}>Take Photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={choosePhotoFromLibrary}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.panelButton}
        onPress={() => bs.current.snapTo(1)}>
        <Text style={styles.panelButtonTitle}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );

  const renderHeader = () => (
    <View style={styles.headers}>
      <View style={styles.PanelHeader}>
        <View style={styles.panelHandler}></View>
      </View>
    </View>
  );

  // useEffect(() => {
  //   console.log(user.uid);
  //   firestore()
  //     .collection('users')
  //     .onSnapshot((docs) => {
  //       console.log('docs', docs);
  //       let users = [];
  //       docs.forEach((doc) => {
  //         users.push(doc.data());
  //       });
  //     });
  // }, []);

  useEffect(() => {
    let secTimer = setInterval(() => {
      setTime(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  const onSuccessfullytransfer = () => {
    setImage(null);
    setTitle('');
    setAmount('');
    setCreatedBy('');
    setloading(false);
    navigation.navigate('First');
  };

  addRandomUser = async () => {
    setloading(true);
    if (
      (Image !== null, title !== '', amount !== '', createdBy !== '')
    ) {
      if (`${Image}` == `${product.Image}`) {
        var Url = Image;
        // console.log(Url, "Url")
      } else {
        var Url = await await uploadImage(Image, title);
        // console.log(Url, 'dsa');
      }
      // const ids = Math.floor(Math.random() * 99999)
      // console.log("asad" ,ids)
      setId(product.id);
      // console.log(identifier);
      const user = auth().currentUser;

      firestore()
        .collection('users')
        .add({
          user: user.uid,
          email: user.email,
          ID: id,
        })
        .catch((error) => {
          Alert.alert(error);
        });

      editProduct(Url, title, amount, time, createdBy, user.uid, id)
        .then(() => {
          onSuccessfullytransfer();
        })
        .catch((error) => {
          Alert.alert('Error:', error.message);
          setloading(false);
        });
    } else {
      alert('Please fill the Form Properly');
      setloading(false);
    }
  };

  const renderButton = () => {
    if (loading) {
      return <Spinner size="large" />;
    }
    return (
      <TouchableOpacity style={styles.signIn} onPress={() => addRandomUser()}>
        <Text style={styles.textSign}>Update Product</Text>
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <BottomSheet
        style={{borderColor: '#009387', borderWidth: 4}}
        ref={bs}
        snapPoints={[330, 0]}
        renderContent={renderInner}
        renderHeader={renderHeader}
        initialSnap={1}
        callbackNode={fall}
        enabledGestureInteraction={true}
      />
      <View style={styles.footers}>
        <Animated.View style={styles.header}>
          <TouchableOpacity
            style={{flex: 1}}
            onPress={() => bs.current.snapTo(0)}>
            {Image === null ? (
              <Icon
                style={styles.Upload}
                size={65}
                color="black"
                name="camera"
              />
            ) : null}
            <ImageBackground
              style={{flex: 1}}
              source={{
                uri: Image,
              }}
            />
          </TouchableOpacity>
        </Animated.View>
      </View>
      <ScrollView style={styles.footer}>
        <Text style={styles.text_footer}>Title</Text>
        <View style={styles.action}>
          {/* <AntDesign name="user" size={24} color="grey" /> */}
          <TextInput
            placeholder="Title of Product"
            style={styles.textInput}
            value={title}
            onChangeText={(title) => setTitle(title)}
          />
          {/* <AntDesign name="user" size={24} color="grey" /> */}
        </View>
        <Text style={[styles.text_footer, {marginTop: 10}]}>Amount</Text>
        <View style={styles.action}>
          <TextInput
            placeholder=" Amount of your Product"
            style={styles.textInput}
            autoCapitalize="none"
            value={amount}
            onChangeText={(amount) => setAmount(amount)}
          />
        </View>
        <Text style={[styles.text_footer, {marginTop: 10}]}>Created at</Text>
        <View style={styles.actions}>
          <Text
            placeholder=" Created At"
            style={styles.text}
            // autoCapitalize="none"
            // value={time}
            // onChangeText={(time) => setTime(time)}
          >
            {'\n'}
            {'\n'}
            {'\n'} {time}
          </Text>
        </View>
        <Text style={[styles.text_footer, {marginTop: 10}]}>Created by</Text>
        <View style={styles.action}>
          <TextInput
            placeholder=" Created By"
            style={styles.textInput}
            autoCapitalize="none"
            value={createdBy}
            onChangeText={(createdBy) => setCreatedBy(createdBy)}
          />
        </View>
        {renderButton()}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    backgroundColor: '#009387',
    marginBottom: 10,
    marginTop: 10,
  },
  Upload: {
    alignSelf: 'center',
    paddingTop: 35,
    borderColor: 'black',
  },
  footer: {
    flex: 1,
    backgroundColor: '#fff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    paddingHorizontal: 20,
  },
  footers: {
    // flex: 1,
    backgroundColor: '#fff',
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // paddingHorizontal: 20,
    //   borderColor: "red",
    //   borderWidth: 10
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
  text_footer: {
    color: '#05375a',
    fontSize: 15,
  },
  action: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 5,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 20,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    marginBottom: Platform.OS === 'ios' ? 0 : -16,
    left: 10,
    color: '#05375a',
  },
  text: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -43,
    marginBottom: Platform.OS === 'ios' ? 0 : -16,
    left: 10,
    color: '#05375a',
  },
  button: {
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 5,
    borderColor: 'red',
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
  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
  headers: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
};

export default updateProduct;
