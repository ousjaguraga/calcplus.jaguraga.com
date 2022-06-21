import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const NiceButton = props => (
  <View>
    <TouchableOpacity
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      disabled={props.disabled}
      style={styles.container}
    >
      <Text style={styles.button}>{props.title}</Text>
    </TouchableOpacity>
  </View>
);

NiceButton.propTypes = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "black",
   borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    color: "#4c74c9",
    fontSize: 23,
    
    fontWeight: "bold",
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
    width: 90
  }, container: {
    marginTop: 10,
    shadowColor: "#FFF",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    
    elevation: 12,
  }
});
export default NiceButton;
