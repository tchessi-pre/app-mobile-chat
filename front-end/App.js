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

// Stack Navigator for Login and Register screens you need to login first
const Stack = createStackNavigator();
const Tab = createMaterialTopTabNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
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
      <Stack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Accueil' }}
      />
    </Stack.Navigator>
  );
}

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Profil') {
            iconName = focused ? 'ios-person' : 'ios-person';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
          } else if (route.name === 'Contact') {
            iconName = focused ? 'ios-people-outline' : 'ios-people-outline';
          }
          // else if (route.name === 'Home') {
          //   iconName = focused ? 'ios-home' : 'ios-home';
          // }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#fff',
        tabBarStyle: { backgroundColor: '#0F1828' },
        tabBarIndicatorStyle: { backgroundColor: 'white' },
      })}>
      
      {/* <Tab.Screen name="Home" component={Home}/> */}
      <Tab.Screen name="Chat" component={Chat}/>
      <Tab.Screen name="Contact" component={Contact}/>
      <Tab.Screen name="Profil" component={Profil}/>
    </Tab.Navigator>
  );
}



// APP function to check if the user is connected or not and return the current screen based on the login status
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkToken = async() => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }

  useEffect(() => {
    checkToken();
  }, []);

  return (
      <NavigationContainer>
        {isLoggedIn ? (
          <TabNavigator/>
        ) : (
          <StackNavigator />
        )}
      </NavigationContainer>
    );
}

export default App;