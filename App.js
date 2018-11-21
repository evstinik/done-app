import React from 'react';
import { StyleSheet, Text, View, AppRegistry } from 'react-native';
import HomeScreen from './src/HomeScreen.js';
import DayDetail from './src/DayDetailScreen.js';
import { createStackNavigator, createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  DayDetail: { screen: DayDetail }
}, {
    initialRouteName: 'Home'
  })
const App = createAppContainer(MainNavigator)

export default App;