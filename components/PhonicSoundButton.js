import * as React from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity,Image } from 'react-native'; 
import { Audio } from 'expo-av';

export default class PhonicSoundButton extends React.Component {
  constructor(){
    super();
    this.state= {
      pressedButton:""
    }
  };
  playSound = async (soundChunk) => 
  { var soundLink ='https://s3-whitehatjrcontent.whjr.online/phones/'
+ soundChunk + '.mp3'; 
    await Audio.Sound.createAsync({uri:soundLink}, {shouldPlay: true});
  };
  render(){
    return(
     <TouchableOpacity 
        style={this.state.pressedButton === this.props.indexChunk ?
                [styles.chunkButton,{backgroundColor: 'white'}]
                :[styles.chunkButton,{backgroundColor: 'blue'}]}
        onPress={()=>{
          console.log(this.props.indexChunk);
          this.setState({pressedButton:this.props.indexChunk});
          this.playSound(this.props.soundChunk);
          console.log(this.state);
        }} 
     >
     <Text style={this.state.pressedButton === this.props.indexChunk ? 
     [styles.displayText,{color:'black'}]:
     [styles.displayText,{color:'red'}]}
     >{this.props.wordChunk}</Text>
    
     </TouchableOpacity>
     
    )
  }
}
const styles = StyleSheet.create({
  displayText:{
    textAlign: 'center',
    fontSize:23
  },
  chunkButton:{
    width:'35%',
    height:30,
    alignSelf:'center',
    margin:6,
    justifyContent:'center',
    alignItems:'center',
    borderRadius: 4
  }
});
