import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  Alert
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Card } from "native-base";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
  }

  componentWillMount() {
    const { navigation } = this.props;
    navigation.addListener("willFocus", () => {
      this.getAllTasks();
    });
  }

  getAllTasks = async () => {
    await AsyncStorage.getAllKeys()
      .then(keys => {
        return AsyncStorage.multiGet(keys)
          .then(result => {
            this.setState({
              tasks: result.sort( () => {
                return -1;
              })
            });
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  render() {
    return (
      <View style={styles.parentView}>
        <FlatList
          style={{marginTop: 10}}
          data={this.state.tasks}
          renderItem={({ item }) => {
            task = JSON.parse(item[1]);
            return (
              <TouchableOpacity
                onPress={()=>{
                    this.props.navigation.navigate("ViewTask",{
                        key: item[0].toString()
                      });
                }}
              >
                <Card style={styles.taskCard}>
                    <View style={styles.iconContainer}>
                    <Text style={styles.taskIcon}>
                        {task.taskname[0].toUpperCase()}
                    </Text>
                    </View>
                    <View style={styles.infoContainer}>
                    <Text style={styles.infoText}>{task.taskname}</Text>
                    <Text style={styles.infoText}>{task.taskdes.substring(0,30)}</Text>
                    </View>
                </Card>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item, index) => item[0].toString()}
        />

        <TouchableOpacity
          style={styles.floatButton}
          onPress={() => {
            this.props.navigation.navigate("NewTask");
          }}
        >
          <FontAwesome name="plus" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    backgroundColor: "#fff"
  },
  floatButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    position: "absolute",
    bottom: 20,
    right: 20,
    height: 60,
    backgroundColor: "#0A79DF",
    borderRadius: 100
  },
  taskCard: {
    flexDirection: "row",
    padding: 10,
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3C40C6",
    borderRadius: 100
  },
  taskIcon: {
    fontSize: 28,
    color: "#fff"
  },
  infoContainer: {
    width: '70%',
    justifyContent: "center",
    flexDirection: "column"
  },
  infoText: {
    fontSize: 16,
    fontWeight: "400",
    paddingLeft: 10,
    paddingTop: 2
  }
});
