import AsyncStorage from '@react-native-async-storage/async-storage';
const LIST_KEY = "@LIST_KEY";

export const storeList = (array)=>{
  try {
    const jsonValue = JSON.stringify(array);
    AsyncStorage.setItem(LIST_KEY, jsonValue);
  } catch (e) {
    console.log(e);
  }
}

export const getList = async ()=>{
  try {
    const jsonValue = await AsyncStorage.getItem(LIST_KEY)
    return (jsonValue != null) ? JSON.parse(jsonValue) : [];
  } catch(e) {
    console.log(e);
    return [];
  }
}