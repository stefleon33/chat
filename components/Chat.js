import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat } from "react-native-gifted-chat";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";

const Chat = ({ route, navigation, db }) => {
  const { userID, name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

useEffect(() => {
  //fetch messages from the database in real time
  navigation.setOptions({ title: name });
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
  const unsubMessages = onSnapshot(q, (docs) => {
    let newMessages = [];
    docs.forEach(doc => {
      newMessages.push({
        id: doc.id,
        ...doc.data(),
        createdAt: new Date(doc.data().createdAt.toMillis())
     })
   })
   setMessages(newMessages);
 })

 //Clean up code
 return () => {
   if (unsubMessages) unsubMessages();
 }
}, []);

  /* ensures that the messages remain on the screen, even if the user exits the chat */
  const onSend = (newMessages) => {
    addDoc(collection(db, "messages"), newMessages[0])
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