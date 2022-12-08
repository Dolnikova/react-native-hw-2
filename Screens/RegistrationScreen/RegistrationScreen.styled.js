import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ecf0f1",
    width: "100%",
    // height: 549,
  },
  input: {
    width: 343,
    height: 50,
    padding: 10,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 16,
  },
  inputFocus: {
    width: 343,
    height: 50,
    padding: 10,
    borderWidth: 1,
    marginBottom: 16,
    borderColor: "rgba(255, 108, 0, 1)",
  },
  title: {
    marginTop: 16,
    paddingVertical: 8,
    textAlign: "center",
    fontSize: 15,
  },
  p: {
    marginBottom: 32,
    paddingVertical: 8,
    textAlign: "center",
    // color: "#212121",
    color: "#red",
    fontSize: 30,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
});
