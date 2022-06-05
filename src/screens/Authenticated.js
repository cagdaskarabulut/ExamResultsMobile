import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import auth from '@react-native-firebase/auth';
import {StackActions} from '@react-navigation/native';
//import {useNavigation} from '@react-navigation/native';

export default function Authenticated() {
  //const navigation = useNavigation();
  /* const signOut = async () => {
    try {
      auth().signOut();
    } catch (error) {
      alert(error);
    }
  }; */


  const signOut = async function () {
    return await auth().signOut()
      .then(async () => {
        // To verify that current user is now empty, currentAsync can be used
        //const currentUser = await Parse.User.currentAsync();
        //if (currentUser === null) {
          Alert.alert('Success!', 'No user is logged in anymore!');
        //}
        // Navigation dispatch calls a navigation action, and popToTop will take
        // the user back to the very first screen of the stack
        //navigation.dispatch(StackActions.popToTop());
        return true;
      })
      .catch((error) => {
        Alert.alert('Error!', error.message);
        return false;
      });
  };


  return (
    <View style={styles.screen}>
      <Text style={styles.text}>You're Logged in</Text>
      <View style={styles.button}>
        <Button title="Signout" onPress={() => auth().signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
  },
  button: {
    marginTop: 30,
  },
});
