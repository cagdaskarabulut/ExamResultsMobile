/* import 'react-native-gesture-handler';
import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import ChatScreen from './src/screens/ChatScreen';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


import {
    View,
    Text
} from 'react-native';

const Stack = createStackNavigator();

export default class App extends Component {
    
    componentDidMount() {
            auth()
            .signInAnonymously()
            .then(async (credentials) => {
                console.log('User signed in anonymously');
        })
        .catch(error => {
            if (error.code === 'auth/operation-not-allowed') {
                console.log('Enable anonymous in your firebase console.');
            }
            console.error(error);
        });
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>asd12 3 Open up App.js to start working on your app!</Text>
            </View>

        );
    }

}
 */

import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from './src/screens/HomeScreen'
import CreateScreen from './src/screens/CreateScreen'
import Icon from 'react-native-vector-icons/FontAwesome'

const App = () => {
  const Tab = createBottomTabNavigator()
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen name='Home' component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name='home' color={color} size={size} />
          )
        }}
        />
        <Tab.Screen name='Create' component={CreateScreen}
        options={{
          tabBarLabel: 'Create',
          tabBarIcon: ({color, size}) => (
            <Icon name='pencil' color={color} size={size} />
          )
        }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App