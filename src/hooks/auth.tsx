import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import { auth, store } from '../firebase/firebase';

type AuthProviderProps = {
  children: ReactNode;
}

type AuthContextData = {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  isLoggin: boolean;
  user: User | null;
}

type User = {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

const USER_COLLECTION = '@gopizza:user';

export const AuthContext = createContext({} as AuthContextData);

function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggin, setIsLoggin ] = useState(false);
  
  async function signIn(email:string, password: string) {
    if(!email || !password){
      console.log("Error ao logar")
      return Alert.alert("Login", "Informe o e-mail e a senha");
    }
    
    setIsLoggin(true);
    
    console.log("Going auth...");
    
    auth
    .signInWithEmailAndPassword(email, password)
    .then((account) => {
      if(!account.user){
        return;
      }
      
      store.collection('users')
      .doc(account.user.uid)
      .get()
      .then(async (profile) => {
        const {name, isAdmin} = profile.data() as User;
        if(profile.exists) {
          const userData = {
            id: account.user!.uid,
            email: account.user!.email,
            name,
            isAdmin
          }
          await AsyncStorage.setItem(USER_COLLECTION, JSON.stringify(userData))
          setUser(userData as User)
        }
      }).catch(error => {
        Alert.alert('Login', 'Não foi possível buscar os dados de perfil do usuário' + error)
      })
    })
    .catch((error: { code: any; }) => {
      const {code} = error;
      if(code === 'auth/user-not-found' || code === 'auth/wrong-password'){
        return Alert.alert('Login', 'E-mail ou senha inválida');
      } else {
        return Alert.alert('Login', 'Não foi possível realizar o Login');
      }
    })
      .finally(() => setIsLoggin(false))
  }

  async function loadUserStorageData() {
    setIsLoggin(true);
    const storedUser = await AsyncStorage.getItem(USER_COLLECTION)

    if(storedUser){
      const userData = JSON.parse(storedUser) as User;
      setUser(userData)
    }

    setIsLoggin(false);
  }

  async function signOut() {
    await auth.signOut();
    await AsyncStorage.removeItem(USER_COLLECTION);
    setUser(null);
  }

  async function forgotPassword(email: string) {
    if(!email){
      return Alert.alert('Redefinir senha', 'Informe o e-mail.');
    }

    auth.sendPasswordResetEmail(email).then(() => Alert.alert('Redefinir senha', 'Enviamos um link no seu e-mail para redefinir a sua senha')).catch(error => {
      Alert.alert('Redefinir senha', 'Ocorreu um error ao redefinir a sua senha ' + error);
    });
  }

  useEffect(() => {
    loadUserStorageData();
  },[])

  return (
    <AuthContext.Provider value={{signIn, isLoggin, user, signOut, forgotPassword}}>
      {children}
    </AuthContext.Provider>
  )
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { useAuth, AuthProvider };

