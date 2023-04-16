const API_URL = "http://localhost:4000";

export async function fetchData(): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/api/users`);
    const data = await response.json();
    return { success: true, message: "Successfully got data !", data };
  } catch (error: any) {
    console.error("Error fetching data:", error);
    return {
      success: false,
      message: "Error fetching data",
      error: error.message,
    };
  }
}
