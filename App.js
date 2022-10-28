import { NavigationContainer } from "@react-navigation/native";
import NavigationStack from "./src/routes/NavigationStack";
import 'react-native-gesture-handler';

import { Provider } from 'react-redux'
import { store } from './src/redux/store'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <NavigationStack />
      </NavigationContainer>
    </Provider>
  );
}
