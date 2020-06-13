import React, { useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
  SafeAreaView,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import {
  Container,
  Header,
  Title,
  Form,
  EmailInput,
  PassInput,
  LoginButton,
  LoginButtonDisabled,
  LoginButtonText,
  Disclaimer,
  ChangePhoto,
  ChangePhotoBtn,
  ChangePhotoText,
  Avatar,
  Label,
} from './styles';

import ArrowBigLeftDark from '../../components/icons/ArrowBigLeftDark';

import { updateProfileRequest } from '../../store/modules/user/actions';

function EditProfile({ profile, navigation }) {
  const loading = useSelector((state) => state.user.loading);
  const [nome, Setnome] = useState(profile.name);
  const [bio, Setbio] = useState(String(profile.meta.last_name));
  const [insta, Setinsta] = useState(profile.url);
  const [password, SetPassword] = useState('');
  const [confirmpassword, SetConfirmpassword] = useState('');

  const [avatar, SetAvatar] = useState(profile.m_avatar);
  const [avatarsource, SetAvatarsource] = useState(profile.m_avatar);
  const [avatarupload, SetAvatarupload] = useState(profile.m_avatar);

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
    if (password != confirmpassword) {
      Alert.alert('Erro ao atualizar', 'As senhas não coincidem');
      return;
    }
    dispatch(
      updateProfileRequest({
        id: profile.id,
        nome,
        avatarupload,
        avatarsource,
        password,
        instagram: insta,
      })
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#2B3239' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          <Header>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <ArrowBigLeftDark />
            </TouchableOpacity>
            <Title>Editar perfil</Title>
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

            <Label>Diga ai seu insta</Label>
            <EmailInput
              keyboardType="default"
              autoCorrect={false}
              autoCapitalize="none"
              value={insta}
              onChangeText={Setinsta}
              placeholder="Lsink do seu insta"
            />
            <Disclaimer>
              Deixe os campos abaixo em branco para não atualizar.
            </Disclaimer>
            <Label>Senha</Label>
            <PassInput
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              value={password}
              onChangeText={SetPassword}
              placeholder="Crie uma senha"
            />
            <Label>Confirmar senha</Label>
            <PassInput
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="go"
              value={confirmpassword}
              onChangeText={SetConfirmpassword}
              placeholder="Confirme sua senha"
            />

            {loading ? (
              <LoginButtonDisabled>
                <ActivityIndicator color="#ffffff" szie={25} />
              </LoginButtonDisabled>
            ) : (
              <>
                {nome ? (
                  <>
                    <LoginButton onPress={handleSubmit}>
                      <LoginButtonText>Atualizar</LoginButtonText>
                    </LoginButton>
                  </>
                ) : (
                  <LoginButtonDisabled>
                    <LoginButtonText>Atualizar</LoginButtonText>
                  </LoginButtonDisabled>
                )}
              </>
            )}
          </Form>
        </Container>
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(EditProfile);
