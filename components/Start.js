import { useState } from 'react';
import { StyleSheet, View, Text, TextInput, ImageBackground, TouchableOpacity } from 'react-native';

const Screen1 = ({ navigation }) => {
  const [name, setName] = useState('');

  const [backgroundColor, setBackgroundColor] = useState("#090C08");
 return (
   <View style={styles.container}>
    <ImageBackground 
      source={require("../assets/backgroundImage.png")} 
      style={styles.background}
    >
  {/* App name */}
    <Text style={styles.title}>Chatter</Text>

    </ImageBackground>
   </View>
 );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },

 background: {
  flex: 1,
  resizeMode: "cover",
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center', 
 },

 title: {
    flex: 1,
    fontSize: 45,
    fontWeight: 600,
    color: '#FFFFFF',
    margin: 25,
  },

export default Screen1;