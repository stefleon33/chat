import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from "react-native-gifted-chat";
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomActions from './CustomActions';

const Chat = ({ route, navigation, db, isConnected }) => {
  const { userID, name, backgroundColor } = route.params;
  const [messages, setMessages] = useState([]);

  let unsubMessages;

  useEffect(() => {
    //fetch messages from the database in real time
    navigation.setOptions({ title: name });

    if (isConnected === true) {

      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;
  const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));
    unsubMessages = onSnapshot(q, (documentsSnapshot) => {
      let newMessages = [];
      documentsSnapshot.forEach(doc => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis())
      })
    });
    cacheMessages(newMessages);
    setMessages(newMessages);
  });
  } else loadCachedMessages();

 //Clean up code
 return () => {
   if (unsubMessages) unsubMessages();
 }
}, [isConnected]);

  
  const cacheMessages = async (messagesToCache) => {
    try { 
      await AsyncStorage.setItem("messages", JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  }

  const loadCachedMessages = async () => {
    const cachedMessages = await AsyncStorage.getItem("messages") || [];
    setMessages(JSON.parse(cachedMessages));
  }

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

const renderInputToolbar = (props) => {
 if (isConnected) return <InputToolbar {...props} />;
 else return null;
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
      renderInputToolbar={renderInputToolbar}
      onSend={messages => onSend(messages)}
      user={{
        _id: userID,
        name: name,
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