import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();

  function handleOnPress() {
    navigation.navigate("Contact");
  }

  return (
    <SafeAreaView style={Styles.container}>
      <Text>Welcome to Main Screen</Text>
      <Button
        style={Styles.buttonStyle}
        color="red"
        title="Contact Us"
        onPress={handleOnPress}
      />
    </SafeAreaView>
  );
}

export default HomeScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonStyle: {
    backgroundColor: "grey",
  },
});
