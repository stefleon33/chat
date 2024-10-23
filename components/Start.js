import { useState } from 'react';
import { 
  StyleSheet, 
  View, Text, 
  TextInput, 
  ImageBackground, 
  TouchableOpacity, 
  Platform, Alert, 
  KeyboardAvoidingView 
} from 'react-native';

import { getAuth, signInAnonymously } from "firebase/auth";

const Start = ({ navigation }) => {
  //Initialize Firebase Authentication handler
  const auth = getAuth();
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState("#090C08");
  const colors = ["#090C08", "#474056", "#8A95A5", "#B9C6AE"];

  const logInUser = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate("Chat", {
          userID: result.user.uid, 
          name: name, 
          backgroundColor: backgroundColor 
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  }


 return (
   <View style={styles.container}>
    <ImageBackground 
      source={require("../assets/backgroundImage.png")} 
      style={styles.background}
    >
  {/* App name */}
    <Text style={styles.title}>Chatter</Text>

  {/* Box containing name input, background color selection and start chatting button */}
    <View style={styles.content}>
       {/* Name input */}
      <TextInput
        style={styles.nameInput}
        value={name}
        onChangeText={setName}
        placeholder='Your Name'
      />

      {/* Background color selection */}
      <Text style={styles.chooseBgColor}>Choose Background Color:</Text>
      <View style={styles.colorContainer}>
        {colors.map((color) => (
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Background color options"
            accessibilityHint="Lets you choose your background color."
            accessibilityRole="button"  
            key={color}
              style={[
                styles.colorOption,
                { backgroundColor: color },
                backgroundColor === color && styles.selectedColor,
              ]}
              onPress={() => setBackgroundColor(color)}
          />
        ))}
      </View>

      {/* Start chatting button */}
      <TouchableOpacity 
        style={styles.button}
        accessible={true}
        accessibilityLabel="Start Chatting Button"
        accessibilityHint="Lets you enter the chat room." 
        onPress={() => { 
          if (name == '') {
            Alert.alert('Please put your name!');
          } else {
            logInUser();
          }
        }}
      >
        <Text style={styles.buttonText}>Start Chatting</Text>
      </TouchableOpacity>
    </View>
  {/* Keyboard adjustments */}
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    { Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null}
    </ImageBackground>
   </View>
 );
}

/* Styles for Start screen */
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
    fontWeight: '600',
    color: '#FFFFFF',
    margin: 25,
  },

  content: {
    backgroundColor: 'white',
    borderRadius: 4,
    width: '88%',
    height: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: '20%',
  },

  nameInput: {
    width: "88%",
    borderWidth: 1,
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    margin: 25,
    opacity: 0.5,
    padding: 15,
  },

  chooseBgColor: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
  },

  colorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
  },

  colorOption: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

    selectedColor: {
    borderWidth: 2,
    borderColor: "#757083"
  },

  button: {
    backgroundColor: '#757083',
    width: '88%',
    alignItems: "center",
    justifyContent: "center",
    margin: 25,
    padding: 15,
  },

  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  }
});

export default Start;