import axios from "axios";
import { BASE_URL } from "../defaultValues/DefaultValues";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    { image, fullname, employee_id, username, email, password },
    { rejectWith }
  ) => {
    try {
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${BASE_URL}/register`,
        { image, fullname, employee_id, username, email, password },
        config
      );
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
