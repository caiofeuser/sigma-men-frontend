import { CartItem } from "@/types";
import axios from "axios";
import { get } from "http";
//import jwt_decode from "jwt-decode";
//import { setAuthToken } from "../utils/setAuthToken";

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

const useAxios = () => {
  //const { authTokens, setAuthTokens, setUser } = useAuth();

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",
    headers: {
      "Content-Type": "application/json",
      // headers: {Authorization: `Bearer ${authTokens.accessToken}`},
    },
  });

  // axiosInstance.interceptors.request.use(async (req) => {
  //   const user = jwt_decode<AuthTokens>(authTokens.access);
  //   const isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

  //   if (!isExpired) return req;

  //   try {
  //     const response = await axios.post(`${baseURL}/token/refresh/`, {
  //       refresh: authTokens.refresh,
  //     });

  //     localStorage.setItem("authTokens", JSON.stringify(response.data));

  //     setAuthTokens(response.data);
  //     setUser(jwt_decode<AuthTokens>(response.data.access));

  //     req.headers.Authorization = `Bearer ${response.data.access}`;
  //     return req;
  //   } catch (error) {
  //     // Handle error
  //     throw error;
  //   }
  // });

  const postCartCheckout = async (cart: CartItem[]) => {
    const formatedData = cart.map((item) => {
      return {
        price_id: item.stripeID,
        quantity: item.quantity,
      };
    });

    try {
      const response = await axiosInstance.post("/api/stripe/checkout/", {
        formatedData,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axiosInstance.get("/api/stripe/products/");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getProductsOfCheckout = async (checkoutID: string) => {
    try {
      // stripe/checkout/products/?session_id=cs_test_b105dqvnclgeFIeHPTXbpPVIayovVhGcduMiaZeEp4k6O5npcmeDGEIofn
      const response = await axiosInstance.get(
        `/api/stripe/checkout/products/?session_id=${checkoutID}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getSurveys = async (survey_id: number) => {
    try {
      const response = await axiosInstance.get(`/api/survey/${survey_id}`);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getSurveyQuestions = async (survey: string) => {
    try {
      const response = await axiosInstance.get(
        `/api/survey/${survey}/questions/`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getQuestionsOptions = async (questionID: number) => {
    try {
      const response = await axiosInstance.get(
        `/api/question/${questionID}/options/`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getSurveyResults = async (survey_name: string, track_id: number) => {
    try {
      const response = await axiosInstance.get(
        `/api/result/${survey_name}/${track_id}/`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getProductsFilterdOnResult = (
    survey_name: string,
    track_id: number
  ) => {
    try {
      const response = axiosInstance.get(`/api/stripe/treatments/products/`, {
        params: {
          survey: survey_name,
          track: track_id,
        },
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getPartnershipStatus = () => {
    try {
      const response = axiosInstance.get("/api/parternships-is-open/");
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updatePartnershipStatus = (status: boolean) => {
    try {
      const response = axiosInstance.post("/api/partnerships-update/", {
        status,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getContactInfo = async () => {
    try {
      const response = await axiosInstance.get("/api/contact-information/");
      return response;
    } catch (e) {
      throw e;
    }
  };

  return {
    postCartCheckout,
    getAllProducts,
    getProductsOfCheckout,
    getSurveyQuestions,
    getQuestionsOptions,
    getSurveys,
    getSurveyResults,
    getProductsFilterdOnResult,
    getPartnershipStatus,
    updatePartnershipStatus,
    getContactInfo,
  };
};

export default useAxios;
