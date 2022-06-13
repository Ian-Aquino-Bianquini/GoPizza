import { ButtonBack } from "@components/ButtonBack";
import { Photo } from "@components/Photo";
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from "react";
import { Platform } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Container, DeleteLabel, Header, PickImageButton, Title, Upload } from "./styles";


export default function Product (){
  const [image, setImage] = useState('')

  async function handlePickerImage() {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(status === 'granted') {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        aspect: [4,4]
      })

      if(!result.cancelled) {
        setImage(result.uri);
      }
    }
  }

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
        <Photo uri={image} />
        
        <PickImageButton title="Carregar" type="secondary" onPress={handlePickerImage}/>
      </Upload>
    </Container>
  )
}