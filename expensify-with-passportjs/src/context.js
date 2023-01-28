import axios from "axios";
import React , {useState,useEffect,useContext} from "react";

const AppContext = React.createContext()

const AppProvider = ({children}) => {
 const [totalPrice,setTotalPrice] = useState(2233.69)
 const[open,setOpen]=useState('false')
 const [userInfo,setUserInfo]= useState()
 const [data, setData] = useState([
   {
     id: 1,
     expense: 'Internet ',
     amount: 1000,
     createdAt: 'January 3rd 2021',
   },
 ])

 const handleOpen = () => setOpen(true)
 const handleClose = () => setOpen(false)
 return <AppContext.Provider value={{totalPrice,data,open,handleClose,handleOpen}}>{children}</AppContext.Provider>
}

export const useGlobalContext = ()=>{
 return useContext(AppContext)
}

export {AppContext,AppProvider}