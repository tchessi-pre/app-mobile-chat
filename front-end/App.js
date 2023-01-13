import { StyleSheet, Animated } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen";
import ConnexionScreen from "./screens/ConnexionScreen";
import InscriptionScreen from "./screens/InscriptionScreen";

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
      <Stack.Navigator>
        < Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#0F1828' },
            title: 'Welcome'
          }}
        />
          < Stack.Screen
            name="Inscription"
            component={InscriptionScreen}
            options={{ 
            headerStyleInterpolator: forFade,
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#0F1828' },
            title: 'Accueil'
          }}
          />
        <Stack.Screen 
          name="Connexion" 
          component={ConnexionScreen} 
          options={{ 
            headerStyleInterpolator: forFade,
            headerTintColor: 'white',
            headerStyle: { backgroundColor: '#0F1828' },
            title: 'Accueil',
          }}
        />
      </Stack.Navigator>
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
