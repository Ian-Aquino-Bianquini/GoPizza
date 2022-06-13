import { ButtonBack } from "@components/ButtonBack"
import { Photo } from "@components/Photo"
import React from "react"
import { Platform } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { Container, DeleteLabel, Header, PickImageButton, Title, Upload } from "./styles"


export default function Product (){
  return(
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header>
        <ButtonBack activeOpacity={0.6}/>
        <Title>Cadastrar</Title>

        <TouchableOpacity>
          <DeleteLabel>Deletar</DeleteLabel>
        </TouchableOpacity>
      </Header>

      <Upload>
        <Photo uri={""} />
        
        <PickImageButton title="Carregar" type="secondary" />
      </Upload>
    </Container>
  )
}