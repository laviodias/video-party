import React, { useContext, useEffect, useState } from "react";

export const UserContext = React.createContext({
  user: null,
  setUser: (user: any) => {},
  modalLoginOpen: false,
  setModalLoginOpen: (value: boolean) => {},
  modalLoginCallback: null,
  setModalLoginCallback: (value: any) => {},
});

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<string | null>(null);
  const [modalLoginOpen, setModalLoginOpen] = useState(false);
  const [modalLoginCallback, setModalLoginCallback] = useState<any>(null);

  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      setUser(username);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("username", user);
    } else {
      localStorage.removeItem("username");
    }
  }, [user]);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        modalLoginOpen,
        setModalLoginOpen,
        modalLoginCallback,
        setModalLoginCallback,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
