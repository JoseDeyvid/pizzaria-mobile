import React, { useState, useContext } from 'react'
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import { StyleSheet } from 'react-native'
import api from '../../services/api'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../../contexts/AuthContext'

type SignInProps = {
    email: string;
    password: string;
}

const SignIn = () => {

    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { signIn, loadingAuth } = useContext(AuthContext);

    const handleLogin = async () => {
        if (email === "" || password === "") {
            return;
        }
        await signIn({ email, password });

    }

    return (
        <SafeAreaView style={styles.container}>
            <Image style={styles.logo} source={require("../../assets/logo.png")} />
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} placeholder='Digite seu email' placeholderTextColor={"#F0F0F0"} value={email} onChangeText={setEmail} />
                <TextInput style={styles.input} placeholder='Sua senha' placeholderTextColor={"#F0F0F0"} value={password} onChangeText={setPassword} secureTextEntry={true} />
                <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loadingAuth}>
                    {loadingAuth ? (
                        <ActivityIndicator size={25} color={"#fff"} />
                    ) : (
                        <Text style={styles.buttonText}>Acessar</Text>
                    )}
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SignIn

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1d1d2e",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    },
    logo: {
        marginBottom: 18
    },
    inputContainer: {
        width: "95%",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 32,
        paddingHorizontal: 14,
    },
    input: {
        width: "95%",
        height: 40,
        backgroundColor: "#101026",
        marginBottom: 12,
        borderRadius: 4,
        paddingHorizontal: 8,
        color: "#fff"
    },
    button: {
        backgroundColor: "#3fffa3",
        width: "95%",
        height: 40,
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center"
    },
    buttonText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#101026"
    }
})