import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { APP_COLORS } from "../Helpers/colors";

export default function SimpleTextInput({
  inputVal,
  setInputVal,
  placeholder,
  clearableInput,
  passwordInput,
  multiline,
  lightMode,
  style,
  helperText,
}) {
  const [tmpVal, setTmpVal] = useState();

  const clearInput = () => {
    setTmpVal(inputVal);
    setInputVal("");
  };

  const restoreInput = () => {
    if (!inputVal || inputVal.length === 0) {
      setInputVal(tmpVal);
      setTmpVal("");
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row", margin: 4 }}>
        <TextInput
          style={
            style
              ? style
              : !lightMode
              ? styles.textInput
              : styles.textInputLight
          }
          secureTextEntry={passwordInput}
          placeholder={placeholder}
          placeholderTextColor="grey"
          value={inputVal}
          multiline={multiline}
          onChangeText={(val) => {
            setInputVal(val);
          }}
          onBlur={() => {
            restoreInput(tmpVal);
          }}
        />
        {clearableInput ? (
          <Pressable
            onPress={() => {
              clearInput();
            }}
            style={styles.clearBtn}
          >
            <MaterialIcons name="clear" size={24} color={APP_COLORS.white} />
          </Pressable>
        ) : (
          <></>
        )}
      </View>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
}

SimpleTextInput.defaultProps = {
  clearableInput: true,
  multiline: false,
  lightMode: true,
};

const styles = StyleSheet.create({
  helperText: {
    fontSize: 12,
    color: APP_COLORS.red,
    textAlign: "center",
  },
  textInput: {
    backgroundColor: APP_COLORS.primary,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    color: APP_COLORS.white,
    borderBottomColor: APP_COLORS.white,
    borderBottomWidth: 1,
    height: 35,
  },

  textInputLight: {
    backgroundColor: APP_COLORS.primary,
    width: "90%",
    marginLeft: "5%",
    marginRight: "5%",
    color: APP_COLORS.black,
    borderBottomColor: APP_COLORS.black,
    borderBottomWidth: 1,
    height: 35,
  },

  clearBtn: {
    position: "absolute",
    right: "5%",
    top: 4,
  },
});
