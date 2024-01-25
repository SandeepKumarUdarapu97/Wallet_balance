import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import UserScreen from "./src/screens/UserScreen";

const App = () => {
  return (
    <Provider store={store}>
      <View style={styles.mainContainer}>
        <StatusBar backgroundColor={'white'}/>
        <UserScreen />
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default App;
