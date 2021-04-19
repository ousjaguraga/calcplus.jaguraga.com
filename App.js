
import React from "react";
import {
  StyleSheet,
  Button,
  Text,
  View,
  TextInput,
  Keyboard,
  Alert
} from "react-native";
import Header from "./components/header";
import Form from "./components/Form";
import Content from "./components/Content";
import NiceButton from "./components/nice-button";
import calculate2Percent from "./calc-logic-two";
import calculate3Percent from "./calc-logic-three";





export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      isTypeError: false,
      isLimitError: false,
      total: 0,
      agents_prof: 0,
      profits: 0,
      balance: 0
    };
  }
  handleErrors = () => {
    const error = this.state.isTypeError && this.state.isLimitError;
  };




  render() {
    return (
      
      <View style={styles.container}>
        <Header style={styles.header} />
        <Form
          multiline={true}
          style={styles.form}
          placeHolder={this.state.text}
          onChangeText={text => this.setState({ text })}
          value={this.state.text}
        />
        <View style={styles.button_container}>
          <TextInput
            multiline={true}
            style={styles.balanceForm}
            placeHolder={this.state.text}
            onChangeText={balance => this.setState({ balance })}
            value={this.state.balance}
          />
          <NiceButton
            title="2%"
            // Dismiss the keyboard after setting state
            onPress={() => calculate2Percent.bind(this)(Keyboard.dismiss())}
          />
          <NiceButton
            title="3%"
            // Dismiss the keyboard after setting state
            onPress={() => calculate3Percent.bind(this)(Keyboard.dismiss())}
          />
          <NiceButton
            title="Reset"
            onLongPress={() => Keyboard.dismiss()}
            onPress={() => this.setState({ 
              text: "",
              total: 0,
              agents_prof: 0,
              profits: 0,
              balance: 0
            })}
          />
        </View>

        {this.state.balance > 0 ? (
          <Content
            style={styles.content}
            balance={this.state.balance}
            balance_title="Balance From Last Time"

            profits={this.state.profits}

            total={this.state.total}
            total_title="Total No balance No Sending Fees"
            agents_get={this.state.agents_prof}
            cash_to_collect={
              this.state.total + this.state.profits + Number(this.state.balance)
            }
            cash_to_collect_title="Cash to collect"
            cash_to_deliver = {
              this.state.total +
              this.state.profits -
              this.state.agents_prof +
              Number(this.state.balance)
            }
            cash_to_deliver_title="Cash to Deliver (Plus Balance)"
            
          />
        ) : (
          <Content
            style={styles.content}
            profits={this.state.profits}
            total={this.state.total}
            total_title="Total No Sending Fees"
            agents_get={this.state.agents_prof}
            cash_to_collect = {
              this.state.total + this.state.profits
            }
            cash_to_collect_title="Cash to collect"
            cash_to_deliver = {
              this.state.total +
              this.state.profits -
              this.state.agents_prof
            }
            cash_to_deliver_title="Cash to Deliver"
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ED8600",
    flexDirection: "column"
  },
  header: {
    flex: 0.5,
    backgroundColor: "#ED8600",
    marginTop: 40,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  form: {
    backgroundColor: "black",
    flex: 1,
    width: "100%",
    minHeight: "30%",
    fontSize: 27,
    color: "white",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5.16,

    elevation: 10,

  },
  balanceForm: {
    width:90,
    height: 50,
    padding: 12,
    marginTop:10,
    backgroundColor: "black",
    fontSize: 25,
    color: "white"
  },
  button_container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  content: {
    flex: 4
  }
});
