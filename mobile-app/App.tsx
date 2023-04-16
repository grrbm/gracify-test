import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { fetchData } from "./api";
import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getData() {
      setLoading(true);
      try {
        const result = await fetchData();
        console.log("Success!!! result: " + JSON.stringify(result));
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
});
