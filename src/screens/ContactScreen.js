import moment from "moment";
import React, { useState } from "react";
import { Platform } from "react-native";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Alert,
} from "react-native";
import Spacer from "../components/Spacer";
import DateTimePicker from "@react-native-community/datetimepicker";

function ContactScreen() {
  const [fieldState, changeFieldState] = useState({
    userName: "",
    userEmail: "",
  });
  const [date, setDate] = useState(new Date());
  const [nameValid, setNameValid] = useState(true);
  const [nameErrDesc, setNameErrDesc] = useState(null);
  const [emailValid, setEmailValid] = useState(true);
  const [emailErrDesc, setEmailErrDesc] = useState(null);

  const { userName, userEmail } = fieldState;

  function onChangeFieldTextValue(fieldName, fieldValue) {
    if (fieldName === "userName") {
      setNameValid(true);
      let errorMessage = "";

      if (fieldValue.length > 0 && !/^[a-zA-Z ]*$/.test(fieldValue)) {
        setNameValid(false);
        setNameErrDesc("Name must contain letters only.");
      }

      changeFieldState((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue,
      }));
      return;
    } else if (fieldName === "userEmail") {
      setEmailValid(true);

      if (
        fieldValue.length > 0 &&
        !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(fieldValue)
      ) {
        setEmailValid(false);
        setEmailErrDesc("Invalid email address.");
      }

      changeFieldState((prevState) => ({
        ...prevState,
        [fieldName]: fieldValue?.toLowerCase(),
      }));
      return;
    }
    changeFieldState((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  }

  function onChangeFieldDateValue(val) {
    setDate(new Date(val));
  }

  function handleSubmit() {
    console.log("Details validation >> ", nameValid, emailValid);
    if (userName.length < 1) {
      setNameValid(false);
      setNameErrDesc("Please enter name.");
    } else if (userEmail.length < 1) {
      setEmailValid(false);
      setEmailErrDesc("Please enter email.");
    } else if (nameValid && emailValid) {
      Alert.alert(
        "Details",
        `${userName}\n\n${userEmail}\n\n${moment(date).format("DD MMM YYYY")}`,
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ]
      );
    }
  }

  return (
    <SafeAreaView style={Styles.container}>
      <View style={Styles.detailsContainer}>
        <Text
          style={{
            fontSize: 20,
            letterSpacing: 1,
          }}
        >
          Get In Touch with Us !
        </Text>

          <Spacer height={30}/>
        <View style={Styles.fieldContainer}>
          <Text>Fullname</Text>
          <TextInput
            style={Styles.input}
            onChangeText={(name) => onChangeFieldTextValue("userName", name)}
            value={userName}
            placeholder="e.g. Justin Bieber"
            maxLength={50}
          />
          {!nameValid && <Text style={Styles.errorStyle}>{nameErrDesc}</Text>}
        </View>

        <View style={Styles.fieldContainer}>
          <Text>Email</Text>
          <TextInput
            style={Styles.input}
            onChangeText={(email) => onChangeFieldTextValue("userEmail", email)}
            value={userEmail}
            placeholder="e.g. justinbieber@yahuu.com"
            keyboardType="email-address"
          />
          {!emailValid && <Text style={Styles.errorStyle}>{emailErrDesc}</Text>}
        </View>

        <View style={Styles.fieldContainer}>
          <Text>Date of Birth</Text>

          <View style={Styles.datePicker}>
            {/* {showDate && ( */}
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              maximumDate={new Date()}
              mode={"date"}
              is24Hour={true}
              onChange={(event, value) => onChangeFieldDateValue(value)}
            />
            {/* )} */}
          </View>
        </View>
      </View>

      <View style={Styles.buttonContainer}>
        <Button style={Styles.button} title="Submit" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
}

export default ContactScreen;

const Styles = StyleSheet.create({
  container: {
    // borderColor: "red",
    // borderWidth: 5,
    flex: 1,
    alignItems: "center",
    marginTop: 30,
    justifyContent: "space-between",
    // justifyContent: "center",
  },
  detailsContainer: {
    // borderColor: "green",
    // borderWidth: 2,
    alignItems: "center",
    width: "100%",
  },
  fieldContainer: {
    paddingTop: 20,
    width: "70%",
    // backgroundColor: "green",
  },
  buttonContainer: {
    // borderColor: "blue",
    // borderWidth: 2,
    // marginBottom: 5,
    alignSelf: "center",
    width: "75%",
  },
  input: {
    height: 40,
    // margin: 8,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    // backgroundColor: "yellow",
  },
  datePicker: {
    justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "red",
  },
  button: {
    borderRadius: 30,
  },
  errorStyle: {
    color: "red",
  },
});
