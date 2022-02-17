import '../styles/globals.css'
import { useReducer } from 'react'
import { initialState, storeReducer } from '../context/reducer';
import { StoreContext } from '../context/StoreContext';




const StoreProvider = ({ children }) => {
  const [state, Dispatch] = useReducer(storeReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, Dispatch }}>
      {children}
    </StoreContext.Provider>
  )
}

function MyApp({ Component, pageProps }) {

  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  )

}

export default MyApp
