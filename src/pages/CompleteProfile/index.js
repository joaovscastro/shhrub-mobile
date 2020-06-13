import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import {
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {
  Container,
  Header,
  Title,
  Form,
  EmailInput,
  LoginButton,
  LoginButtonDisabled,
  LoginButtonText,
  Disclaimer,
  ChangePhoto,
  ChangePhotoBtn,
  ChangePhotoText,
  Avatar,
  Label,
  DateInput,
  DisclaimerTwo,
} from './styles';

import { updateProfileRequest } from '../../store/modules/user/actions';

function CompleteProfile({ profile, navigation }) {
  const loading = useSelector((state) => state.user.loading);
  const profilenav = useSelector((state) => state.user.profilenav);

  if (profilenav) {
    navigation.navigate('Feed');
  }

  const [avatar, SetAvatar] = useState(profile.m_avatar);
  const [avatarsource, SetAvatarsource] = useState(profile.m_avatar);
  const [avatarupload, SetAvatarupload] = useState(profile.m_avatar);

  const [nome, Setnome] = useState('');
  const [instagram, Setinstagram] = useState('https://instagram.com/');
  const [biografia, Setbiografia] = useState('');
  const [nascimento, Setnascimento] = useState('');

  const birthday = moment(nascimento, 'DD/MM/YYYY'),
    age = moment().diff(birthday, 'years');

  const options = {
    title: 'Selecionar avatar',
    cancelButtonTitle: 'Cancelar',
    takePhotoButtonTitle: 'Tirar foto',
    chooseFromLibraryButtonTitle: 'Escolher da biblioteca',
    tintColor: '#0a84ff',
    maxWidth: 100,
    maxHeight: 100,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  function selecionaAvatar() {
    ImagePicker.openPicker({
      width: 100,
      height: 100,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      const source = { uri: `data:${image.mime};base64,` + image.data };

      SetAvatar(image.path);
      SetAvatarupload(source.uri);
    });
  }

  const dispatch = useDispatch();

  function handleSubmit() {
    dispatch(
      updateProfileRequest({
        id: profile.id,
        nome,
        avatarupload,
        avatarsource,
        instagram,
      })
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, marginBottom: 20 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Header>
            <Title>Completar perfil</Title>
          </Header>

          <ChangePhoto onPress={() => selecionaAvatar()}>
            <Avatar source={{ uri: avatar }} />
            <ChangePhotoBtn>
              <ChangePhotoText>Atualizar foto</ChangePhotoText>
            </ChangePhotoBtn>
          </ChangePhoto>

          <Form>
            <Label>Nome</Label>
            <EmailInput
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              value={nome}
              onChangeText={Setnome}
              placeholder="Digite seu nome"
            />

            <Label>URL do seu Instagram</Label>
            <EmailInput
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              value={instagram}
              onChangeText={Setinstagram}
              placeholder="link do seu insta"
            />
            <Label>Data de nascimento</Label>
            <DateInput
              keyboardType="numeric"
              type={'datetime'}
              options={{
                format: 'DD/MM/YYYY',
              }}
              value={nascimento}
              onChangeText={Setnascimento}
              placeholder="Sem mentir, hein?"
            />

            {loading ? (
              <LoginButtonDisabled>
                <ActivityIndicator color="#ffffff" szie={25} />
              </LoginButtonDisabled>
            ) : (
              <>
                {nome && nascimento ? (
                  <>
                    {age < 18 ? (
                      <>
                        <DisclaimerTwo>
                          Ei, parece que você ainda é um baby!
                        </DisclaimerTwo>
                        <LoginButtonDisabled>
                          <LoginButtonText>Continuar</LoginButtonText>
                        </LoginButtonDisabled>
                      </>
                    ) : (
                      <LoginButton onPress={handleSubmit}>
                        <LoginButtonText>Continuar</LoginButtonText>
                      </LoginButton>
                    )}
                  </>
                ) : (
                  <LoginButtonDisabled>
                    <LoginButtonText>Continuar</LoginButtonText>
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
              Ao continuar você concorda com nossos termos.
            </Disclaimer>
            <Disclaimer>Toque aqui para acessar.</Disclaimer>
          </TouchableOpacity>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(CompleteProfile);
