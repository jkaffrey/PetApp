import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { HelperText } from "react-native-paper";

import { APP_COLORS } from "../../Helpers/colors";
import { validEmail, passwordValid } from "../../Helpers/validation";
import { setUserDisplayName } from "../../Helpers/Database/user";

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import SimpleTextInput from "../../Components/SimpleTextInput";
import { useNavigation } from "@react-navigation/native";
import LoadingScreen from "../../Components/LoadingScreen";

export default function SignUp({ loading, setLoading }) {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const attemptAccountCreate = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCreds) => {
        const uid = userCreds.user.uid;
        updateProfile(userCreds.user, {
          displayName: displayName,
        })
          .then(async () => {
            await setUserDisplayName(uid, displayName);
            setLoading(false);
          })
          .catch((err) => {
            signOut();
            alert("Failed to successfully create user account.", err);
          });
      })
      .catch((error) => {
        alert("Failed to create account, please try again. \n" + error.message);
      });
  };

  const signupDisabled = () => {
    return email && password && confirmPassword && confirmInvalid();
  };

  const emailInvalid = () => {
    if (email && !validEmail(email)) {
      return true;
    }

    return false;
  };

  const passwordInvalid = () => {
    if (password && !passwordValid(password)) {
      return true;
    }

    return false;
  };

  const confirmInvalid = () => {
    if (password && confirmPassword && !(password === confirmPassword)) {
      return true;
    }

    return false;
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <SimpleTextInput
        placeholder="Display Name."
        placeholderTextColor={APP_COLORS.grey}
        inputVal={displayName}
        setInputVal={setDisplayName}
        clearableInput={false}
      />

      <SimpleTextInput
        placeholder="Email."
        placeholderTextColor={APP_COLORS.grey}
        inputVal={email}
        setInputVal={setEmail}
        clearableInput={false}
      />

      <SimpleTextInput
        placeholder="Password."
        placeholderTextColor={APP_COLORS.grey}
        passwordInput={true}
        inputVal={password}
        setInputVal={setPassword}
        clearableInput={false}
      />

      <SimpleTextInput
        placeholder="Confirm Password."
        placeholderTextColor={APP_COLORS.grey}
        passwordInput={true}
        inputVal={confirmPassword}
        setInputVal={setConfirmPassword}
        clearableInput={false}
      />

      <View style={styles.hints}>
        <HelperText
          type="error"
          style={{ display: emailInvalid() ? "flex" : "none" }}
          visible={emailInvalid()}
        >
          Email address is invalid!
        </HelperText>
        <HelperText
          type="error"
          style={{ display: passwordInvalid() ? "flex" : "none" }}
          visible={passwordInvalid()}
        >
          Passwords must be at least 8 characters long and contain:
          {"\n"}
          {"\u2022"}One lowercase letter
          {"\n"}
          {"\u2022"}One uppercase letter
          {"\n"}
          {"\u2022"}One digit
          {"\n"}
          {"\u2022"}One special character.
        </HelperText>
        <HelperText
          type="error"
          style={{ display: confirmInvalid() ? "flex" : "none" }}
          visible={confirmInvalid()}
        >
          Passwords do not match.
        </HelperText>
      </View>

      <TouchableOpacity
        style={signupDisabled() ? styles.loginBtnDisabled : styles.loginBtn}
        onPress={() => {
          attemptAccountCreate();
        }}
        disabled={signupDisabled()}
      >
        <Text style={styles.loginText}>CREATE ACCOUNT</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.createAccount}>
          Already have an account? Login here.
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  hints: {
    textAlign: "center",
    alignItems: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: APP_COLORS.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: APP_COLORS.primary,
    width: "100%",
    height: 45,
    marginBottom: 20,
    alignItems: "center",
  },

  TextInput: {
    width: 250,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 8,
    padding: 10,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: APP_COLORS.secondary,
  },

  loginBtnDisabled: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: APP_COLORS.grey,
  },

  createAccount: {
    color: APP_COLORS.black,
    marginTop: 15,
  },

  loginText: {
    color: APP_COLORS.white,
  },
});
