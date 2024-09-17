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
}

// Initialize the AuthContext with default values
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<IUserData | null>(null);
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
      } catch (error) {
        localStorage.removeItem("profile");
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
