import { Alert, StyleSheet } from "react-native";
export const API_URL = "http://192.168.0.102:4000";

export async function fetchData(route: string): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/api/${route}`);
    const data = await response.json();
    return { success: true, message: "Successfully got data !", data };
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      message: "Error fetching data - " + error.message,
      error: error.message,
    };
  }
}

export async function postData(route: string, body: any): Promise<any> {
  //
  try {
    const response = await fetch(`${API_URL}/api/${route}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (response.ok) {
      if (data.success) {
        return { success: true, message: "Request Success ! " + data.response };
      } else {
        return { success: false, message: "Request failed. " + data.response };
      }
    } else {
      return { success: false, message: "Request failed. " + data };
      // Handle login error here
    }
  } catch (error) {
    Alert.alert("Error", "An error occurred");
    console.error("Error submitting form:", error);
  }
}
