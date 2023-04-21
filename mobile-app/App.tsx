import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Platform,
} from "react-native";
import { useState, useEffect } from "react";
import { fetchData, postData } from "./api";
export default function App() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function submitForm() {
    //creates a user
    try {
      const response = await postData("users", {
        username,
        password,
      });
      if (response.success) {
        if (Platform.OS === "web") {
          alert("Success ! Signup was successful !");
        } else {
          Alert.alert("Success ! ", "Signup was successful !");
        }

        getData();
      } else {
        if (Platform.OS === "web") {
          alert("Error ! Signup failed.");
        } else {
          Alert.alert("Error !", "Signup failed.");
        }
      }
    } catch (error) {
      console.log("Error in the request ! " + error);
    }
  }

  async function getData() {
    setLoading(true);
    //The api call to fetch users
    try {
      const result = await fetchData("users");
      if (result.success) {
        console.log("Success ! ");
        setData(result.data);
        setError(undefined);
      } else {
        console.log("Failed ! ");
        setError(result.message);
      }
    } catch (error) {
      setData("Error in the request !" + error);
    }
    setLoading(false);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <View style={styles.container}>
      <Text>My Expo Application</Text>
      <View style={styles.usersList}>
        {loading ? (
          <Text>Loading...</Text>
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
      <View>
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 10,
  },
  usersList: {
    marginBottom: 20,
    textAlign: "center",
  },
});
