import React from "react";
import { View, StyleSheet, Button, Text, TextInput } from "react-native";
import { Constants } from "expo";
import NiceButton from "./NiceButton";

class Form extends React.Component {
  render() {
    return (
      <View style={this.props.style}>
        <TextInput
          style={this.props.style}
          numberOfLines={this.props.numberOfLines}
          multiline={this.props.multiline}
          onSubmitEditing={this.props.onSubmitEditing}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}

export default Form;
