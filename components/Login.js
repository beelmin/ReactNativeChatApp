import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    TextInput,
    Button
} from 'react-native';
import { Constants, Location, Permissions } from 'expo';



export default class LoginScreen extends Component {

  constructor(props){
    super(props);
  }

state = {
    locationResult: null,
    location: { coords: { latitude: 0, longitude: 0 } },
    user: '',
    password:'',
    isFinished: false
  };

  componentDidMount() {
    this._getLocationAsync();
  }

  
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status != 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location });
    this.setState({isFinished:true});
    
  };

  _updateUser = async() => {

    let response = await fetch('https://react-native-app2.herokuapp.com/', {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          username: this.state.user,
                          password: this.state.password,
                          coordinate: true,
                          latitude: this.state.location.coords.latitude,
                          longitude: this.state.location.coords.longitude
                                     
                        }),
                      });
                      
                      let responseJson = await response.json();
                      if(responseJson.success){
                        this.props.navigation.navigate('HomeScreen',{ user: this.state.user});
                      }else{
                        alert("dogodila se greska");
                      }

  }

  _sendInfo = async () => {
          
          let response = await fetch('https://react-native-app2.herokuapp.com/', {
                        method: 'POST',
                        headers: {
                          Accept: 'application/json',
                          'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                          username: this.state.user,
                          password: this.state.password,
                          authentication: true            
                        }),
                      });
                      
                      let responseJson = await response.json();
                      
                      if(responseJson['success']){

                        this._updateUser()
                       

                      }else{
                        alert('pogresan username ili password');   
                      }    
    
  }
        
    

    render() {
        return (
            <ScrollView>
                <Text>Login</Text>
                <TextInput placeholder='Username' onChangeText = { (name) => this.setState({user: name})} />
                <TextInput placeholder='Password' onChangeText = { (pass) => this.setState({password: pass})}/>

                { this.state.isFinished && <Button 
                      onPress={ () => { 
                        
                        this._sendInfo() } }
                      title="Potvrdi"
                        />                                                                                              
                }

            </ScrollView>
                );            
                      
                }
            
    }
