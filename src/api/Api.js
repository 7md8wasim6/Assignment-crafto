import axios from "axios";

export const loginApi = async (formdata) => {
  return axios
    .post("https://assignment.stage.crafto.app/login", formdata, {
      headers: { "Content-Type": "application/json" },
    })
    .then((res) => res.data)
    .catch((error) => {
      throw error;
    });
};

export const getQuotes = async (token, offset) => {
  try {
    const response = await axios.get(
      "https://assignment.stage.crafto.app/getQuotes",
      {
        params: {
          limit: 20,
          offset: offset,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axios.post(
      "https://crafto.app/crafto/v1.0/media/assignment/upload",
      formData
    );
    return response.data[0].url;
  } catch (error) {
    console.error("Error uploading image:", error);
    throw error;
  }
};

export const createQuoteApi = async (text, mediaUrl, token) => {
  try {
    const response = await axios.post(
      "https://assignment.stage.crafto.app/postQuote",
      { text, mediaUrl },
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating quote:", error);
    throw error;
  }
};
