import { createContext, useReducer, useEffect } from "react";
import sponsorReducer from "./SponsorReducer";

import { getAllSponsors, createSponsor } from "../../services/sponsors";

import { ToastContainer, toast } from "react-toastify";

const access_token = localStorage.getItem("accessToken");

const SponsorContext = createContext();

export const SponsorProvider = ({ children }) => {
  const requestFailed = () =>
    toast.error("Something went wrong", {
      theme: "colored",
      toastId: "requestFailed",
    });

  const initialState = {
    sponsorsData: [],
    load: false,
  };

  const [state, dispatch] = useReducer(sponsorReducer, initialState);

  const fetchSponsors = async () => {
    setLoading();
    try {
      const res = await getAllSponsors();

      dispatch({
        type: "GET_SPONSORS",
        payload: res.data,
      });
    } catch (err) {
      console.log("Error: ", err.message);
    }
  };

  const sponsorCreation = async (name, fileUrl) => {
    try {
      const res = await createSponsor({
        name,
        fileUrl,
      });

      return res;
    } catch (err) {
      console.log("submit error: ", err);
      requestFailed();
    }
  };

  // Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Disable Loading
  const disableLoading = () => dispatch({ type: "DISABLE_LOADING" });

  // useEffect(() => {
  //   fetchSponsors();
  // }, []);

  return (
    <SponsorContext.Provider
      value={{
        sponsorsData: state.sponsorsData,
        load: state.load,
        setLoading,
        sponsorCreation,
        disableLoading,
        fetchSponsors
      }}
    >
      {children}
    </SponsorContext.Provider>
  );
};

export default SponsorContext;
