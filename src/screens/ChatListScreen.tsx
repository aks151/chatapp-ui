// src/screens/ChatListScreen.js
import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, Touchable, TouchableOpacity, Image, FlatList } from 'react-native';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import api from '../api/axios.js';
// import { Axios } from 'axios';
import dummyChats from '../data/dummy-chats.json';

const ChatListScreen = ({navigation}) => {
  const { user, logout, token1 } = useContext(AuthContext);
  const obj1 = useContext(AuthContext);
  const [text, setText] = useState('');
  const [chats, setChats] = useState(dummyChats);
  const loggedInUserId = 'user_me_123';



  // const handleChat = async () => {
  //   if (text) {
  //       console.log('ChatListScreen.js obj1: ', obj1);
  //       console.log('ChatListScreen.js , user: ', user, ' logout: ', logout, ' token:', token1);
  //       console.log('ChatListScreen.js user._id: ', user._id);
  //       const token_temp = user.token;
  //       const id = user._id;  
  //     try {
  //       console.log('Sending message:', text);
  //       const config = {
  //           headers: {
  //               Authorization: `Bearer ${token_temp}`,
  //           }
  //       }
  //       const body = {
  //           userid: id,
  //         }
  //       await api.post('/api/chats', body, config);
  //     } catch (error) {
  //       console.error('Error sending message:', error);
  //       if (error.response) {
  //           // The request was made and the server responded with a status code
  //           // that falls out of the range of 2xx
  //           console.error('Data:', error.response.data);
  //           console.error('Status:', error.response.status);
  //           console.error('Headers:', error.response.headers);
  //         } else if (error.request) {
  //           // The request was made but no response was received
  //           // `error.request` is an instance of XMLHttpRequest in the browser
  //           console.error('Request:', error.request);
  //           console.error('This usually means a network error (CORS, server down, etc.).');
  //         } else {
  //           // Something happened in setting up the request that triggered an Error
  //           console.error('Error Message:', error.message);
  //         }
          
  //         // Also log the config that was sent
  //         console.error('Request Config:', error.config);
  //     } finally {
  //       setText('');
  //     }
  //   }
  // }
  // return (
  //   <View style={styles.container}>
  //     <Text>Welcome, {user?.name}!</Text>

  //     <Text>You are logged in.</Text>

  //     <TextInput
  //     style={styles.input}
  //     value={text}
  //     onChangeText={setText}
  //     placeholder='Type your message here...'
  //     />

  //     <Button title='Send' onPress={handleChat}/>
  //     <Button title="Logout" onPress={logout} />
  //   </View>
  // );


  const getChatDetails = (chatUsers) => {
    const otherUser = chatUsers.find((u) => u._id !== loggedInUserId);
    return otherUser || { name: 'Unknown User', pic: 'default_pic_url' };
  };

  const renderChatItem = ({item}) => {
    const isGroup = item.isGroupChat;
    const chatName = isGroup ? item.chatName : getChatDetails(item.users).name;

    return (
      <TouchableOpacity
      style={styles.chatItem}
        onPress={() => navigation.navigate('ChatScreen', { 
          chatId: item._id, 
          chatName: chatName 
        })}

      >
        <Image 
          source={{ uri: 'https://i.pravatar.cc/50' }} 
          style={styles.avatar} 
        />

        <View style={styles.chatTextContainer}>
          <Text style={styles.chatName}>{chatName}</Text>
          {item.latestMessage ? (
            <Text style={styles.latestMessage} numberOfLines={1}>
              <Text style={styles.senderName}>{item.latestMessage.sender.name}: </Text>
              {item.latestMessage.content}
            </Text>
          ) : (
            <Text style={styles.latestMessage}>No messages yet</Text>
          )}
        </View>
      </TouchableOpacity>
    )

  }


 return (
  <View style={styles.container}>
  <FlatList
    data={chats}
    renderItem={renderChatItem}
    keyExtrator={(item) => item._id}
  />
  <Button title="Logout" onPress={logout} />
</View>
 )
};


// const styles = StyleSheet.create({
//     input: {
//         height: 40,
//         borderColor: 'gray',
//         borderWidth: 1,
//         marginBottom: 12,
//         paddingHorizontal: 8,
//     }, 
//     container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#666' },

// })

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  chatTextContainer: {
    flex: 1, // Allows text to truncate correctly
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  latestMessage: {
    fontSize: 14,
    color: '#666',
  },
  senderName: {
    fontWeight: '600',
    color: '#333',
  },
});

export default ChatListScreen;