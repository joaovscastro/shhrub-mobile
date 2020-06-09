import React from 'react';
import { useDispatch } from 'react-redux';
import {
  SafeAreaView,
  View,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';

import { signOut } from '../../store/modules/auth/actions';

import {
  Container,
  Header,
  Title,
  MessageBox,
  MessageAvatar,
  MessageContent,
} from './styles';

import ArrowRightGray from '../../components/icons/ArrowRightGray';
import ArrowBigLeftDark from '../../components/icons/ArrowBigLeftDark';
import AboutIcon from '../../../assets/img/about.png';
import InstaIcon from '../../../assets/img/instagram.png';
import PrivacyIcon from '../../../assets/img/privacy.png';
import LogoutIcon from '../../../assets/img/logout.png';

export default function More({ navigation }) {
  function Sair() {
    Alert.alert(
      'Deseja realmente sair?',
      'Você será desconectado',
      [
        { text: 'Não', onPress: () => navigation.goBack() },
        { text: 'Sim', onPress: () => handleLogout() },
      ],
      { cancelable: false }
    );
  }

  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBigLeftDark />
          </TouchableOpacity>
          <Title>Mais</Title>
        </Header>
        <View>
          <MessageBox
            onPress={() => Linking.openURL('https://supercrush.com.br')}
          >
            <MessageAvatar source={AboutIcon} resizeMode="contain" />

            <MessageContent>Sobre o app</MessageContent>
            <ArrowRightGray />
          </MessageBox>
          <MessageBox
            onPress={() =>
              Linking.openURL('https://instagram.com/crushdesabafo')
            }
          >
            <MessageAvatar source={InstaIcon} resizeMode="contain" />

            <MessageContent>Siga @crushdesabafo</MessageContent>
            <ArrowRightGray />
          </MessageBox>
          <MessageBox
            onPress={() =>
              Linking.openURL('https://privacidade.supercrush.com.br')
            }
          >
            <MessageAvatar source={PrivacyIcon} resizeMode="contain" />

            <MessageContent>Privacidade</MessageContent>
            <ArrowRightGray />
          </MessageBox>
          <MessageBox onPress={() => Sair()}>
            <MessageAvatar source={LogoutIcon} resizeMode="contain" />

            <MessageContent>Sair</MessageContent>
            <ArrowRightGray />
          </MessageBox>
        </View>
      </SafeAreaView>
    </Container>
  );
}
