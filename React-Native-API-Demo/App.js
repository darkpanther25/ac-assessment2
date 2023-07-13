import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  ToastAndroid,
  KeyboardAvoidingView,
} from "react-native";

export default function App() {
  const [id, setID] = useState("2");
  const [getName, setGetName] = useState("");
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");
  const [age, setAge] = useState("");

  const [showMethod, setShowMethod] = useState(null);

  const getUser = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/employee/${id}`)
      .then((response) => response.json())
      .then((json) => setGetName(json.data.employee_name))
      .catch((error) => console.log(error));
  };

  const postUser = () => {
    const requestBody = {
      employee_name: name,
      employee_salary: parseInt(salary),
      employee_age: parseInt(age),
      profile_image: "",
    };

    fetch(`https://dummy.restapiexample.com/api/v1/create`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        ToastAndroid.show(
          "Created object at id: " + json.id,
          ToastAndroid.SHORT
        );
      })
      .catch((error) => console.log(error));
  };

  const updateUser = () => {
    const requestBody = {
      employee_name: name,
      employee_salary: parseInt(salary),
      employee_age: parseInt(age),
      profile_image: "",
    };

    fetch(`https://dummy.restapiexample.com/api/v1/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        ToastAndroid.show("Updated object", ToastAndroid.SHORT);
      })
      .catch((error) => console.log(error));
  };

  const deleteUser = () => {
    fetch(`https://dummy.restapiexample.com/api/v1/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        console.log(response);
        ToastAndroid.show("Deleted object", ToastAndroid.SHORT);
      })
      .catch((error) => console.log(error));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <Text style={styles.header}>API</Text>
      {showMethod === "GET" && (
        <View style={styles.methodContainer}>
          <Text style={styles.subHeader}>GET Route</Text>
          <TextInput
            placeholder="ID"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
          <Button
            title="Fetch"
            onPress={getUser}
            color="#6EB4D5"
          />
          <Text style={styles.responseText}>Name: {getName}</Text>
        </View>
      )}
      {showMethod === "POST" && (
        <View style={styles.methodContainer}>
          <Text style={styles.subHeader}>POST method!</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Salary"
            style={styles.input}
            value={salary}
            onChangeText={setSalary}
          />
          <TextInput
            placeholder="Age"
            style={styles.input}
            value={age}
            onChangeText={setAge}
          />
          <Button
            title="Post"
            onPress={postUser}
            color="#6EB4D5"
          />
        </View>
      )}

      {showMethod === "PUT" && (
        <View style={styles.methodContainer}>
          <Text style={styles.subHeader}>PUT method!</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />
          <TextInput
            placeholder="Salary"
            style={styles.input}
            value={salary}
            onChangeText={setSalary}
          />
          <TextInput
            placeholder="Age"
            style={styles.input}
            value={age}
            onChangeText={setAge}
          />
          <Button
            title="Update"
            onPress={updateUser}
            color="#6EB4D5"
          />
        </View>
      )}
      {showMethod === "DELETE" && (
        <View style={styles.methodContainer}>
          <Text style={styles.subHeader}>DELETE method!</Text>
          <TextInput
            placeholder="Id"
            style={styles.input}
            value={id}
            onChangeText={setID}
          />
          <Button
            title="Delete"
            onPress={deleteUser}
            color="#6EB4D5"
          />
        </View>
      )}
      <View style={styles.optionsButton}>
        <Button
          title="GET"
          onPress={() => setShowMethod("GET")}
          color="#6EB4D5"
        />
        <Button
          title="POST"
          onPress={() => setShowMethod("POST")}
          color="#6EB4D5"
        />
        <Button
          title="PUT"
          onPress={() => setShowMethod("PUT")}
          color="#6EB4D5"
        />
        <Button
          title="DELETE"
          onPress={() => setShowMethod("DELETE")}
          color="#6EB4D5"
        />
      </View>
      <StatusBar style="auto" />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 40,
    fontWeight: "900",
    color: "black",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  button: {
    height: 40,
    backgroundColor: "red",
  },
  input: {
    borderWidth: 2,
    borderRadius: 8,
    borderColor: "black",
    fontSize: 16,
    padding: 10,
    marginBottom: 10,
    color: "black",
  },
  responseText: {
    marginTop: 10,
    color: "black",
  },
  optionsButton: {
    flexDirection: "row",
    gap: 10,
    marginTop: 30,
  },
  methodContainer: {
    marginTop: 20,
  },
});
