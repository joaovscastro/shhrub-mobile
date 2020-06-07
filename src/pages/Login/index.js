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
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';

import { signInRequest } from '../../store/modules/auth/actions';

import api from '../../services/api';

import ArrowBigLeftDark from '../../components/icons/ArrowBigLeftDark';

import {
  Container,
  Header,
  Title,
  SubTitle,
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
  Label,
  LabelTwo,
  ContainerRecover,
} from './styles';

export default function Login({ navigation }) {
  const dispatch = useDispatch();
  const passwordRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [emailrecover, Setemailrecover] = useState('');

  const [loadingpass, Setloadingpass] = useState(false);

  const [recoverpasswordmodal, Setrecoverpasswordmodal] = useState(false);

  const loading = useSelector((state) => state.auth.loading);

  function handleSubmit() {
    dispatch(signInRequest(username, password));
  }

  toggleModalOpen = () => {
    Setrecoverpasswordmodal(true);
  };

  toggleModal = () => {
    Setrecoverpasswordmodal(false);
  };

  async function handleSubmitLostpass() {
    try {
      Setloadingpass(true);
      await api.post('wp/v2/m_users/password', {
        username: emailrecover,
      });
      Setloadingpass(false);
      Alert.alert(
        'Link enviado',
        'Um link para redefinição de senha foi enviado para seu e-mail.'
      );
    } catch (err) {
      Setloadingpass(false);
      Alert.alert(
        'E-mail não encontrado',
        'Por favor digite seu e-mail de cadastro.'
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
            <Title>Entrar</Title>
          </Header>
          <Form>
            <Label>E-mail</Label>
            <EmailInput
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              value={username}
              onChangeText={setUsername}
              placeholder="Digite seu e-mail"
            />
            <Label>Senha</Label>
            <PassInput
              secureTextEntry
              returnKeyType="go"
              onSubmitEditing={handleSubmit}
              value={password}
              onChangeText={setPassword}
              placeholder="Digite sua senha"
              ref={passwordRef}
            />
            {loading ? (
              <LoginButtonDisabled>
                <ActivityIndicator color="#ffffff" szie={25} />
              </LoginButtonDisabled>
            ) : (
              <>
                {username && password ? (
                  <LoginButton onPress={handleSubmit}>
                    <LoginButtonText>Entrar</LoginButtonText>
                  </LoginButton>
                ) : (
                  <LoginButtonDisabled>
                    <LoginButtonText>Entrar</LoginButtonText>
                  </LoginButtonDisabled>
                )}
              </>
            )}

            <ButtonForgot onPress={() => toggleModalOpen()}>
              <ButtonForgotText>Esqueci minha senha</ButtonForgotText>
            </ButtonForgot>
          </Form>
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
                <SubTitle>Recuperar senha</SubTitle>
                <Label>E-mail</Label>
                <EmailInput
                  keyboardType="email-address"
                  autoCorrect={false}
                  autoCapitalize="none"
                  returnKeyType="go"
                  value={emailrecover}
                  onChangeText={Setemailrecover}
                  placeholder="Digite seu e-mail"
                  onSubmitEditing={handleSubmitLostpass}
                />
                {loadingpass ? (
                  <LoginButtonDisabled>
                    <ActivityIndicator color="#ffffff" szie={30} />
                  </LoginButtonDisabled>
                ) : (
                  <>
                    {emailrecover === '' ? (
                      <LoginButtonDisabled>
                        <LoginButtonText>Recuperar senha</LoginButtonText>
                      </LoginButtonDisabled>
                    ) : (
                      <LoginButton onPress={handleSubmitLostpass}>
                        <LoginButtonText>Recuperar senha</LoginButtonText>
                      </LoginButton>
                    )}
                  </>
                )}

                <LabelTwo>Hey, espinafre faz bem para a memória.</LabelTwo>
              </View>
            </SafeAreaView>
          </ContainerRecover>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}
