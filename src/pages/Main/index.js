import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';

import {
  Container,
  SectionOne,
  SectionTwo,
  Title,
  Desc,
  ButtonLogin,
  ButtonLoginText,
  ButtonRegister,
  ButtonRegisterText,
} from './styles';

import Logo from '../../components/icons/Logo';

export default function Main({ navigation }) {
  return (
    <Container>
      <SectionOne>
        <SafeAreaView>
          <Logo />
        </SafeAreaView>
      </SectionOne>
      <SectionTwo>
        <Title>Hey, bem vindo!</Title>
        <Desc>Sinta-se a vontade. Desabafe conosco!</Desc>
        <ButtonLogin onPress={() => navigation.navigate('Login')}>
          <ButtonLoginText>Acessar minha conta</ButtonLoginText>
        </ButtonLogin>
        <ButtonRegister onPress={() => navigation.navigate('Register')}>
          <ButtonRegisterText>Criar uma nova conta</ButtonRegisterText>
        </ButtonRegister>
      </SectionTwo>
    </Container>
  );
}
