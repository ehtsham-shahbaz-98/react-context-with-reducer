import { createContext, useReducer, useEffect } from "react";
import studyReducer from "./StudyReducer";

import { getAllStudy } from "../../services/studies";

const access_token = localStorage.getItem('accessToken');

const StudyContext = createContext();

export const StudyProvider = ({ children }) => {
  const initialState = {
    studyData: [],
    load: false,
  };

  const [state, dispatch] = useReducer(studyReducer, initialState);

  const fetchStudies = async () => {
    setLoading();
    try {
      const res = await getAllStudy();

      dispatch({
        type: "GET_STUDIES",
        payload: res.data,
      });
    } catch (err) {
      disableLoading();
      console.log("Error: ", err.message);
    }
  };

  // Set Loading
  const setLoading = () => dispatch({ type: "SET_LOADING" });

  // Disable Loading
  const disableLoading = () => dispatch({ type: "DISABLE_LOADING" });

  // useEffect(() => {
  //   if (access_token) {
  //     fetchStudies();
  //   }
  // }, [access_token]);

  return (
    <StudyContext.Provider
      value={{
        studyData: state.studyData,
        load: state.load,
        setLoading,
        disableLoading,
        fetchStudies
      }}
    >
      {children}
    </StudyContext.Provider>
  );
};

export default StudyContext;
