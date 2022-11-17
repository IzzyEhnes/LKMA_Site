import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
    auth: null,
    setAuth: () => {},
    
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    //console.log("got here to authcontext")
    useEffect(() => {
        setAuth(localStorage.getItem("isAuth"));
        //console.log("setAuth: " + auth);
    }, [auth]);

    return (
        <AuthContext.Provider value = {{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;