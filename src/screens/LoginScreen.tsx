import React, {useState, useContext} from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import AuthContext from '../context/AuthContext';

const LoginScreen = ({navigation}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const {login} = useContext(AuthContext);

    const handleLogin = async () => {
        if(!email || !password){
            Alert.alert('Please enter both email and password');
            return;
        }

        try{
            console.log('LoginScreen.js bonita, email, password: ', email, password);
            await login(email, password);
            console.log('LoginScreen.js Login successful');
        } catch(error){
            console.log('LoginScreen.js Login failed:', error);
        }
    }

    return(
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
             <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <View style={styles.button}>
            <Button title="Login" onPress={handleLogin} />
            </View>
            <Button 
                title="Don't have an account? Sign Up" 
                onPress={() => navigation.navigate('Register')} // For later
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#666' },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,

    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
    }
  });
  
export default LoginScreen;