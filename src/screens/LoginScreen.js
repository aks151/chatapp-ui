import React, {useState, useContext} from "react";
import { View, TextInput, Button, StyleSheet, Alert } from "react-native";
import {AuthContext} from '../context/AuthContext';

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
            await login(email, password);
        } catch(error){
            Alert.alert('Login failed', error.response.data.message);
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
            <Button title="Login" onPress={handleLogin} />
            <Button 
                title="Don't have an account? Sign Up" 
                onPress={() => navigation.navigate('Register')} // For later
            />

        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
  });
  
export default LoginScreen;