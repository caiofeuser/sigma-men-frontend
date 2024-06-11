import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/authentication";
import { useRouter } from "next/navigation";
const BASE_URL = "https://caiofeuser.pythonanywhere.com";

interface AuthTokens {
  access: string;
  refresh: string;
}

const useAxios = () => {
  const { authToken, setAuthToken, setUser } = useAuth();
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
    if (!authToken) {
      router.push("/login"); // Redireciona para a página de login se não houver token
      throw new axios.Cancel("Unauthorized");
    }

    const isExpired =
      //@ts-ignore
      dayjs.unix(jwtDecode(authToken.access).exp).diff(dayjs()) < 1;
    if (!isExpired) {
      req.headers.Authorization = `Bearer ${authToken.access}`;
      return req;
    }

    const authTokenWithRefresh = JSON.parse(
      localStorage.getItem("authTokens") ?? "{}"
    );
    console.log(authTokenWithRefresh);

    try {
      const response = await axios.post(`${BASE_URL}/auth_api/token/refresh/`, {
        refresh: authTokenWithRefresh.refresh,
      });

      localStorage.setItem("authTokens", JSON.stringify(response.data));
      setAuthToken(response.data);
      setUser(jwtDecode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    } catch (error) {
      router.push("/login"); // Redireciona para a página de login se a renovação do token falhar
      throw new axios.Cancel("Unauthorized");
    }
  });

  const postCartCheckout = async (purchase: {
    price_id: string;
    quantity: number;
  }) => {
    //@ts-ignore
    const formatedData = purchase.cartItems.map((item) => ({
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
