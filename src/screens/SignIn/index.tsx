import brandImg from '@assets/brand.png';
import { Button } from "@components/Button";
import { Input } from "@components/Input";
import { useAuth } from '@hooks/auth';
import React, { useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { Brand, Container, Content, ForgotPasswordButton, ForgotPasswordLabel, Title } from "./styles";

export default function SignIn() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  
  const {isLoggin, signIn, forgotPassword } = useAuth();
  
  function handleSignIn() {
    signIn(email, password);
  }

  function handleForgotPassword() {
    forgotPassword(email);
  }

  return(
    <Container>
      <KeyboardAvoidingView 
        behavior={ Platform.OS === 'ios' ? 'padding' : undefined }
      >
        <Content>

          <Brand source={brandImg} />
          <Title>Login</Title>
          <Input placeholder="E-mail" type="secondary" onChangeText={setEmail} autoCorrect={false} autoCapitalize="none" />
          <Input placeholder="Senha" type="secondary" onChangeText={setPassword} autoCorrect={false} autoCapitalize="none" secureTextEntry/>

          <ForgotPasswordButton>
            <ForgotPasswordLabel>Cadastrar-se</ForgotPasswordLabel>
          </ForgotPasswordButton>
          <ForgotPasswordButton onPress={handleForgotPassword}>
            <ForgotPasswordLabel>Esqueci minha senha!</ForgotPasswordLabel>
          </ForgotPasswordButton>
          
          <Button title="Entrar" type="secondary" onPress={handleSignIn} isLoading={isLoggin}/>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  )
}