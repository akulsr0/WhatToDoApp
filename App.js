import {createAppContainer, createStackNavigator} from 'react-navigation';

import Home from './screens/Home'
import NewTask from './screens/NewTask'
import ViewTask from './screens/ViewTask'

const MainNavigator = createStackNavigator(
  {
    Home: {screen: Home, navigationOptions: { title: "WhatToDo" } },
    NewTask: {screen: NewTask, navigationOptions: { title: "NewTask" } },
    ViewTask: {screen: ViewTask, navigationOptions: { title: "View Task"} }
  },
  {
    defaultNavigationOptions: {
      headerTintColor: "#fff",
      headerStyle: {
        backgroundColor: "#3C40C6"
      },
      headerTitleStyle: {
        color: '#fff'
      }
    }
  }
);

const App = createAppContainer(MainNavigator)
export default App;