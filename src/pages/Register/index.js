import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Alert,
  Linking,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';

import { signInRequest } from '../../store/modules/auth/actions';

import api from '../../services/api';

import ArrowBigLeftDark from '../../components/icons/ArrowBigLeftDark';
import AccountOk from '../../../assets/animation/accountcreate.json';

import {
  Container,
  Header,
  Title,
  TitleTwo,
  Form,
  EmailInput,
  PassInput,
  LoginButton,
  LoginButtonDisabled,
  LoginButtonText,
  RegisterButton,
  RegisterButtonText,
  ButtonForgot,
  ButtonForgotText,
  Disclaimer,
  DisclaimerTwo,
  Label,
  ContainerRecover,
  df,
} from './styles';

export default function Register({ navigation }) {
  const passwordRef = useRef();
  const passwordconfirmRef = useRef();
  const [registerEmail, setregisterEmail] = useState('');
  const [registerPassword, setregisterPassword] = useState('');
  const [registerPasswordConfirm, setregisterPasswordConfirm] = useState('');
  const [loading, setloading] = useState(false);

  const [recoverpasswordmodal, Setrecoverpasswordmodal] = useState(false);

  toggleModalOpen = () => {
    Setrecoverpasswordmodal(true);
  };

  toggleModal = () => {
    Setrecoverpasswordmodal(false);
  };

  async function registerUser() {
    setloading(true);
    try {
      await api.post('wp/v2/users/register', {
        username: registerEmail,
        email: registerEmail,
        password: registerPassword,
      });
      setregisterEmail('');
      setregisterPassword('');
      setregisterPasswordConfirm('');
      setloading(false);
      toggleModalOpen();
    } catch (err) {
      setloading(false);
      Alert.alert(
        'Erro ao criar conta',
        'Houve um erro na hora de criar a conta, verifique seus dados'
      );
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Header>
            <TouchableOpacity onPress={() => navigation.navigate('Main')}>
              <ArrowBigLeftDark />
            </TouchableOpacity>
            <Title>Criar conta</Title>
          </Header>
          <Form>
            <Label>E-mail</Label>
            <EmailInput
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              value={registerEmail}
              onChangeText={setregisterEmail}
              placeholder="Digite seu melhor e-mail"
              onSubmitEditing={() => passwordRef.current.focus()}
            />
            <Label>Senha</Label>
            <PassInput
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              value={registerPassword}
              onChangeText={setregisterPassword}
              placeholder="Crie uma senha"
              ref={passwordRef}
              onSubmitEditing={() => passwordconfirmRef.current.focus()}
            />
            <Label>Confirmar senha</Label>
            <PassInput
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="go"
              value={registerPasswordConfirm}
              onChangeText={setregisterPasswordConfirm}
              placeholder="Confirme sua senha"
              ref={passwordconfirmRef}
              onSubmitEditing={registerUser}
            />

            {loading ? (
              <LoginButtonDisabled>
                <ActivityIndicator color="#ffffff" szie={25} />
              </LoginButtonDisabled>
            ) : (
              <>
                {registerEmail &&
                registerPassword &&
                registerPasswordConfirm ? (
                  <>
                    {registerPassword === registerPasswordConfirm ? (
                      <LoginButton onPress={registerUser}>
                        <LoginButtonText>Criar conta</LoginButtonText>
                      </LoginButton>
                    ) : (
                      <>
                        <DisclaimerTwo>As senhas não coincidem.</DisclaimerTwo>
                        <LoginButtonDisabled>
                          <LoginButtonText>Criar conta</LoginButtonText>
                        </LoginButtonDisabled>
                      </>
                    )}
                  </>
                ) : (
                  <LoginButtonDisabled>
                    <LoginButtonText>Criar conta</LoginButtonText>
                  </LoginButtonDisabled>
                )}
              </>
            )}
          </Form>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL('https://privacidade.supercrush.com.br')
            }
          >
            <Disclaimer>
              Ao cadastrar você concorda com nossos termos.
            </Disclaimer>
            <Disclaimer>Toque aqui para acessar.</Disclaimer>
          </TouchableOpacity>
        </Container>
        <Modal
          isVisible={recoverpasswordmodal}
          onBackdropPress={() => toggleModal()}
          style={{
            justifyContent: 'flex-end',
            margin: 0,
          }}
        >
          <ContainerRecover>
            <SafeAreaView style={{ marginLeft: 20, marginRight: 20 }}>
              <View style={{ marginBottom: 20 }}>
                <TitleTwo>Conta criada</TitleTwo>
                <Lottie
                  resizeMode="contain"
                  autoSize
                  source={AccountOk}
                  autoPlay
                  loop={true}
                  style={{
                    width: 360,
                    height: 128,
                  }}
                />
                <LoginButton onPress={() => navigation.navigate('Login')}>
                  <LoginButtonText>Acessar conta</LoginButtonText>
                </LoginButton>
              </View>
            </SafeAreaView>
          </ContainerRecover>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
