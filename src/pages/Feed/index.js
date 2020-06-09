import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  View,
  SafeAreaView,
  FlatList,
  Alert,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
} from 'react-native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import Modal from 'react-native-modal';

import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  NewPostButton,
  NewPostTitle,
  Card,
  CardFooter,
  CardProfile,
  CardNameLight,
  ProfileAvatar,
  BorraTrue,
  BorraTitleTrue,
  ContainerPost,
  HeaderPost,
  TitlePost,
  NewPostButtonPost,
  CardYellowPost,
  CardTitleLightPost,
  CardFooterPost,
  CardProfilePost,
  CardNameLightPost,
  BorraButtonPost,
  BorraButtonPostTrue,
  BorraTitlePost,
  BorraTitlePostTrue,
  ThemeTitlePost,
  LoginButton,
  LoginButtonDisabled,
  LoginButtonText,
} from './styles';

import Close from '../../components/icons/Close';
import CommentBubble from '../../components/icons/CommentBubble';
import VerifiedSeal from '../../components/icons/VerifiedSeal';

function Feed({ navigation, profile }) {
  const [loading, Setloading] = useState(false);
  const [noticias, Setnoticias] = useState([]);
  const [page, Setpage] = useState(1);
  const [total, Settotal] = useState(0);
  const [refreshing, Setrefreshing] = useState(false);

  const [themeColor, SetthemeColor] = useState('#ffffff');
  const [impala, Setimpala] = useState('');
  const [borra, Setborra] = useState('status');
  const [tag, Setag] = useState(33);

  const [loadnewpost, Setloadnewpost] = useState(false);

  const [isModalVisible2, setisModalVisible2] = useState(false);

  async function loadPosts(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    Setloading(true);

    const responseNoticias = await api.get(
      `wp/v2/posts?page=${pageNumber}&per_page=5&categories=1&_embed`
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
  }, []);

  async function refreshList() {
    Setrefreshing(true);

    await loadPosts(1, true);

    Setrefreshing(false);
  }

  toggleModalOpen2 = () => {
    setisModalVisible2(true);
  };

  toggleModal2 = () => {
    setisModalVisible2(false);
  };

  handleNavigatePost = (postsingle) => {
    navigation.push('PostSingle', { postsingle });
  };

  function borraMeuNome() {
    Setborra('quote');
    Setag(34);
  }

  function desborraMeuNome() {
    Setborra('status');
    Setag(33);
  }

  async function createPost() {
    Setloadnewpost(true);
    try {
      await api.post('/wp/v2/posts', {
        title: themeColor,
        content: impala,
        status: 'publish',
        format: borra,
        tags: tag,
      });

      const responsePosts = await api.get(
        `wp/v2/posts?page=1&per_page=5&categories=1&_embed`
      );

      Setnoticias(responsePosts.data);
      setisModalVisible2(false);
      Setimpala('');
    } catch (err) {
      if (err.message === 'Request failed with status code 400') {
        Alert.alert('Ops..', 'Parece que você não escreveu nada.');
      }
      if (err.message === 'Request failed with status code 409') {
        Alert.alert('Ops..', 'Parece que você ja comentou isso.');
      }
      Alert.alert('Ops..', 'Houve algum erro, tente novamente.');
    }
    Setloadnewpost(false);
  }

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <Title>Feed</Title>
          <NewPostButton onPress={() => toggleModalOpen2()}>
            <NewPostTitle>Novo post</NewPostTitle>
          </NewPostButton>
        </Header>
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
            <View>
              <Card
                style={{ backgroundColor: item.title.rendered }}
                onPress={() => handleNavigatePost(item)}
              >
                <HTML
                  ignoredTags={[
                    ...IGNORED_TAGS,
                    'img',
                    'iframe',
                    'script',
                    'span',
                  ]}
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
                        <ProfileAvatar
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
        />
      </SafeAreaView>
      <Modal
        isVisible={isModalVisible2}
        onBackdropPress={() => toggleModal2()}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            backgroundColor: '#2b3239',
            borderRadius: 8,
            marginTop: 80,
          }}
        >
          <ContainerPost>
            <HeaderPost>
              <TitlePost>Novo post</TitlePost>
              <NewPostButtonPost onPress={() => toggleModal2()}>
                <Close />
              </NewPostButtonPost>
            </HeaderPost>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 30,
              }}
            >
              <ThemeTitlePost>Tema</ThemeTitlePost>
              <TouchableOpacity
                onPress={() => SetthemeColor('#FFFFFF')}
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: '#FFFFFF',
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              />
              <TouchableOpacity
                onPress={() => SetthemeColor('#fbc932')}
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: '#fbc932',
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              />
              <TouchableOpacity
                onPress={() => SetthemeColor('#FD84AD')}
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: '#FD84AD',
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              />
              <TouchableOpacity
                onPress={() => SetthemeColor('#5281F0')}
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: '#5281F0',
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              />
              <TouchableOpacity
                onPress={() => SetthemeColor('#2AEAA9')}
                style={{
                  width: 25,
                  height: 25,
                  backgroundColor: '#2AEAA9',
                  borderRadius: 20,
                  marginLeft: 10,
                }}
              />
            </View>
            <CardYellowPost style={{ backgroundColor: themeColor }}>
              <TextInput
                placeholder="O que está pensando?"
                autoCorrect={false}
                style={{
                  height: 150,
                  padding: 10,
                  fontFamily: 'SF Pro Text',
                  fontWeight: 'bold',
                  color: '#060606',
                  fontSize: 14,
                }}
                numberOfLines={5}
                multiline
                textAlignVertical="top"
                maxLength={200}
                onChangeText={Setimpala}
                value={impala}
                returnKeyType="done"
                blurOnSubmit={true}
              />
              <CardTitleLightPost>{impala.length}/200</CardTitleLightPost>
              <CardFooterPost>
                <CardProfilePost>
                  {borra === 'quote' ? (
                    <>
                      <View style={{ flex: 1 }} />
                      <BorraButtonPostTrue onPress={() => desborraMeuNome()}>
                        <BorraTitlePostTrue>Nome borrado</BorraTitlePostTrue>
                      </BorraButtonPostTrue>
                    </>
                  ) : (
                    <>
                      <Image
                        source={{ uri: profile.m_avatar }}
                        style={{ width: 26, height: 26, borderRadius: 13 }}
                      />
                      <CardNameLightPost>{profile.name}</CardNameLightPost>
                      <BorraButtonPost onPress={() => borraMeuNome()}>
                        <BorraTitlePost>Borra meu nome</BorraTitlePost>
                      </BorraButtonPost>
                    </>
                  )}
                </CardProfilePost>
              </CardFooterPost>
            </CardYellowPost>
            {loadnewpost ? (
              <LoginButtonDisabled>
                <ActivityIndicator color="#fff" size={15} />
              </LoginButtonDisabled>
            ) : (
              <>
                {impala === '' ? (
                  <LoginButtonDisabled>
                    <LoginButtonText>Publicar</LoginButtonText>
                  </LoginButtonDisabled>
                ) : (
                  <LoginButton onPress={() => createPost()}>
                    <LoginButtonText>Publicar</LoginButtonText>
                  </LoginButton>
                )}
              </>
            )}
          </ContainerPost>
        </ScrollView>
      </Modal>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(Feed);
