import React from 'react'
import HomeScreenTeacher from '../HomeScreenTeacher'
import HomeScreenStudent from '../HomeScreenStudent'
import UpdateScreen from './UpdateScreen'
import Login from '../Login'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const HomeScreen = () => {
    const Stack = createNativeStackNavigator()
    return (
        <Stack.Navigator initialRouteName='HomeScreenTeacher' screenOptions={{headerShown: false}}>
            <Stack.Screen name='HomeScreenStudent' component={HomeScreenStudent} />
            <Stack.Screen name='HomeScreenTeacher' component={HomeScreenTeacher} />
            <Stack.Screen name='Update' component={UpdateScreen} />
            <Stack.Screen name='Login' component={Login} />
        </Stack.Navigator>
    )
}

export default HomeScreen