import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import ContactScreen from "../screens/ContactScreen";
import CatalogScreen from "../screens/CatalogScreen";
import PokemonDetailsScreen from "../screens/PokemonDetailsScreen";

const Stack = createStackNavigator();

export default function NavigationStack() {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
        <Stack.Screen name="Catalog" component={CatalogScreen} />
        <Stack.Screen name="Details" component={PokemonDetailsScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
