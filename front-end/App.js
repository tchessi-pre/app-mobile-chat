import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/Home";
import Profil from "./screens/Profil";
import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Register from './screens/Register';
import Contact from './screens/Contact';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { SafeAreaView } from 'react-native-safe-area-context';

// Tab Navigator for Home, Profil, Chat, Contact screens
const Tab = createMaterialTopTabNavigator();
const TabNavigate = () => {
  
    // Check if the user is logged in or not by checking the token in AsyncStorage
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const checkToken = async() => {
      // Get the token from AsyncStorage
      const token = await AsyncStorage.getItem('token');
      if (token) {
          // token exists, user is logged in
          setIsLoggedIn(true);
          console.log('token exists');
          console.log('isLoggedIn: ', isLoggedIn);
      } else {
          // token does not exist, user is not logged in
          setIsLoggedIn(false);
          console.log('isLoggedIn: ', isLoggedIn);
      }
    };
    
    useEffect(() => {
      checkToken();
    }, []);
  
  // return the current screen based on the login status connected

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profil') {
            iconName = focused ? 'ios-person' : 'ios-person';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
          }
          else if (route.name === 'Contact') {
            iconName = focused ? 'ios-people-outline' : 'ios-people-outline';
          }
          else if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#0F1828' },
        tabBarIndicatorStyle: { backgroundColor: 'white' },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profil" component={Profil}/>
      <Tab.Screen name="Chat" component={Chat}/>
      <Tab.Screen name="Contact" component={Contact}/>
    </Tab.Navigator>
  );
  }


// Stack Navigator for Login and Register screens you need to login first
const Stack = createStackNavigator();
const StackNavigate = () => {
      // Check if the user is logged in or not by checking the token in AsyncStorage
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const checkToken = async() => {
        // Get the token from AsyncStorage
        const token = await AsyncStorage.getItem('token');
        if (token) {
            // token exists, user is logged in
            setIsLoggedIn(true);
            console.log('token exists');
        } else {
            // token does not exist, user is not logged in
            setIsLoggedIn(false);
        }
      };
      
      useEffect(() => {
        checkToken();
      }, []);


  return (
<Stack.Navigator
  initialRouteName='HomeTab'
  screenOptions={{
    headerStyle: {
      backgroundColor: '#0F1828',
    },
    cardStyle: {
      backgroundColor: '#0F1828',
    },
    headerTintColor: '#fff',
  }}
>
  <Stack.Screen
    name="Login"
    component={Login}
    options={{ title: 'Connexion' }}
/>
  <Stack.Screen
    name="Register"
    component={Register}
    options={{ title: 'Inscription' }}
  />
  <Stack.Screen name="HomeTab" component={TabNavigate} options={{ title: 'Home' }} />
</Stack.Navigator>
  );
}


export default function App() {

  return (
    <NavigationContainer>
      
      <StackNavigate />
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({

});
