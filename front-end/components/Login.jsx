import React, { useState } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, TouchableHighlight   } from 'react-native';
import { FontAwesome  } from '@expo/vector-icons';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Faire appel à l'API de login ici
  };

  const CustomButton = ({ style, onPress, title }) => (
    <TouchableOpacity style={style} onPress={onPress}> 
    <Text style={style}>{title}</Text>
    </TouchableOpacity>
  );

  const BackButton = ({ onPress }) => (
    <TouchableHighlight style={styles.backButton} onPress={onPress}>
      <FontAwesome name="arrow-left" size={25} color="#000" />
    </TouchableHighlight>
  );
  


  return (
    <View>
        <BackButton
          style={styles.backButton}
          onPress={() => console.log('Button pressed!')}
          />

        <Text style={styles.connectText}>TissApp</Text>
        <Image style={styles.logo} source={require('../assets/Logo-TissApp.png')}/>
        <Text style={styles.connectText}>Connexion</Text>
        
      
      <TextInput
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />

      {/* Mot de passe */}
      <TextInput
        placeholder='Password'
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />

      <CustomButton
        title="Se connecter"
        style={styles.button}
        onPress={() => console.log('Button login pressed!')}
      />

    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    width: '100%',
    height: 35,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 25,
    backgroundColor: 'red',
    
  },
  connectText: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FF6B6B',
    padding: 8,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 10,
    textAlign: 'center',
  },
    logo: {
		width: 280,
		height: 280,
		objectFit: 'cover',
	},
  input: {
    borderColor: 'none',
    padding: 10,
    margin: 10,
    backgroundColor: '#152033'
  },
});

export default Login;