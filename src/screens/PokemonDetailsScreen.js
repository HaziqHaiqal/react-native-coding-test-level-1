import React, { useState } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

import { useGetPokemonByNameQuery } from "../redux/pokeApi";
import { info } from "webpack-dev-server/lib/utils/colors";

function PokemonDetailsScreen() {
  const route = useRoute();
  const { pokeName, pokeUrl } = route?.params;
  const { data, isSuccess, isLoading, error, isFetching } =
    useGetPokemonByNameQuery(pokeName);
  const [pokemonDetails, setPokemonDetails] = useState("");

  function generatePokemonDetails() {
    // if (isSuccess && !(isLoading || isFetching)) {
    const base_experiences = data?.base_experience;
    const forms = data?.forms[0]?.name;
    const height = data?.height;
    const abilities = data?.abilities.map((poke, index) => {
      return poke?.ability?.name;
    });
    const held_items = data?.held_items[0]?.item?.name;
    // let versionDetails = "";
    // if (data?.held_items.length !== 0) {
    const versionDetails = data?.held_items[0]?.version_details.map((poke) => {
      return poke?.version?.name;
    });
    // } else {
    //   versionDetails = null;
    // }
    const moves = data?.moves.map((poke, index) => {
      return poke?.move?.name.replace(/\. /g, "\n");
    });
    const species = data?.species?.name;
    const stats = data?.stats.map((poke) => {
      return `${poke?.stat?.name}: ${poke?.base_stat}`;
    });
    const types = data?.types[0]?.type?.name;
    const weight = data?.weight;

    return [
      { label: "Base experiences", value: base_experiences },
      { label: "Forms", value: forms },
      { label: "Height", value: height },
      { label: "Weight", value: weight },
      {
        label: "Abilities",
        value: abilities !== undefined ? abilities.join().replace(/,/g, '\n') : "-",
      },
      { label: "Held-items", value: held_items ?? "-" },
      {
        label: "Held-items (version)",
        value: versionDetails !== undefined ? versionDetails.join().replace(/,/g, '\n') : "-",
      },
      { label: "Moves", value: moves !== undefined ? moves.join().replace(/,/g, '\n') : "-" },
      { label: "Species", value: species },
      { label: "Stats", value: stats !== undefined ? stats.join().replace(/,/g, '\n') : "-" },
      { label: "Types", value: types },
    ];
    // }
  }

  function renderDetails() {
    const infoList = generatePokemonDetails();
    console.log("infoList >> ", infoList);

    // if (isLoading || isFetching) {
    //   <Text>Loading...</Text>;
    // } else if (isSuccess && !(isLoading || isFetching)) {
    return (
      infoList
        // .filter((filterInfo) => {
        //   console.log("filterInfo.value >> ", filterInfo.value);
        //   return filterInfo.value;
        // })
        .map((info, i) => {
          console.log("info-label >> ", info.label);
          console.log("info-value >> ", info.value);

          return (
            <View
              key={`containerDetailsInfo-${i}`}
              style={Styles.rowListContainer}
            >
              <View style={Styles.rowListItemLeftContainer}>
                <Text
                  style={{
                    fontSize: 14,
                    lineHeight: 19,
                    textAlign: "left",
                  }}
                >
                  {info.label}
                </Text>
              </View>
              <View style={Styles.rowListItemRightContainer}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    lineHeight: 18,
                    textAlign: "right",
                  }}
                >
                  {info.value}
                </Text>
              </View>
            </View>
          );
        })
    );
    // }
  }
  console.log("renderDetails >> ", renderDetails());

  return (
    <React.Fragment>
      <ScrollView
        contentContainerStyle={Styles.contentContainerStyle}
        showsVerticalScrollIndicator={false}
      >
        <View style={Styles.container}>
          <Text
            style={{
              textTransform: "uppercase",
              fontSize: 20,
              letterSpacing: 3,
            }}
          >
            {pokeName}
          </Text>
          {isLoading || (isFetching && <Text>Loading...</Text>)}
          {isSuccess && !(isLoading || isFetching) && (
            <View style={Styles.formBodyContainer}>{renderDetails()}</View>
          )}
        </View>
      </ScrollView>
    </React.Fragment>
  );
}

export default PokemonDetailsScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // paddingEnd: 35,
    // paddingStart: 35,
  },
  contentContainerStyle: {
    // alignItems: "center",
    alignSelf: "center",
    paddingTop: 20,
    width: "80%",
    // flex: 1,
    // justifyContent: "flex-start",
  },
  formBodyContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 26,
    paddingBottom: 90,
    width: "100%",
    height: "100%",
    // backgroundColor: "yellow",
  },
  rowListContainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: 20,
  },
  rowListItemLeftContainer: {
    flex: 0.5,
    // backgroundColor: "blue",
  },
  rowListItemRightContainer: {
    flex: 0.5,
    alignItems: "flex-end",
    alignContent: "flex-end",
    // backgroundColor: "red",
  },
  textItemLeftRow: {
    fontSize: 14,
    lineHeight: 19,
    textAlign: "left",
  },
  textItemRightRow: {
    fontSize: 14,
    lineHeight: 19,
    textAlign: "left",
  },
});
