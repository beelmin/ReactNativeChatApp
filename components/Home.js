import React, { Component } from 'react';
import { ScrollView, Text, View, Button, ActivityIndicator } from 'react-native';
import MapView from 'react-native-maps';
import { Constants, Location, Permissions } from 'expo';

import Map from './Map';

export default class HomeScreen extends Component {

  constructor(props){
    super(props);
  }
  

  render() {
    
    return (
      <View>
        
        <Map/>

        <Button 
        onPress = { () => {
           this.props.navigation.navigate('ChatScreen', {currentUser: this.props.navigation.state.params.user})   
        }}
        title = "CHAT"
        />
        
      </View>
      
    );
   
  }
}
