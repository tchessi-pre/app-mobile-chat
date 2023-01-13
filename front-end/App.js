import { StyleSheet, Text, View } from 'react-native';
import Home from "./screens/Home";
import Profil from "./screens/Profil";
import Chat from "./screens/Chat";
import Login from "./screens/Login";
import Register from './screens/Register';


import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import { SafeAreaView } from 'react-native-safe-area-context';


const Tab = createMaterialTopTabNavigator();
const TabNavigate = () => {
  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'ios-home' : 'ios-home';
          } else if (route.name === 'Profil') {
            iconName = focused ? 'ios-person' : 'ios-person';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'ios-chatbubbles' : 'ios-chatbubbles';
          }
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#fff',
        // tabBarLabelStyle: {fontSize: 12 },
        // tabBarItemStyle: {width: 100 },
        tabBarStyle: { backgroundColor: '#0F1828' },
        tabBarIndicatorStyle: { backgroundColor: 'white' },
        // tabBarLabelStyle: {fontSize: 12, fontWeight: 'bold', color: 'white' },


      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profil" component={Profil} />
      <Tab.Screen name="Chat" component={Chat} />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
const StackNavigate = () => {
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
    options={{ title: 'Login' }}
  />

  <Stack.Screen
    name="Register"
    component={Register}
    options={{ title: 'Register' }}
  />
  <Stack.Screen name="HomeTab" component={TabNavigate} options={{ title: 'Home' }} />
</Stack.Navigator>
  );
}



export default function App() {
  return (

    <NavigationContainer>
      {/* <TabNavigate /> */}
      <StackNavigate />
    </NavigationContainer >
  );
}

const styles = StyleSheet.create({
  container: {
    //     flex: 1,
    // backgroundColor: '#0F1828',
    //     alignItems: 'center',
    //     justifyContent: 'center',
  },


});
