import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  Keyboard,
  TouchableOpacity,
  AsyncStorage,
  TouchableWithoutFeedback,
  Alert,
  ScrollView
} from "react-native";
import { Card, CardItem, Item, Label, Input, Textarea } from "native-base";



export default class NewTask extends Component {

  constructor(props){
      super(props);
      this.state = {
        taskname:  "",
        taskdes: "",
        date: "",
        key: ""
      }
  }

  saveTask = async () => {
      if (this.state.taskname!==""&&this.state.taskdes!=="") {

        var today = new Date();
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();

        var task = {
            taskname: this.state.taskname,
            taskdes: this.state.taskdes,
            date: date
        }

        await AsyncStorage.setItem(Date.now().toString(), JSON.stringify(task))
            .then(()=>{
                this.props.navigation.goBack();
            })
            .catch(error=>{console.log(error)})

      }
      else {
          Alert.alert("Enter all fields...")
      }
  }


  render() {
    return (
      <TouchableWithoutFeedback>
        <ScrollView>
          <View style={styles.parentView}>
            <Card style={{ marginLeft: 20, marginRight: 20, marginTop: 60, borderRadius: 15 }}>
              <CardItem
                style={{ alignItems: "center", justifyContent: "center", borderRadius: 15 }}
              >
                <Text style={{ fontSize: 20, color: "#3742fa" }}>
                  Enter Task Details
                </Text>
              </CardItem>
              <CardItem>
                <Item floatingLabel>
                  <Label>Task Name:</Label>
                  <Input 
                    onChangeText={taskname=>this.setState({taskname})}
                  />
                </Item>
              </CardItem>
              <CardItem
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                <Textarea
                  style={{ width: "100%", paddingTop: 10 }}
                  rowSpan={5}
                  bordered
                  placeholder="Task Description"
                  onChangeText={taskdes=>{this.setState({taskdes})}}
                />
              </CardItem>
              <CardItem
                style={{ alignItems: "center", justifyContent: "center", borderRadius: 15 }}
              >
                <TouchableOpacity
                    onPress={()=>{
                        this.saveTask()
                    }}
                >
                  <Text style={styles.btnText}>Add</Text>
                </TouchableOpacity>
              </CardItem>
            </Card>
            <View style={{ height: 400 }} />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#EAF0F1"
  },
  btnText: {
    fontSize: 25,
    color: "#fff",
    backgroundColor: "#4834DF",
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 10
  }
});
