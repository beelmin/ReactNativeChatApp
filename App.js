import * as React from 'react';
import { Text, TextInput, ScrollView } from 'react-native';
import { createAppContainer, createStackNavigator} from 'react-navigation';


import LoginScreen from './components/Login';
import HomeScreen from './components/Home';
import ChatScreen from './components/Chat';
import MessageScreen from './components/Message';



const AppNavigator = createStackNavigator ({
  LoginScreen: { screen: LoginScreen },
  HomeScreen: { screen: HomeScreen },
  ChatScreen: { screen: ChatScreen },
  MessageScreen: { screen: MessageScreen },
});

const AppContainer = createAppContainer(AppNavigator);


export default class App extends React.Component {

  render() {
    return( 
      <AppContainer/>
    );
  }
}







