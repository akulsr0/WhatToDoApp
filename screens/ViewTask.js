import React, { Component } from "react";
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
  Alert,
  AsyncStorage
} from "react-native";
import { Card, CardItem } from "native-base";
import { Entypo } from "@expo/vector-icons";

export default class ViewTask extends Component {

    constructor(props){
        super(props);
        this.state = {
            taskname: "sometext",
            taskdes: "sometext",
            date: "sometext",
            key: "sometext"
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener("willFocus", () => {
          var key = this.props.navigation.getParam("key", "");
          this.getTask(key);
        });
      }

      getTask = async key => {
        await AsyncStorage.getItem(key)
        .then(taskjsonString => {
          var task = JSON.parse(taskjsonString);
          task["key"] = key;
          this.setState(task);
        })
        .catch(error => {
          console.log(error);
        });
      }

      deleteContact = key => {
        Alert.alert("Delete this task ?", ``, [
          {
            text: "Cancel",
            onPress: () => console.log("cancel tapped")
          },
          {
            text: "OK",
            onPress: async () => {
              await AsyncStorage.removeItem(key)
                .then(() => {
                  this.props.navigation.goBack();
                })
                .catch(error => {
                  console.log(error);
                });
            }
          }
        ]);
      };

  render() {

    return(
        <View style={styles.parentView}>
            <Card style={{marginLeft: 10, marginRight: 10, marginTop: 30, borderRadius: 15}}>
                <CardItem style={{justifyContent: 'center', borderRadius: 15}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold'}}>{this.state.taskname}</Text>
                </CardItem>
                <CardItem style={{width: '100%'}}>
                    <Text>{this.state.taskdes}</Text>
                </CardItem>
                <CardItem style={{borderRadius: 15}}>
                    <Text style={{position: 'absolute', right: 15 }}>{this.state.date}</Text>
                </CardItem>
            </Card>
            {/* <TouchableOpacity>
                <Text style={styles.btnDoneText}>Mark as completed</Text>
            </TouchableOpacity> */}
            <TouchableOpacity
                onPress={()=>{this.deleteContact(this.state.key)}}
            >
                <Text style={styles.btnDelText}>Delete Task</Text>
            </TouchableOpacity>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1
  },
  btnDelText: {
      marginTop: 10,
      backgroundColor: 'red',
      color: '#fff',
      paddingVertical: 8,
      paddingHorizontal: 30,
      fontSize: 18,
      fontWeight: 'bold',
      borderRadius: 10,
      alignSelf: 'center'
  },

//   btnDoneText: {
//     marginTop: 20,
//     backgroundColor: '#45CE30',
//     color: '#fff',
//     paddingVertical: 8,
//     paddingHorizontal: 30,
//     fontSize: 18,
//     fontWeight: 'bold',
//     borderRadius: 10,
//     alignSelf: 'center'
// }

});
