import axios from 'axios';

export const callApi = async (url: string, token: string, body: any) => {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: 'text/plain',
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      data: body,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
