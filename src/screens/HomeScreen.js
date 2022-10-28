import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Button } from "react-native";
import Spacer from "../components/Spacer";
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
  const navigation = useNavigation();

  function handleContactOnPress() {
    navigation.navigate("Contact");
  }

  function handleCatalogOnPress() {
    navigation.navigate("Catalog");
  }

  return (
    <SafeAreaView style={Styles.container}>
      <Text
        style={{
          fontSize: 25,
          letterSpacing: 1,
          // textShadowColor: "grey",
          // textShadowOffset: { width: -1, height: 1 },
          // textShadowRadius: 10,
        }}
      >
        Welcome to Main Screen
      </Text>
      <View style={Styles.buttonContainer}>
        <Button
          style={Styles.buttonStyle}
          color="red"
          title="Contact Us"
          onPress={handleContactOnPress}
        />
        <Spacer height={15} />
        <Button
          style={Styles.buttonStyle}
          title="View Catalog"
          onPress={handleCatalogOnPress}
        />
      </View>
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
  buttonContainer: {
    padding: 80,
  },
  buttonStyle: {
    backgroundColor: "grey",
  },
});
