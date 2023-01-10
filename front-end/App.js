import { StyleSheet, Text, View } from 'react-native';
import Home from "./components/Home";
import Profil from "./components/Profil";
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';


const Tab = createMaterialTopTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator

        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              // iconName = focused
              // ? 'ios-information-circle'
              // : 'ios-information-circle-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'ios-list' : 'ios-list-outline';
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
      </Tab.Navigator>

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
