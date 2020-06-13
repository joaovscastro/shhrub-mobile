import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  FlatList,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import HTML from 'react-native-render-html';
import Lottie from 'lottie-react-native';

import { updateProfileRequest } from '../../store/modules/user/actions';
import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  ProfileBox,
  ProfileAvatar,
  ProfileContent,
  ProfileNameBox,
  ProfileName,
  ProfileButtonsBox,
  InstaButton,
  InstaIcon,
  EditButton,
  EditButtonText,
  BioText,
  Card,
  CardYellow,
  CardPink,
  CardTitleLight,
  CardFooter,
  CardProfile,
  CardNameLight,
  CardTitleDark,
  ProfileAvatarTwo,
  BorraTrue,
  BorraTitleTrue,
  AddFriendButton,
  ButtonFriend,
  ButtonFriendText,
  NewComentBox,
  ReportTitle,
  ReportTitleTwo,
  NewReportTitle,
  ReportTitleThree,
} from './styles';

import Menu from '../../components/icons/Menu';
import VerifiedSeal from '../../components/icons/VerifiedSeal';
import VerifiedSealBig from '../../components/icons/VerifiedSealBig';
import AvatarTeste from '../../../assets/img/avatar-teste.png';
import Insta from '../../../assets/img/instaicon.png';
import CommentBubble from '../../components/icons/CommentBubble';
import Calmo from '../../../assets/animation/calmo.json';
import ArrowBigLeftDark from '../../components/icons/ArrowBigLeftDark';
import ReportIconDark from '../../components/icons/ReportIconDark';

function PublicProfile({ profile, navigation, sensitive }) {
  // Buscar notícia props
  const profilesingle = navigation.getParam('profilesingle');
  const rota = navigation.getParam('rota');

  const [loading, Setloading] = useState(false);
  const [noticias, Setnoticias] = useState([]);
  const [page, Setpage] = useState(1);
  const [total, Settotal] = useState(0);
  const [refreshing, Setrefreshing] = useState(false);

  const [loadfriend, Setloadfriend] = useState(false);
  const [friend, Setfriend] = useState(false);
  const [requestfriend, Setrequestfriend] = useState(false);

  // report
  const [loadingreport, Setloadingreport] = useState(false);
  const [isModalVisibleReport, setisModalVisibleReport] = useState(false);

  // load posts
  async function loadPosts(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    Setloading(true);

    const responseNoticias = await api.get(
      `wp/v2/posts?author=${profilesingle.author}&tags=33&page=${pageNumber}&per_page=5&_embed&categories_exclude=${sensitive.tame}`
    );

    const totalItems = responseNoticias.headers['x-wp-totalpages'];

    Settotal(totalItems);

    Setnoticias(
      shouldRefresh
        ? responseNoticias.data
        : [...noticias, ...responseNoticias.data]
    );
    Setpage(pageNumber + 1);
    Setloading(false);
  }

  useEffect(() => {
    loadPosts();
    checkFriend();
  }, []);

  async function refreshList() {
    Setrefreshing(true);

    await loadPosts(1, true);

    Setrefreshing(false);
  }

  async function checkFriend() {
    Setloadfriend(true);
    const responseFriend = await api.get(
      `/buddypress/v1/members/${profilesingle.author}`
    );

    try {
      await api.get(`/buddypress/v1/friends/${profilesingle.author}`);
      Setrequestfriend(true);
    } catch (err) {
      Setrequestfriend(false);
    }

    Setfriend(responseFriend.data);
    Setloadfriend(false);
  }

  handleNavigatePostProfile = (postsingle) => {
    navigation.push('PostSingle', { postsingle });
  };

  async function addFriend() {
    Setloadfriend(true);
    try {
      await api.post('/buddypress/v1/friends', {
        context: 'edit',
        initiator_id: profile.id,
        friend_id: profilesingle.author,
      });
      Setloadfriend(false);
      Setrequestfriend(true);
    } catch (err) {
      Setloadfriend(false);
      Alert.alert('Ops..', 'Houve algum erro, tente novamente.');
    }
  }

  toggleModalOpenReport = () => {
    setisModalVisibleReport(true);
  };

  toggleModalReport = () => {
    setisModalVisibleReport(false);
  };

  async function resportPost(motivo) {
    Setloadingreport(true);
    try {
      await api.post('/wp/v2/denuncia', {
        title: 'Nova denúncia',
        content: `Usuário de ID ${profile.id} denunciou o usuário de ID ${profilesingle.author} por motivos de ${motivo}`,
        status: 'publish',
      });
      Alert.alert(
        'Denuncia envidada',
        'Obrigado!',
        [{ text: 'Ok', onPress: () => navigation.goBack() }],
        { cancelable: false }
      );
    } catch (err) {
      Alert.alert('Ops..', 'Houve algum erro, tente novamente.');
    }
    Setloadingreport(false);
  }

  const dispatch = useDispatch();

  function bloquearUser() {
    Alert.alert(
      'Deseja realmente bloquear esse usuário?',
      'Essa ação não pode ser desfeita.',
      [{ text: 'Não' }, { text: 'Sim', onPress: () => reportUserRequest() }],
      { cancelable: false }
    );
  }

  function reportUserRequest() {
    dispatch(
      updateProfileRequest({
        id: profile.id,
        biografia: `${profile.meta.last_name},${profilesingle.author}`,
        instagram: profile.url,
      })
    );
    Alert.alert(
      'Usuário bloqueado',
      'Você não verá mais conteúdo desse usuário.',
      [{ text: 'Ok', onPress: () => reportUser() }],
      { cancelable: false }
    );
  }

  function reportUser() {
    setisModalVisibleReport(false);
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: rota })],
    });
    navigation.dispatch(resetAction);
  }

  return (
    <Container>
      <SafeAreaView>
        <Header>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flex: 1 }}
          >
            <ArrowBigLeftDark />
          </TouchableOpacity>
          {profile.id === profilesingle.author ? (
            <View />
          ) : (
            <>
              {loadingreport ? (
                <View style={{ marginBottom: 20 }}>
                  <ActivityIndicator color="#000" size={25} />
                </View>
              ) : (
                <TouchableOpacity
                  style={{ marginBottom: 20 }}
                  onPress={() => toggleModalOpenReport()}
                >
                  <ReportIconDark />
                </TouchableOpacity>
              )}
            </>
          )}
        </Header>
        <ProfileBox>
          <ProfileAvatar
            source={{ uri: profilesingle._embedded['author'][0].m_avatar }}
          />
          <ProfileContent>
            <ProfileNameBox>
              <ProfileName>
                {profilesingle._embedded['author'][0].name}
              </ProfileName>
              {profilesingle._embedded['author'][0].acf.verified === 'yes' ? (
                <VerifiedSealBig />
              ) : (
                <View />
              )}
            </ProfileNameBox>

            <ProfileButtonsBox>
              <InstaButton
                onPress={() =>
                  Linking.openURL(profilesingle._embedded['author'][0].url)
                }
              >
                <InstaIcon source={Insta} />
              </InstaButton>
              {loadfriend ? (
                <AddFriendButton>
                  <ActivityIndicator size={15} color="#ffffff" />
                </AddFriendButton>
              ) : (
                <>
                  {friend.friendship_status === false ? (
                    <>
                      {profile.id === profilesingle.author ? (
                        <ButtonFriend>
                          <ButtonFriendText>Este é você!</ButtonFriendText>
                        </ButtonFriend>
                      ) : (
                        <>
                          {requestfriend ? (
                            <AddFriendButton>
                              <EditButtonText>
                                Solicitação pendente
                              </EditButtonText>
                            </AddFriendButton>
                          ) : (
                            <AddFriendButton onPress={() => addFriend()}>
                              <EditButtonText>Adicionar</EditButtonText>
                            </AddFriendButton>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <ButtonFriend>
                      <ButtonFriendText>Amigos</ButtonFriendText>
                    </ButtonFriend>
                  )}
                </>
              )}
            </ProfileButtonsBox>
          </ProfileContent>
        </ProfileBox>
      </SafeAreaView>
      <View style={{ marginLeft: 20, marginRight: 20, marginTop: 20 }}>
        <Text
          style={{
            fontFamily: 'SF Pro Text',
            fontWeight: 'normal',
            fontSize: 13,
            letterSpacing: 1,
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: 20,
          }}
        >
          Publicações
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          style={{ marginBottom: 0 }}
          data={noticias}
          keyExtractor={(post) => String(post.id)}
          onEndReached={() => loadPosts()}
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          ListFooterComponent={
            loading && (
              <View>
                <ActivityIndicator color="#ffffff" size={60} />
              </View>
            )
          }
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <View style={{ marginLeft: 20, marginRight: 20 }}>
              <Card
                style={{ backgroundColor: item.title.rendered }}
                onPress={() => handleNavigatePostProfile(item)}
              >
                <HTML
                  tagsStyles={{
                    p: {
                      fontFamily: 'SF Pro Text',
                      fontWeight: '600',
                      color: '#060606',
                      fontSize: 16,
                      marginBottom: 25,
                    },
                  }}
                  html={item.content.rendered}
                />
                <CardFooter>
                  <CardProfile>
                    {item.format === 'quote' ? (
                      <BorraTrue>
                        <BorraTitleTrue>Nome borrado</BorraTitleTrue>
                      </BorraTrue>
                    ) : (
                      <>
                        <ProfileAvatarTwo
                          source={{ uri: item._embedded['author'][0].m_avatar }}
                        />
                        <CardNameLight>
                          {item._embedded['author'][0].name}
                        </CardNameLight>
                        {item._embedded['author'][0].acf.verified === 'yes' ? (
                          <VerifiedSeal />
                        ) : (
                          <View />
                        )}
                      </>
                    )}
                  </CardProfile>
                  <CommentBubble />
                </CardFooter>
              </Card>
            </View>
          )}
          ListEmptyComponent={() => (
            <>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <Lottie
                  resizeMode="contain"
                  autoSize
                  source={Calmo}
                  autoPlay
                  loop={true}
                  style={{
                    width: 360,
                    height: 128,
                  }}
                />
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'SF Pro Text',
                    fontWeight: 'normal',
                    fontSize: 16,
                  }}
                >
                  Está tudo tão calmo por aqui...
                </Text>
              </View>
            </>
          )}
        />
      </View>
      <Modal
        isVisible={isModalVisibleReport}
        onBackdropPress={() => toggleModalReport()}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >
        <NewComentBox style={{ paddingBottom: 50 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <NewReportTitle>Denunciar</NewReportTitle>
            <ReportTitleTwo>Nos ajude a entender melhor</ReportTitleTwo>
            {loadingreport ? (
              <ActivityIndicator color="#ffffff" size={25} />
            ) : (
              <>
                <TouchableOpacity onPress={() => bloquearUser()}>
                  <ReportTitleThree>Bloquear usuário</ReportTitleThree>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => resportPost('Nudez ou atividade sexual')}
                >
                  <ReportTitle>Nudez ou atividade sexual</ReportTitle>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => resportPost('Discurso de ódio')}
                >
                  <ReportTitle>Discurso de ódio</ReportTitle>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => resportPost('Bullyng ou assédio')}
                >
                  <ReportTitle>Bullyng ou assédio</ReportTitle>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() =>
                    resportPost('Violação de propriedade intelectual')
                  }
                >
                  <ReportTitle>Violação de propriedade intelectual</ReportTitle>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => resportPost('Suicídio')}>
                  <ReportTitle>Suicídio</ReportTitle>
                </TouchableOpacity>
              </>
            )}

            <View style={{ marginBottom: 80 }} />
          </ScrollView>
        </NewComentBox>
      </Modal>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
  sensitive: state.user.sensitivecontent,
});

export default connect(mapStateToProps)(PublicProfile);
