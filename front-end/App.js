import { StyleSheet, Text, View } from 'react-native';
import Home from "./components/Home";
import Profil from "./components/Profil";

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Home /> */}
      <Profil />
    </View>
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
