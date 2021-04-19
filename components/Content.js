import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { green } from "ansi-colors";

const Content = props => (
  <View style={props.style}>
    <Text style={{ backgroundColor: "gray", fontSize: 20, color: "white" }}>
      {props.info}
    </Text>
    <Text style={styles.text}>Total: {props.total}</Text>
    <Text style={styles.text}>Cash to deliver: {props.cash_to_deliver}</Text>
    <Text style={styles.text}>Cash to collect: {props.cash_to_collect}</Text>
    <Text style={styles.text}>Agents get: {props.agents_get}</Text>
    <Text style={styles.text}>Profits: {props.profits}</Text>
  </View>
);

const styles = StyleSheet.create({
  text: {
    color: "black",
    flex: 1,
    fontSize: 21
  }
});
export default Content;
