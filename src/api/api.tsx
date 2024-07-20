import axios from "axios";
import dayjs from "dayjs";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "@/context/authentication";
import { useRouter } from "next/navigation";
import { CartItem } from "@/types";

const useAxios = () => {
  const { accessToken, setAccessToken, setRefreshToken, getUserInfo } =
    useAuth();
  const router = useRouter();

  const axiosPublicInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const axiosPrivateInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}`,
    headers: {
      "Content-Type": "application/json",
    },
  });

  axiosPrivateInstance.interceptors.request.use(async (req) => {
    if (!accessToken) {
      const localAccessToken = localStorage.getItem("access");
      if (!localAccessToken) {
        router.push("/login"); // Redireciona para a página de login se não houver token
        throw new axios.Cancel("Unauthorized");
      } else {
        setAccessToken(localAccessToken);
      }
    }

    req.headers.Authorization = `Bearer ${accessToken}`;

    //@ts-ignore
    const isExpired = dayjs.unix(jwtDecode(accessToken).exp).diff(dayjs()) < 1;
    if (!isExpired) {
      return req;
    }

    const refreshToken = localStorage.getItem("refresh");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL_BACKEND}/api/jwt/refresh/`,
        {
          refresh: refreshToken,
        }
      );

      localStorage.setItem("access", JSON.stringify(response.data.access));
      localStorage.setItem("refresh", JSON.stringify(response.data.refresh));
      setAccessToken(response.data.access);
      setRefreshToken(response.data.refresh);
      if (accessToken) {
        getUserInfo(accessToken);
      }

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
