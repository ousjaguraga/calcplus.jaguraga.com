import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  TouchableOpacity,
  Image,
  Modal,
  Share
} from "react-native";
import Header from "./components/header";
import Form from "./components/Form";
import Content from "./components/Content";
import NiceButton from "./components/nice-button";
import ViewShot from "react-native-view-shot";
import * as MediaLibrary from "expo-media-library";
import * as ImageManipulator from "expo-image-manipulator";
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';



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
      balance: 0,
      imageUri: null,
      showImageShare: false,
      showModal: false,
    };
  }
  handleErrors = () => {
    const error = this.state.isTypeError && this.state.isLimitError;
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  hasPermissions = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === "granted";
  };

  takeScreenshot = async () => {
    if (await this.hasPermissions()) {
      console.log('Screenshot taken')
      const result = await this.viewShotRef.capture();
      const croppedImage = await this.cropImage(result);
      const asset = await MediaLibrary.createAssetAsync(croppedImage.uri);
      this.setState({ imageUri: asset.uri });
      

      const localUri = await MediaLibrary.getAssetInfoAsync(asset);
      this.setState({ imageUri: localUri.localUri, showModal: true });


    } else {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  // crop the image to not include profits
  cropImage = async (imgURI) => {
    const cropArea = {
      originX: 0,
      originY: 250,
      width: 1250,
      height: 1900
    };
    const manipulatedImage = await ImageManipulator.manipulateAsync(
      imgURI,
      [
        {
          crop: cropArea,
        },
      ],
      { compress: 1, format: ImageManipulator.SaveFormat.PNG }
    );

    return manipulatedImage;
  };
 
  getImageAsBase64 = async (img) => {
    const base64 = await FileSystem.readAsStringAsync(img, {
      encoding: FileSystem.EncodingType.Base64,
    });
    return `data:image/png;base64,${base64}`;
  };
  
  // share the image from the modal
  shareImage = async () => {
    try {
      const base64Image = await this.getImageAsBase64(this.state.imageUri);
  
      await Share.share({
        title: 'Share Screenshot',
        url: base64Image,
      });
    } catch (error) {
      console.log('Error sharing image:', error.message);
    }
  };
     


  render() {
    return (
      <View style={styles.container}>
        <ViewShot
          style={styles.container}
          ref={(ref) => (this.viewShotRef = ref)}
          options={{ format: "png", quality: 1, captureMode: "update" }}
        >
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
              cash_to_deliver={
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
              cash_to_collect={
                this.state.total + this.state.profits
              }
              cash_to_collect_title="Cash to collect"
              cash_to_deliver={
                this.state.total +
                this.state.profits -
                this.state.agents_prof
              }
              cash_to_deliver_title="Cash to Deliver"
            />
          )}
          <View style={{ alignItems: 'center', padding: 40 }}>
            <TouchableOpacity
              onPress={this.takeScreenshot}
            >
              <Text
                style={{
                  backgroundColor: 'black',
                  borderColor: "white",
                  borderWidth: 1,
                  borderRadius: 12,
                  color: "#4c74c9",
                  fontSize: 23,
                  fontWeight: "bold",
                  overflow: "hidden",
                  padding: 12,
                  textAlign: "center",
                  width: 150

                }}
              >Screenshot</Text>
            </TouchableOpacity>
          </View>
        </ViewShot>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.showModal}
          onRequestClose={this.closeModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image source={{ uri: this.state.imageUri }} style={styles.modalImage} />
              <TouchableOpacity
                style={styles.shareButton}
                onPress={this.shareImage}
              >
                <Text style={styles.shareButtonText}>Share Image</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={this.closeModal}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4c74c9",
    flexDirection: "column"
  },
  header: {
    flex: 0.5,
    //"#ED8600"
    backgroundColor: "#4c74c9",
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
    width: 90,
    height: 50,
    padding: 12,
    marginTop: 10,
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
    flex: 4,
    padding: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalImage: {
    width: 200,
    height: 300,
  },
  shareButton: {
    backgroundColor: "#4c74c9",
    borderRadius: 20,
    padding: 10,
    marginTop: 20,
  },
  shareButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#f00",
    borderRadius: 20,
    padding: 10,
    marginTop: 10,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  
});