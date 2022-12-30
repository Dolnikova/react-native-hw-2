import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    // width: '100%',
  },
  input: {
    width: 343,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 16,
  },
  inputFocus: {
    width: 343,
    height: 50,
    padding: 10,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: 'rgba(255, 108, 0, 1)',
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 15,
  },
  p: {
    marginBottom: 32,
    paddingVertical: 8,
    textAlign: 'center',
    fontSize: 30,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ecf0f1',
    padding: 20,
  },
  loginButton: {
    width: '10%',
    position: 'absolute',
    left: 300,
    top: 175,
  },
});
