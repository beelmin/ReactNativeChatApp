import * as React from 'react';
import { Text, TextInput, ScrollView, View, FlatList, StyleSheet, Button } from 'react-native';



export default class App extends React.Component {

  state = {
    isReadyMessages: false,
    arrayOfMessages: [],
    currentUser : this.props.navigation.state.params.currentUser,
    message: null 
  };

  _renderItem = ({item}) => {
        if(item.sender == this.state.currentUser){
           return <Text style={{textAlign: 'right'}} > {item.sender} : {item.message} </Text>
         }else{
            return <Text> {item.sender} : {item.message} </Text> 
         }

 };

 getMessages(){

   fetch('https://react-native-app2.herokuapp.com/chat')
          .then((response) => response.json())
          .then((responseJson) => {

            this.setState({arrayOfMessages : responseJson.conversations});
            this.setState({isReadyMessages:true});
      })
      .catch((error) =>{
        console.error(error);
      });

 }


  render() {

    return(
      <ScrollView>
      
        <Text style={{textAlign: 'center'}} > Poruke </Text>

        { this.state.isReadyMessages && <FlatList
          data={this.state.arrayOfMessages}
          renderItem={this._renderItem}
                    
        />  
          
      }

      <Button 
        onPress = { () => {
           this.getMessages()  
        }}
        title = "SHOW MESSAGES"
        />




        <Button 
        onPress = { () => {
           this.props.navigation.navigate('MessageScreen', {currentUser: this.state.currentUser})   
        }}
        title = "SEND MESSAGE"
        />
      
      </ScrollView>
    );
    
    
  }
  
}