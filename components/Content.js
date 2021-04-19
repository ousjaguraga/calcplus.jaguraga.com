import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { green } from "ansi-colors";

const Content = props => (
  <View style={props.style}>

    <Text style={{ backgroundColor: "#ED8600", fontSize: 20, color: "white" }}>
      {props.info}
    </Text>
    <Text style={styles.text}>Total: <Text style={styles.currency}>{props.total}</Text></Text>
    <Text style={styles.text}>Cash to deliver: <Text style={styles.currency}>{props.cash_to_deliver}</Text></Text>
    <Text style={styles.text}>Cash to collect: <Text style={styles.currency}>{props.cash_to_collect}</Text></Text>
    <Text style={styles.text}>Agents get: <Text style={styles.currency}>{props.agents_get}</Text></Text>
    <Text style={styles.text}>Profits: <Text style={styles.currency}>{props.profits}</Text></Text>
  </View>
);

const styles = StyleSheet.create({
  text: {
    color: "black",
    flex: 1,
    fontSize: 21,
  },
  currency:{
    color: "green",
    backgroundColor: "black",
  }
});
export default Content;
