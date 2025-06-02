import { createContext, useContext, useState } from "react";

const userContext = createContext();

export const useAuth = () => useContext(userContext);

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({})
    return(
        <userContext.Provider value={{user, setUser}}>
            {
                children
            }
        </userContext.Provider>
    )
}

export default UserContextProvider;