import React, { useState, useEffect}  from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import CreateScreen from './src/screens/dummy/CreateScreen';
import Login from './src/screens/Login';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';
import HomeScreenTeacher from './src/screens/HomeScreenTeacher';
import HomeScreenStudent from './src/screens/HomeScreenStudent';
import { Button, View, ScrollView, Text} from 'react-native';
import UpdateScreen from './src/screens/dummy/UpdateScreen';
import HomeScreen from './src/screens/dummy/HomeScreen';

const App = () => {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator()
  const [authenticated, setAuthenticated] = useState(false);
  const [isTeacher, setIsTeacher] = useState(true);
  const [isAdmin, setIsAdmin] = useState(true);


  auth().onAuthStateChanged((user) => {
    if (user) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  });

  const PublicStack = () => { 
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={CreateScreen} />
        </Stack.Navigator>
       );
    }
 
  const PrivateStack = (props) => { 
    return (
      <Tab.Navigator
        initialRouteName={props.startpage}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray'
        }}
      >
        <Tab.Screen name={props.tabMenu1Name} component={props.tabMenu1Component}
        options={{
          tabBarLabel: props.tabMenu1Name,
          tabBarIcon: ({color, size}) => (
            <Icon name={props.tabMenu1IconName} color={color} size={size} />
          )
        }}
        />
        <Tab.Screen name={props.tabMenu2Name} component={props.tabMenu2Component}
        options={{
          tabBarLabel: props.tabMenu2Name,
          tabBarIcon: ({color, size}) => (
            <Icon name={props.tabMenu2IconName} color={color} size={size} />
          )
        }}
        />
      </Tab.Navigator>
       );
    
     }

  return (
    <NavigationContainer>
      
      {authenticated ? (
        isAdmin && isTeacher ? (
          <PrivateStack 
          startpage="Yoklama" tabMenu1Title="Yönetici Modu - Öğrenci Listesi" 
          tabMenu1Name="Yoklama" tabMenu1Component={HomeScreenStudent} tabMenu1IconName="home"
          tabMenu2Name="Yeni Kullanıcı Ekle" tabMenu2Component={CreateScreen} tabMenu2IconName="pencil"
          />
        ) : (

          isTeacher ? (
            <PrivateStack 
            startpage="Yoklama" tabMenu1Title="Ogretmen Modu - Öğrenci Listesi" 
            tabMenu1Name="Yoklama" tabMenu1Component={HomeScreenStudent} tabMenu1IconName="home"
            tabMenu2Name="Sınav Sonuçları"  tabMenu2Component={CreateScreen} tabMenu2IconName="pencil"
            />
          ) : (
            <PrivateStack 
            startpage="Yoklama" tabMenu1Title="Öğrenci Listesi" 
            tabMenu1Name="Yoklama" tabMenu1Component={HomeScreenStudent} tabMenu1IconName="home"
            tabMenu2Name="Sınav Sonuçları"  tabMenu2Component={CreateScreen} tabMenu2IconName="pencil"
            />
          )
        )
      ) : (
        <Login />
      )}
      
    </NavigationContainer>
  )
}

export default App
