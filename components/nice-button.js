import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";

const NiceButton = props => (
  <View>
    <TouchableOpacity
      onPress={props.onPress}
      onLongPress={props.onLongPress}
      disabled={props.disabled}
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
    backgroundColor: "blue",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 12,
    color: "white",
    fontSize: 23,
    fontWeight: "bold",
    overflow: "hidden",
    padding: 12,
    textAlign: "center",
    width: 90
  }
});
export default NiceButton;
