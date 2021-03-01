import createDataContext from "./createDataContext";
import firestore, { firebase } from '@react-native-firebase/firestore';
import { Alert } from "react-native";

const productReducer = (state, action) => {
  switch (action.type) {
    case "get_Products":
      return action.payload;
    case "edit_blogPost":
      return state.map((product) => {
        return product.id === action.payload.id ? action.payload : product;
      });
    case "delete_Product":
      return state.filter((products) => products.id !== action.payload);

    case "add_Products":
      return [
        ...state,
        {
          id: action.payload.id,
          Image: action.payload.Url,
          title: action.payload.title,
          amount: action.payload.amount,
          time: action.payload.time,
          user: action.payload.user,
          createdBy: action.payload.createdBy,
        },
      ];
    default:
      return state;
  }
};
const getProducts = (dispatch) => {
  return async() => { 
    const responce = await firestore().collection('products').get()
      const arr =[];
      responce.docs.forEach(res => {
        const data = res.data( )
        arr.push(data)
      });
      console.log(arr) 
          dispatch({ type: "get_Products", payload: arr })
  };
};
 
const addProducts = (dispatch) => {
  return async (Url, title, amount, time, createdBy ,user, id ) => {
    await firestore()
    .collection('products')
    .add({
      Image: Url,
      title: title,
      amount: amount,
      time: time,
      user: user,
      id: id,
      created: createdBy,
    }).then(() =>{
      console.log("record updated")
    }).catch((error) =>{
      Alert.alert(error)
    })
    dispatch({ type: "add_Products", payload:{ Url, title, amount ,time ,user ,id, createdBy}});
  };
};


const deleteProduct = (dispatch) => {
  return async (id) => {
    console.log(id)
    await firestore().collection("products").where("id", "==", id).get()
    .then(querySnapshot =>{
      querySnapshot.docs[0].ref.delete()
    }).then(() => {
      console.log("record Deleted")
    }).catch((error) =>{
       Alert.alert(error)
    })
    dispatch({ type: "delete_Product", payload: id });
  };
};
const editProduct = (dispatch) => {
  return async(Url, title, amount, time, createdBy ,user, id, callback) => {
    await firestore().collection("products").where("id", "==", id).get()
    .then(querySnapshot =>{
      querySnapshot.docs[0].ref.update({
        Image: Url,
        title: title,
        amount: amount,
        time: time,
        user: user,
        id: id,
        created: createdBy,
      })
    })
    dispatch({ type: "edit_blogPost", payload: { Url, title, amount ,time ,user ,id, createdBy}})
    if (callback) {
      callback();
    }
  };
};

export const { Context, Provider } = createDataContext(
  productReducer,
  { getProducts, addProducts, deleteProduct, editProduct },
  []
);
