import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import PropTypes from "prop-types";
import NiceButton from "./NiceButton";
import { bold, white } from "ansi-colors";

const getRandomQuote = () => {
  const quotes = [
    "Never give up !",
    "Tomorrow is better !",
    "Believe in YOU !",

    "Mission 50 !",
    "Be your Hero !",
    "Dream Big !",
    "BE the BEST !",
    "GO for PERFECT !"
  ];
  randomIndex = Math.floor(Math.random(0, 1) * quotes.length);
  text = quotes[randomIndex];
  return text;
};

const Header = props => (
  <View style={props.style}>
    <Text style={{ fontSize: 30, color: "black", fontFamily: "Avenir" }}>
      {getRandomQuote()}
    </Text>
  </View>
);

export default Header;
