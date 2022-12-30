import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import { db } from '../../firebase/config';
import { getUser } from '../../redux/auth/authSelectors';
import { FontAwesome5 } from '@expo/vector-icons';
import { addDoc, collection, doc, onSnapshot } from 'firebase/firestore';

export const CommentsScreen = ({ route }) => {
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);
  const { name } = useSelector(getUser);

  const keyboardHide = () => {
    Keyboard.dismiss();
  };

  const getAllComments = () => {
    onSnapshot(
      collection(doc(collection(db, 'posts'), route.params.postId), 'comments'),
      data => {
        setComments(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      }
    );
  };

  useEffect(() => {
    getAllComments();
  }, []);

  const sendComment = async () => {
    await addDoc(
      collection(doc(collection(db, 'posts'), route.params.postId), 'comments'),
      {
        comment,
        name,
      }
    );
    setComment('');
    keyboardHide();
  };
  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <SafeAreaView style={styles.container}>
        <Image
          source={{ uri: route.params.photo }}
          style={{
            minWidth: 343,
            minHeight: 200,
            borderRadius: 15,
            marginBottom: 8,
            marginTop: 32,
          }}
        />
        <FlatList
          data={comments}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View
              style={
                item.name === name
                  ? { alignItems: 'flex-start' }
                  : { alignItems: 'flex-end' }
              }
            >
              <View style={styles.commentContainer}>
                <Text style={{ color: '#8b0000', fontStyle: 'italic' }}>
                  {item.name}
                </Text>
                <Text style={{ color: '#00008b', fontWeight: 'bold' }}>
                  {item.comment}
                </Text>
              </View>
            </View>
          )}
        />

        <View style={styles.commentBlock}>
          <TextInput
            value={comment}
            placeholder="Comment..."
            placeholderTextColor="#BDBDBD"
            onChangeText={value => setComment(value)}
            style={styles.input}
          />
          <TouchableOpacity style={styles.commentButton} onPress={sendComment}>
            <FontAwesome5
              name="arrow-circle-up"
              size={30}
              color="orange"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    marginHorizontal: 16,
  },
  input: {
    width: 343,
    height: 50,
    padding: 20,
    marginBottom: 0,
    borderWidth: 1,
    backgroundColor: '#F6F6F6',
    borderColor: '#E8E8E8',
    borderRadius: 100,
    marginBottom: 16,
    zIndex: -1,
  },
  commentBlock: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 8,
    marginBottom: 16,
    height: 50,
    backgroundColor: '#F6F6F6',
    border: 1,
    borderColor: '#E8E8E8',
    borderRadius: 100,
  },

  commentButton: {
    position: 'absolute',
    right: 10,
    top: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 34,
    height: 34,
    borderRadius: 50,
  },
  commentContainer: {
    width: 299,
    height: 103,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    borderRadius: 6,
    borderTopLeftRadius: 0,
    marginBottom: 24,
  },
});
