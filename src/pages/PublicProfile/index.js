import React, { useState, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  SafeAreaView,
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import HTML from 'react-native-render-html';
import Lottie from 'lottie-react-native';

import { signOut } from '../../store/modules/auth/actions';
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
} from './styles';

import Menu from '../../components/icons/Menu';
import VerifiedSeal from '../../components/icons/VerifiedSeal';
import VerifiedSealBig from '../../components/icons/VerifiedSealBig';
import AvatarTeste from '../../../assets/img/avatar-teste.png';
import Insta from '../../../assets/img/instaicon.png';
import CommentBubble from '../../components/icons/CommentBubble';
import Calmo from '../../../assets/animation/calmo.json';
import ArrowBigLeftDark from '../../components/icons/ArrowBigLeftDark';

function PublicProfile({ profile, navigation }) {
  // Buscar notícia props
  console.log(profile.id);
  const profilesingle = navigation.getParam('profilesingle');

  const [loading, Setloading] = useState(false);
  const [noticias, Setnoticias] = useState([]);
  const [page, Setpage] = useState(1);
  const [total, Settotal] = useState(0);
  const [refreshing, Setrefreshing] = useState(false);

  const [loadfriend, Setloadfriend] = useState(false);
  const [friend, Setfriend] = useState(false);
  const [requestfriend, Setrequestfriend] = useState(false);

  // load posts
  async function loadPosts(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    Setloading(true);

    const responseNoticias = await api.get(
      `wp/v2/posts?author=${profilesingle.author}&tags=33&page=${pageNumber}&per_page=5&_embed`
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

  return (
    <Container>
      <SafeAreaView>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBigLeftDark />
          </TouchableOpacity>
        </Header>
        <ProfileBox>
          <ProfileAvatar
            source={{ uri: profilesingle._embedded['author'][0].m_avatar }}
          />
          <ProfileContent>
            <ProfileNameBox>
              <ProfileName>{profilesingle.author_name}</ProfileName>
              {profilesingle._embedded['author'][0].acf.verified === 'yes' ? (
                <VerifiedSealBig />
              ) : (
                <View />
              )}
            </ProfileNameBox>
            <BioText>{profilesingle.meta.last_name}</BioText>
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
                          <ButtonFriendText>Olha eu aí</ButtonFriendText>
                        </ButtonFriend>
                      ) : (
                        <>
                          {requestfriend ? (
                            <AddFriendButton>
                              <EditButtonText>
                                Solicitação enviada
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
    </Container>
  );
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(PublicProfile);
