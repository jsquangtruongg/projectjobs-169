import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getUserAPI } from "../api/user";
import { IUserData } from "../redux/reducers/user";

interface AuthContextType {
  user: IUserData | null;
  removeUser: () => void;
}

// Initialize the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUserData | null>(null);
  const removeUser = () => {
    setUser(null);
  };
  useEffect(() => {
    (async () => {
      if (!localStorage.getItem("profile")) {
        setUser(null);
        return;
      }
      try {
        const accessToken = JSON.parse(
          localStorage.getItem("profile") ?? ""
        )?.accessToken;
        if (accessToken) {
          const res = await getUserAPI();
          setUser(res.userData);
        }
      } catch (error) {}
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, removeUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
