import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "../firebase";

export const authContext = createContext();

//hook para usar los valores del context
export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) throw new Error("there is not auth provider");
  return context;
};
//hook para usar los valores del context
//function register
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signup = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  //function login
  const login = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

  //function logout
  const logout = () => signOut(auth);

  //login with google

  const loginWithGoogle = () => {
    const googleProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleProvider);
  };
  //reset password//

  const resetPassword = (email) => {
    sendPasswordResetEmail(auth, email);
  };
  //reset password//
  //almacenar informacion del usuario
  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);
  //almacenar informacion del usuario
  return (
    <authContext.Provider
      value={{
        signup,
        login,
        user,
        logout,
        loading,
        loginWithGoogle,
        resetPassword,
      }}>
      {children}
    </authContext.Provider> //objeto a exportar
  );
}
