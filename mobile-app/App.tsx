import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { fetchData, API_URL } from "./api";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async () => {
    try {
      const response = await fetch(`${API_URL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Login successful");
        // Handle successful login here
      } else {
        Alert.alert("Error", "Login failed");
        // Handle login error here
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred");
      console.error("Error submitting form:", error);
    }
  };

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const result = await fetchData();
        console.log("Success! result: " + JSON.stringify(result));
        if (result.success) {
          setData(result.data);
          setError(undefined);
        } else {
          setError(result.message);
        }
      } catch (error) {
        console.log("Error in the request !" + error);
        setData("Error in the request !" + error);
      }

      setLoading(false);
    }
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>My Expo Application !!</Text>
      {loading ? (
        error ? (
          <Text>{error}</Text>
        ) : (
          <Text>Loading...</Text>
        )
      ) : (
        <Text>{data ? JSON.stringify(data) : "Data not found."}</Text>
      )}

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Submit" onPress={submitForm} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
});
