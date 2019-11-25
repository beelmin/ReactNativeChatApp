import * as React from 'react';
import { Text, TextInput, ScrollView, View, FlatList, StyleSheet, Button } from 'react-native';



export default class App extends React.Component {

  state = {
    currentUser : this.props.navigation.state.params.currentUser,
    message: null 
  };


  render() {

    


    return(
      <ScrollView>
      
        <Text style={{textAlign: 'center'}} > Poruka </Text>
      
        <TextInput placeholder='Text' onChangeText = { (mess) => this.setState({message: mess})} />
        <Button 
        onPress = { () => {
          fetch('https://react-native-app2.herokuapp.com/chat', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            
            sender: this.state.currentUser,
            message: this.state.message
            
          }),
        });

        this.props.navigation.navigate('ChatScreen', {currentUser: this.state.currentUser}) 

        }}

        title = "Send message"
        />
      
      </ScrollView>
    );
    
    
  }
  
}