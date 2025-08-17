import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(!user){
    const checkAuth = async () => {
      try {
        const fetchuser = await fetch("http://localhost:5000/api/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (fetchuser.ok) {
          const data = await fetchuser.json();
          console.log("fetch data", data);

          setUser(data.getUser);
        }
      } catch (err) {
        console.error("failed to fetch the user", err);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }});

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
