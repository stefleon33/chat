import { StyleSheet, View, Text } from 'react-native';
import { useState, useEffect } from 'react';

const ChatScreen = ({ route, navigation }) => {
  const { name, backgroundColor } = route.params;

  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

 return (
   <View 
    style={[
      styles.container,
      { backgroundColor: backgroundColor}
    ]}>
     <Text>Hello Screen2!</Text>
   </View>
 );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default ChatScreen;