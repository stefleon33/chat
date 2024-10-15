import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";

const Chat = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

    useEffect(() => {
    navigation.setOptions({ title: name });

    /* Initial message and system message */
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Start chatting!',
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  /* ensures that the messages remain on the screen, even if the user exits the chat */
  const onSend = (newMessages) => {
   setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
 }

 /* Customizes the message bubbles*/
  const renderBubble = (props) => {
   return <Bubble
     {...props}
     wrapperStyle={{
       right: {
         backgroundColor: "#000"
       },
       left: {
         backgroundColor: "#FFF"
       }
     }}
   />
 }

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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default Chat;