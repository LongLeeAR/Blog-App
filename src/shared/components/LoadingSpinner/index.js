import { createContext, useContext, useState } from "react"
import './index.css'

const LoadingContext = createContext(null);

export const useLoadingSpinContext = () => useContext(LoadingContext);

export const LoadingSpinner = ({children}) => {
  const [isLoading, setLoading] = useState();

  return <LoadingContext.Provider value={{isLoading, setLoading}}>
    {
      isLoading && <div className="overlay">
        <div className="spinner"></div>
      </div>
    }
    {children}
  </LoadingContext.Provider>
}