import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/authentication";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types";
const BASE_URL = "http://127.0.0.1:8000";

const useAxios = () => {
  const {
    accessToken,
    setAccessToken,
    refreshToken,
    setRefreshToken,
    setUser,
    getUserInfo,
  } = useAuth();
  const router = useRouter();

  const axiosPublicInstance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const axiosPrivateInstance = axios.create({
    baseURL: `${BASE_URL}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosPrivateInstance.interceptors.request.use(async (req) => {
    if (!accessToken) {
      // router.push("/login"); // Redireciona para a página de login se não houver token
      throw new axios.Cancel("Unauthorized");
    }
    req.headers.Authorization = `Bearer ${accessToken}`;

    //@ts-ignore
    const isExpired = dayjs.unix(jwtDecode(accessToken).exp).diff(dayjs()) < 1;
    if (!isExpired) {
      return req;
    }

    console.log(jwtDecode(accessToken));

    const authTokenWithRefresh = JSON.parse(
      localStorage.getItem("authTokens") ?? "{}"
    );
    console.log(authTokenWithRefresh);

    try {
      const response = await axios.post(`${BASE_URL}/api/jwt/refresh/`, {
        refresh: authTokenWithRefresh.refresh,
      });

      localStorage.setItem("accessToken", JSON.stringify(response.data.access));
      localStorage.setItem(
        "refreshToken",
        JSON.stringify(response.data.refresh)
      );
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      getUserInfo(accessToken);

      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    } catch (error) {
      // router.push("/login"); // Redireciona para a página de login se a renovação do token falhar
      throw new axios.Cancel("Unauthorized");
    }
  });

  const postCartCheckout = async (cartItems: CartItem[]) => {
    //@ts-ignore
    const formatedData = cartItems.map((item) => ({
      price_id: item.stripeID,
      quantity: item.quantity,
    }));

    try {
      const response = await axiosPrivateInstance.post(
        "/api/stripe/checkout/",
        {
          formatedData: formatedData,
        }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getProductsOfCheckout = async (checkoutID: string) => {
    try {
      const response = await axiosPrivateInstance.get(
        `/api/stripe/checkout/products/?session_id=${checkoutID}`
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getAllProducts = async () => {
    try {
      const response = await axiosPublicInstance.get("/api/stripe/products/");
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  const getSurveys = async (survey_id: number) => {
    try {
      const response = await axiosPublicInstance.get(
        `/api/survey/${survey_id}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getSurveyQuestions = async (survey: string) => {
    try {
      const response = await axiosPublicInstance.get(
        `/api/survey/${survey}/questions/`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getQuestionsOptions = async (questionID: number) => {
    try {
      const response = await axiosPublicInstance.get(
        `/api/question/${questionID}/options/`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getSurveyResults = async (survey_name: string, track_id: number) => {
    try {
      const response = await axiosPublicInstance.get(
        `/api/result/${survey_name}/${track_id}/`
      );
      return response;
    } catch (error) {
      throw error;
    }
  };
  const getProductsFilteredOnResult = async (
    survey_name: string,
    track_id: number
  ) => {
    try {
      const response = await axiosPublicInstance.get(
        `/api/stripe/treatments/products/`,
        {
          params: {
            survey: survey_name,
            track: track_id,
          },
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getOrders = async () => {
    try {
      const response = await axiosPrivateInstance.get("/api/stripe/orders/");
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getPartnershipStatus = async () => {
    try {
      const response = await axiosPublicInstance.get(
        "/api/partnerships-is-open/"
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const updatePartnershipStatus = async (status: boolean) => {
    try {
      const response = await axiosPublicInstance.post(
        "/api/partnerships-update/",
        {
          status,
        }
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  const getContactInfo = async () => {
    try {
      const response = await axiosPublicInstance.get(
        "/api/contact-information/"
      );
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    postCartCheckout,
    getProductsOfCheckout,
    getAllProducts,
    getSurveyQuestions,
    getQuestionsOptions,
    getSurveys,
    getSurveyResults,
    getProductsFilteredOnResult,
    getPartnershipStatus,
    updatePartnershipStatus,
    getContactInfo,
    getOrders,
  };
};

export default useAxios;
