import { StatusBar } from "expo-status-bar";
import { Text, View, TextInput, Button, Alert, StyleSheet } from "react-native";
import { fetchData, postData, API_URL } from "./api";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitForm = async () => {
    try {
      const response = await postData("users", {
        username: username,
        password: password,
      });
      if (response.success) {
        Alert.alert("Success", "Login successful");
        // Handle successful login here
        getData();
      } else {
        Alert.alert("Error", "Login failed");
        // Handle login error here
      }
    } catch (error) {
      console.log("Error in the request !" + error);
    }
  };
  async function getData() {
    setLoading(true);
    try {
      const result = await fetchData("users");
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
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>My Expo Application !!</Text>
      <View style={styles.picker}>
        {loading ? (
          error ? (
            <Text>{error}</Text>
          ) : (
            <Text>Loading...</Text>
          )
        ) : (
          <Text>
            {data
              ? JSON.stringify(
                  data.map((user: any) => ({
                    username: user.username,
                    password: user.password,
                  }))
                )
              : "Data not found."}
          </Text>
        )}
      </View>

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
  picker: {
    marginBottom: 20,
  },
});
