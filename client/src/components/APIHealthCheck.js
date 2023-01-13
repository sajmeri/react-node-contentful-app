import { useEffect, useReducer } from "react";
const initialState = { loading: true, error: false, data: null };
const APIHealthCheck = () => {
  const dataReducer = (state, action) => {
    console.log("action", action);
    switch (action.type) {
      case "DataRetrieved":
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case "ErrorOccured":
        return {
          ...state,
          error: true,
        };
      default:
        return state;
    }
  };
  const [state, dispatch] = useReducer(dataReducer, initialState);

  const getHealthCheckMessage = async () => {
    try {
      const response = await fetch("/api");
      if (!response.ok) {
        throw new Error("Couldn't connect to the server!");
      }
      const data = await response.json();
      console.log("dtaa", data);
      dispatch({ type: "DataRetrieved", payload: data });
    } catch (e) {
      console.log(e);
      dispatch("ErrorOccured");
      dispatch({ type: "ErrorOccured", payload: e.message });
    }
  };
  useEffect(() => {
    getHealthCheckMessage();
  }, []);
  console.log(state.data);
  return (
    <div>
      <h2>Health check</h2>
      {state.loading && <p>Fetching data!</p>}
      {state.error && <p>An error occured, please contact the admin!</p>}
      {state.data && <p>{state.data.message}</p>}
    </div>
  );
};

export default APIHealthCheck;
