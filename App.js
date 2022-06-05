/* import React, { useState, useEffect}  from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'
import CreateScreen from './src/screens/CreateScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth';
const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator()
  const [isLoggedIn, setIsLoggedIn] = useState([])
  
  //sign in anonymously
  auth()
  .signInAnonymously()
  .then(() => {
    setIsLoggedIn(true)
    console.log('User signed in anonymously');
  })
  .catch(error => {
    if (error.code === 'auth/operation-not-allowed') {
      console.log('Enable anonymous in your firebase console.');
    }

    console.error(error);
  });
  
  const PublicStack = () => { 
    return (
      
        <Stack.Navigator>
            <Stack.Screen name="Login" component={CreateScreen} />
            <Stack.Screen name="Registration" component={CreateScreen} />
        </Stack.Navigator>
       );
    
     }
 
  const PrivateStack = () => { 
    return (
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
       );
    
     }
  
  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <PrivateStack/>
      ) : (
        <PublicStack/>
      )}
      </NavigationContainer>
  )
}
export default App  */

import React, { useState, useEffect}  from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen'
import CreateScreen from './src/screens/CreateScreen'
import Authentication from './src/screens/Authentication'
import Authenticated from './src/screens/Authenticated'
import Icon from 'react-native-vector-icons/FontAwesome'
import auth from '@react-native-firebase/auth';
const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator()
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });
/* 
  var user = auth().currentUser;
  console.log("Kullanici " + user.email);
  if (user) {
    console.log("Kullanici dolu " + user);
    setIsLoggedIn(true);
  } else {
    console.log("Kullanici bos " + user);
    setIsLoggedIn(false);
  } */

  const PublicStack = () => { 
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={CreateScreen} />
            <Stack.Screen name="Registration" component={CreateScreen} />
        </Stack.Navigator>
       );
    }
 
  const PrivateStack = () => { 
    return (
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
       );
    
     }
  
  return (
    <NavigationContainer>
      {authenticated ? (
        // <PrivateStack/>
        <Authenticated />
        
      ) : (
        //<PublicStack/>
        <Authentication />
      )}
      </NavigationContainer>
  )
}

export default App