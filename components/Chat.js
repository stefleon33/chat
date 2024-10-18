import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation, db }) => {
  const { userID, name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

    useEffect(() => {
    navigation.setOptions({ title: name });

  }, []);

  /* ensures that the messages remain on the screen, even if the user exits the chat */
  const onSend = (newMessages) => {
   setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
 }

 /* Customizes the message bubbles*/
  const renderBubble = (props) => {
   return (
   <Bubble
     {...props}
     wrapperStyle={{
       right: {
         backgroundColor: "#A9A9A9"
       },
       left: {
         backgroundColor: "#FFF"
       }
     }}
   />
 );
};

/* Renders background color, messages and keyboard adjustments */
 return (
   <View 
    style={[
      styles.container,
      { backgroundColor: backgroundColor}
    ]}>
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      onSend={messages => onSend(messages)}
      user={{
        _id: 1
      }}
    />
    { Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null }
    { Platform.OS === "ios"?<KeyboardAvoidingView behavior="padding" />: null }
   </View>
   
 );
}

/* Styles for Chat screen */
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Chat;