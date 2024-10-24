// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import firestore conenction
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { LogBox, Alert } from 'react-native';

import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";


LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  //Defines a new state that represeents the netwrok connectivity status
  const connectionStatus = useNetInfo();
    useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBAps1G5dy9iCI8ViiTc3M_MntZVzu0eY0",
    authDomain: "chat-9906f.firebaseapp.com",
    projectId: "chat-9906f",
    storageBucket: "chat-9906f.appspot.com",
    messagingSenderId: "687734823098",
    appId: "1:687734823098:web:870909fa04ae88e33cca83"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Initialize Firebase Storage handler
  const storage = getStorage(app);
 


  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
          >
         {props => <Chat 
            isConnected={connectionStatus.isConnected} 
            db={db} 
            storage={storage}
            {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;