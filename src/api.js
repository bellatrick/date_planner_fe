import axios from "axios";

export async function sendResponse(messageBody) {
  try {
    const response = await axios.post(
      "https://proposal-ks2o.onrender.com/send-message",
      { messageBody }
    );
    return response.data;
  } catch (error) {
    console.error("Something went wrong");
    throw error;
  }
}
