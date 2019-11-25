import React, { Component } from 'react';
import { Constants, MapView, Location, Permissions } from 'expo';
// dodo sam ovo
import { FlatList, ActivityIndicator, Text, View,Button, TextInput, ScrollView, TouchableHighlight } from 'react-native';


export default class Map extends Component {


  constructor(props) {
    super(props);
  }

  
  state = {
    arrayOfMarkers : [],
    isFinished: false,
    isClicked: false
  };

  componentDidMount() {

    this._getUsersLocation();
    
  }


  _getUsersLocation = () => {

      fetch('https://react-native-app2.herokuapp.com')
      .then((response) => response.json())
      .then((responseJson) => {

          this.setState({arrayOfMarkers:[]});
          for(var i = 0; i < responseJson.users.length; i++) {
            this.state.arrayOfMarkers.push(responseJson.users[i]);
          }

          this.setState({isFinished:true}); 
        
      })
      .catch((error) =>{
        console.error(error);
      });
      
    
    
  }

  renderMarkers() {
    
    var markers = [];
    for(var i = 0; i < this.state.arrayOfMarkers.length; i++) {
      var item = this.state.arrayOfMarkers[i];
      var name = item['user'];
      markers.push(
        <MapView.Marker title = {name} coordinate = {{latitude: item['latitude'], longitude: item['longitude']}} /> 
      )

    }
    return markers;
  }


  render() {

    
    return (

      <ScrollView >
        
        <MapView
          style={{ height: 200 }}
          region={{ latitude: 43.8486400, longitude: 18.3564400, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
        >
    
        {this.state.isFinished && this.renderMarkers()}
        
        </MapView>

        <Button 
        onPress = { () => {
          this._getUsersLocation();
          this.renderMarkers();
          
        }}
        title = "REFRESH MAP"
        
        />

        <Button 
        onPress = { () => {
          this.setState({isClicked : true})
          
        }}
        title = "Show users"
        
        />

        { this.state.isClicked && <FlatList
          data={this.state.arrayOfMarkers}
          renderItem={({item}) => <Text>{item['user']}</Text> }
        /> }

      

    </ScrollView>

    );
   
}

}
