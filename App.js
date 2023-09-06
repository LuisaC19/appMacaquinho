import * as React from 'react'; 
import { Text, View, StyleSheet, TextInput, TouchableOpacity,Image, Alert } from 'react-native'; 
import { Header } from 'react-native-elements'; 
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from "./localDB";
import PhonicSoundButton from "./components/PhonicSoundButton";


export default class App extends React.Component {
  constructor(){
    super();
    this.state={text:"",chunks:[], phones:[]}
  }
  componentDidUpdate(){
    console.log(this.state.displayText)
  }
  render() {
    return (
      <SafeAreaProvider>
      <View style={styles.container}>
      <Header backgroundColor={'#483d8b'}
              centerComponent={{
                text:'App do Macaquinho',
                style:{color:'#DB7093',
                       fontSize:20}
              }}/>
      <Image style={styles.image}
                    source={{uri:"https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png"}}/>
      <TextInput style={styles.inputBox}
                 onChangeText={(text)=>{
                   this.setState({text:text})
                 }}
                 value={this.state.text}/>
      <TouchableOpacity style={styles.button}
                        onPress={()=>{
                          var word = this.state.text.toLocaleLowerCase().trim();
                          db[word] ? (
                          this.setState({chunks:db[word]["chunks"],phones:db[word]["phones"]})) 
                          :alert("essa palavra não está disponível")
                        console.log("esta passando")
                        }}>
        <Text style={styles.buttonText}>Pesquisar</Text>
      </TouchableOpacity>
      <View>
        {this.state.chunks.map((syllable,index)=>{
          return(
             <PhonicSoundButton
             wordChunk={this.state.chunks[index]}
             soundChunk={this.state.phones[index]}
             indexChunk={index}/>
          )
        })}
      </View>
      </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
 container: {
    flex: 1,
    backgroundColor: '#b8b8b8',
  },
 inputBox: {
    marginTop:200,
    width:'50%',
    alignSelf:'center',
    textAlign: 'center',
    height:30,
    borderWidth:3
  },
  button: {
    width:'35%',
    height:30,
    alignSelf:'center',
    padding:6,
    margin:6
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight:'bold'
  },
  image:{
    width: 93,
    height: 93,
    marginLeft: 115
  }
});
