import { createContext, useContext } from "react";
import { useSelector } from "react-redux";
import './index.css';
import { selectLoadingSpinnerState } from "./LoadingSpinner.selectors";

const LoadingContext = createContext(null);

export const useLoadingSpinContext = () => useContext(LoadingContext);

export const LoadingSpinner = ({children}) => {
  const {shouldDisplay} = useSelector(selectLoadingSpinnerState);

  return <>
    {
      shouldDisplay && <div className="overlay">
        <div className="spinner"></div>
      </div>
    }
    {children}
  </>
}