import React, { useState } from 'react';
import { Alert, Button, Image, Pressable, SafeAreaView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const logo = require("../assets/Curently_transparent.png");
import { getAuth, signInWithEmailAndPassword , createUserWithEmailAndPassword } from "firebase/auth";



const Login = () => {
  const auth = getAuth();
  const [click, setClick] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const [signup, setSignup] = useState(false)
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        navigation.navigate('Home');
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        // alert('Incorrect Credentials');
        const errorCode = error.code;
        const errorMessage = error.message;
      });
      navigation.navigate('Home');
  };
  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    alert('Created User')
    setSignup(!signup)
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });

  }

  return (
    <SafeAreaView style={styles.container}>
      <Image source={logo} style={styles.image} resizeMode='contain' />
      {signup ? <Text style={styles.title}>Sign up</Text> : <Text style={styles.title}>Login</Text> }
      <View style={styles.inputView}>
        <TextInput

          style={styles.input}
          placeholder='EMAIL'
          value={email}
          onChangeText={setEmail}
          autoCorrect={false}
          autoCapitalize='none'
          placeholderTextColor='black'
        />
        <TextInput

          style={styles.input}
          placeholder='PASSWORD'
          secureTextEntry
          value={password}
          onChangeText={setPassword}
          autoCorrect={false}
          autoCapitalize='none'
          placeholderTextColor='black'
        />
      </View>
      <View style={styles.buttonView}>

        {signup ? <Pressable
          style={[styles.button, { backgroundColor: 'black' }]}
          onPress={handleSignup}
        >
          <Text style={[styles.buttonText, { color: 'white' }]} >Sign up</Text>
        </Pressable> : <Pressable
          style={[styles.button, { backgroundColor: 'black' }]}
          onPress={handleLogin}
        >
          <Text style={[styles.buttonText, { color: 'white' }]} >LOGIN</Text>
        </Pressable>}

      </View>
      <Pressable onPress={() => setSignup(!signup)}>
        <Text style={styles.footerText}>
          {signup ? "Already Have an Account?" : "Don't Have Account?"}
          <Text style={styles.signup}> {signup ? "Log In" : "Sign Up"}</Text>
        </Text>
      </Pressable>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingTop: 70,
    backgroundColor: "white",
    flex: 1
  },
  image: {
    height: 160,
    width: 170
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    textTransform: "uppercase",
    textAlign: "center",
    paddingVertical: 40,
    color: "black"
  },
  inputView: {
    gap: 15,
    width: "100%",
    paddingHorizontal: 40,
    marginBottom: 5
  },
  input: {
    height: 50,
    paddingHorizontal: 20,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    color: 'black'
  },
  rememberView: {
    width: "100%",
    paddingHorizontal: 50,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 8
  },
  button: {
    height: 45,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold"
  },
  buttonView: {
    marginTop: 20,
    width: "100%",
    paddingHorizontal: 50
  },
  optionsText: {
    textAlign: "center",
    paddingVertical: 10,
    color: "gray",
    fontSize: 13,
    marginBottom: 6
  },
  mediaIcons: {
    flexDirection: "row",
    gap: 15,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 23
  },
  icons: {
    width: 40,
    height: 40,
  },
  footerText: {
    textAlign: "center",
    color: "gray",
    marginTop: 10
  },
  signup: {
    color: "black",
    fontSize: 13
  }
});

export default Login;