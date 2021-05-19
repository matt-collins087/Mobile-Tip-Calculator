import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  Button,
  Keyboard,
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function App() {
  const [total, onChangeTotal] = React.useState(null);
  const [tip, onChangeTip] = React.useState(null);
  const [customTip, onChangeCustomTip] = React.useState(null);
  const [splitBill, onChangeSplitBill] = React.useState(1);

  let tipAmount = total * (tip * 0.01);
  let grandTotal = total + tipAmount;
  let totalSplit = grandTotal / splitBill;

  const TipButton = ({ percent }) => {
    let result = total * percent;
    result = Math.round(result * 100) / 100;
    return (
      <TouchableOpacity
        style={percent === tip ? styles.active : styles.button}
        onPress={() => {
          onChangeTip(percent);
        }}
      >
        <Text style={{ fontSize: 17 }}>{percent}%</Text>
      </TouchableOpacity>
    );
  };

  const CustomTipButton = ({ percent }) => {
    const inputRef = React.useRef();

    return (
      <>
        <TextInput
          style={styles.hidden}
          ref={inputRef}
          keyboardType="number-pad"
          onEndEditing={(e) => {
            onChangeCustomTip(+e.nativeEvent.text);
            onChangeTip(+e.nativeEvent.text);
          }}
        />
        <TouchableOpacity
          style={customTip === tip ? styles.customActive : styles.customButton}
          onPress={() => inputRef.current.focus()}
        >
          <Text style={{ fontSize: 14 }}>Custom</Text>
          <Text style={{ fontSize: 14 }}>{customTip}%</Text>
        </TouchableOpacity>
      </>
    );
  };

  const DecrementSplit = () => {
    if (splitBill > 1) {
      onChangeSplitBill(splitBill - 1);
    }
  };
  const IncrementSplit = () => {
    onChangeSplitBill(splitBill + 1);
  };

  return (
    <>
      <LinearGradient colors={["#096d82", "#103f60"]} style={styles.background}>
        <View style={styles.iconContainer}>
          <Image
            style={{ width: 50, height: 50, marginRight: 20 }}
            source={require("./assets/CalculatorIcon.jpeg")}
          />
          <Text style={{ fontSize: 26, color: "white" }}>Tip Calculator</Text>
        </View>
        <View style={{ height: 600 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.container}>
              <View style={styles.containers}>
                <Text style={styles.text}>Bill Amount</Text>
                <View style={styles.billAmount}>
                  <Text style={styles.dollar}>$</Text>
                  <TextInput
                    style={styles.input}
                    keyboardType="decimal-pad"
                    placeholder="0.00"
                    placeholderTextColor="white"
                    onChangeText={(text) => onChangeTotal(+text)}
                  />
                </View>
              </View>

              <View style={styles.tipAmountContainer}>
                <Text style={styles.text}>Tip Amount</Text>
                <Text style={styles.dollar}>$ {tipAmount.toFixed(2)}</Text>
              </View>

              <View style={styles.tipContainer}>
                <TipButton percent={10} />
                <TipButton percent={15} />
                <TipButton percent={20} />
                <CustomTipButton stlye={styles.customButton} />
              </View>

              <View style={styles.splitBillContainer}>
                <Text style={styles.text}>Split Bill</Text>
                <View style={styles.splitBill}>
                  <TouchableWithoutFeedback
                    onPress={DecrementSplit}
                  >
                    <Text style={{ fontSize: 30, color: "white"}}> - </Text>
                  </TouchableWithoutFeedback>
                  <Text style={{ fontSize: 28, color: "white", marginHorizontal: 10}}>{splitBill}</Text>
                  <TouchableWithoutFeedback
                    onPress={IncrementSplit}
                  >
                    <Text style={{ fontSize: 30, color: "white"}}> + </Text>
                  </TouchableWithoutFeedback>
                </View>
              </View>

              <View style={styles.resultContainer}>
                <Text style={styles.total}>
                  Grand Total: ${grandTotal.toFixed(2)}
                </Text>
                <Text style={styles.totalSplit}>
                  Per Person: ${totalSplit.toFixed(2)}
                </Text>
              </View>

              <StatusBar style="auto" />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  active: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 45,
    backgroundColor: "#1ACB40",
    padding: 10,
    margin: 7,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  billAmount: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  billButton: {
    color: "white",
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 45,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 7,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  containers: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    padding: 5,
  },
  customActive: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 45,
    backgroundColor: "#1ACB40",
    padding: 10,
    margin: 7,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  customButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 45,
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 7,
    borderRadius: 7,
    shadowColor: "#000",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
  },
  dollar: {
    color: "white",
    fontSize: 20,
  },
  hidden: {
    display: "none",
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    marginVertical: 25,
    flexDirection: "row",
  },
  input: {
    borderWidth: 1,
    fontSize: 20,
    color: "white",
    borderColor: "transparent",
    marginLeft: 3,
  },
  resultContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  splitBillContainer: {
    width: "60%",
    marginTop: 20,
    marginBottom: 10,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    padding: 5,
  },
  splitBill: {
    flexDirection: "row",
    alignItems: "center",
  },
  tipAmount: {
    borderBottomColor: "white",
    borderBottomWidth: 2,
    marginBottom: 10,
    marginTop: 10,
  },
  tipAmountContainer: {
    width: "60%",
    marginTop: 20,
    marginBottom: 30,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    padding: 5,
  },
  tipContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  text: {
    marginBottom: 10,
    fontSize: 25,
    color: "white",
  },
  total: {
    marginBottom: 10,
    fontSize: 25,
    fontWeight: "600",
    color: "white",
  },
  totalSplit: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "400",
    color: "white",
  },
});