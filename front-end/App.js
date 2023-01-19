import { StyleSheet, Animated, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ChannelScreen from "./screens/ChannelScreen";
import SettingsScreen from "./screens/ProfilScreen";
import ChatScreen from "./screens/ChatScreen";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const forFade = ({ current, next }) => {
  const opacity = Animated.add(
    current.progress,
    next ? next.progress : 0
  ).interpolate({
    inputRange: [0, 1, 2],
    outputRange: [0, 1, 0],
  });

  return {
    leftButtonStyle: { opacity },
    rightButtonStyle: { opacity },
    titleStyle: { opacity },
    backgroundStyle: { opacity },
  };
};

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer style={styles.container}>
      <StatusBar backgroundColor="#0F1828" barStyle="light-content" />
      <Tab.Navigator
        options={{
          activeTintColor: '#FF6B6B',
          activeBackgroundColor: '#0F1828',
          inactiveBackgroundColor: '#0F1828',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerStyleInterpolator: forFade,
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '0F1828#' },
            title: 'Home',
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        <Tab.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerStyleInterpolator: forFade,
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '0F1828#' },
            title: 'Connexion',
            tabBarStyle: { display: "none" },
            headerStyle: { backgroundColor: '#0F1828' },
            headerShown: false,
          }}
        />
        < Tab.Screen
          name="Register"
          component={RegisterScreen}
          options={{
            headerStyleInterpolator: forFade,
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#0F1828' },
            title: 'Inscription',
            headerShown: false,
            tabBarStyle: { display: "none" },
          }}
        />
        < Tab.Screen
          name="Disc."
          component={ChannelScreen}
          options={{
            tabBarLabel: 'Disc...',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={30} />
            ),
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#0F1828' },
            headerShown: false,
            
          }}
        />
        <Tab.Screen
          name="Chat"
          component={ChatScreen}
          options={{
            tabBarLabel: 'Chat',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="message" color={color} size={30} />
            ),
            tabBarBadge: 3,
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#0F1828' },
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Mon profil"
          component={SettingsScreen}
          options={{
            tabBarLabel: 'Profil',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={30} />
            ),
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#0F1828' },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F1828',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
});
