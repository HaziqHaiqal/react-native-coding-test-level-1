import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useGetPokemonsQuery } from "../redux/pokeApi";

function CatalogScreen() {
  const navigation = useNavigation();
  const [index, setIndex] = useState(null);
  const [offset, setOffset] = useState(0);
  const { data, isSuccess, isLoading, isError, isFetching } =
    useGetPokemonsQuery(offset);

  function handleOnPressView(pokeName, pokeUrl) {
    console.log("[handleOnPressView] >> transferParams => ", pokeName, pokeUrl);
    navigation.navigate("Details", {
      pokeName,
      pokeUrl,
    });
  }

  return (
    <React.Fragment>
      <ScrollView
        style={Styles.container}
        contentContainerStyle={Styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        {isLoading || (isFetching && <Text>Loading...</Text>)}
        {isSuccess &&
          !(isLoading || isFetching) &&
          data.results.map((poke) => (
            <View style={Styles.pokemonCard}>
              <Text style={Styles.pokemonTitle}>{poke.name}</Text>
              <View style={Styles.btnCard}>
                <Button
                  color={"#FFFFFF"}
                  title="View"
                  onPress={() => handleOnPressView(poke.name, poke.url)}
                />
              </View>
            </View>
          ))}
      </ScrollView>

      <View style={Styles.buttonContainer}>
        {isSuccess && data.next && (
          <View style={{ flexDirection: "row-reverse" }}>
            <View style={Styles.btnRightContainer}>
              <Button title=">>" onPress={() => setOffset(offset + 10)} />
            </View>
            {isSuccess && data.previous && (
              <View style={Styles.btnLeftContainer}>
                <Button title="<<" onPress={() => setOffset(offset - 10)} />
              </View>
            )}
          </View>
        )}
      </View>
    </React.Fragment>
  );
}

export default CatalogScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
  },
  contentContainerStyle: {
    // alignItems: "center",
    alignSelf: "center",
    paddingTop: 20,
    width: "80%",
    // flex: 1,
    // justifyContent: "flex-start",
    // backgroundColor: "yellow",
  },
  pokemonCard: {
    paddingTop: 65,
    marginBottom: 30,
    height: 200,
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "black",
    borderRadius: 12,
    backgroundColor: "#E7E3D7",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  btnCard: {
    height: 50,
    width: "100%",
    justifyContent: "center",
    borderBottomRightRadius: 12,
    borderBottomLeftRadius: 12,
    backgroundColor: "#696969",
  },
  pokemonTitle: {
    // color: "red",
    textTransform: "capitalize",
    fontSize: 20,
  },
  buttonContainer: {
    // flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 24,
    marginBottom: 20,
    position: "relative",
  },
  btnLeftContainer: {
    width: "45%",
    margin: 10,
    // backgroundColor: "red",
  },
  btnRightContainer: {
    width: "45%",
    margin: 10,
    // backgroundColor: "blue",
  },
});
