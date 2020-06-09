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
  Disclaimer,
  DisclaimerText,
  ButtonFriendRemove,
  ButtonFriendRemoveText,
} from './styles';

import Menu from '../../components/icons/Menu';
import VerifiedSeal from '../../components/icons/VerifiedSeal';
import AvatarTeste from '../../../assets/img/avatar-teste.png';
import Insta from '../../../assets/img/instaicon.png';
import CommentBubble from '../../components/icons/CommentBubble';
import Calmo from '../../../assets/animation/calmo.json';
import RemoveIcon from '../../components/icons/Remove';
import NotifyIcon from '../../components/icons/NotifyIcon';
NotifyIcon;

function PrivateProfile({ profile, navigation }) {
  const [loading, Setloading] = useState(false);
  const [noticias, Setnoticias] = useState([]);
  const [page, Setpage] = useState(1);
  const [total, Settotal] = useState(0);
  const [refreshing, Setrefreshing] = useState(false);

  const [loadingdelete, Setloadingdelete] = useState(false);

  // load posts
  async function loadPosts(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    Setloading(true);

    const responseNoticias = await api.get(
      `wp/v2/posts?author=${profile.id}&page=${pageNumber}&per_page=5&_embed`
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
    const navFocusListener = navigation.addListener('didFocus', () => {
      // API_CALL();
      loadPosts();
    });

    return () => {
      navFocusListener.remove();
    };
  }, []);

  async function refreshList() {
    Setrefreshing(true);

    await loadPosts(1, true);

    Setrefreshing(false);
  }

  function deletarPost(idpost) {
    Alert.alert(
      'Deseja realmente excluir?',
      'O post será excluído',
      [{ text: 'Não' }, { text: 'Sim', onPress: () => deletePost(idpost) }],
      { cancelable: false }
    );
  }

  async function deletePost(idpost) {
    Setloadingdelete(true);
    await api.delete(`/wp/v2/posts/${idpost}`);
    const responsePosts = await api.get(
      `wp/v2/posts?author=${profile.id}&per_page=5&_embed`
    );

    Setnoticias(responsePosts.data);
    Setloadingdelete(false);
  }

  handleNavigatePostProfilePrivate = (postsingle) => {
    navigation.push('PostSingle', { postsingle });
  };

  handleNavigateEditProfile = () => {
    navigation.push('EditProfile');
  };

  handleNavigateMore = () => {
    navigation.push('More');
  };

  handleNavigateActivity = () => {
    navigation.push('Activity');
  };

  const HeaderList = (
    <Disclaimer>
      <DisclaimerText>
        Somente você pode visualizar seus posts anônimos.
      </DisclaimerText>
    </Disclaimer>
  );

  return (
    <Container>
      <SafeAreaView>
        <Header>
          <Title>Perfil</Title>
          <TouchableOpacity
            onPress={() => handleNavigateActivity()}
            style={{ marginRight: 25 }}
          >
            <NotifyIcon />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleNavigateMore()}>
            <Menu />
          </TouchableOpacity>
        </Header>
        <ProfileBox>
          <ProfileAvatar source={{ uri: profile.m_avatar }} />
          <ProfileContent>
            <ProfileNameBox>
              <ProfileName>{profile.name}</ProfileName>
              {profile.acf.verified === 'yes' ? <VerifiedSeal /> : <View />}
            </ProfileNameBox>
            <BioText>{profile.last_name}</BioText>
            <ProfileButtonsBox>
              <InstaButton onPress={() => Linking.openURL(profile.url)}>
                <InstaIcon source={Insta} />
              </InstaButton>
              <EditButton onPress={() => handleNavigateEditProfile()}>
                <EditButtonText>Editar perfil</EditButtonText>
              </EditButton>
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
          ListHeaderComponent={HeaderList}
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
              <Card style={{ backgroundColor: item.title.rendered }}>
                <View
                  style={{
                    alignItems: 'flex-end',
                  }}
                >
                  {loadingdelete ? (
                    <ActivityIndicator color="#000" size={25} />
                  ) : (
                    <TouchableOpacity onPress={() => deletarPost(item.id)}>
                      <RemoveIcon />
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity
                  onPress={() => handleNavigatePostProfilePrivate(item)}
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
                            source={{
                              uri: item._embedded['author'][0].m_avatar,
                            }}
                          />
                          <CardNameLight>
                            {item._embedded['author'][0].name}
                          </CardNameLight>
                          {item._embedded['author'][0].acf.verified ===
                          'yes' ? (
                            <VerifiedSeal />
                          ) : (
                            <View />
                          )}
                        </>
                      )}
                    </CardProfile>
                    <CommentBubble />
                  </CardFooter>
                </TouchableOpacity>
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

export default connect(mapStateToProps)(PrivateProfile);
