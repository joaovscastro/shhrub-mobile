import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import Modal from 'react-native-modal';
import Lottie from 'lottie-react-native';

import api from '../../services/api';

import {
  Card,
  CardFooter,
  CardNameLight,
  ProfileAvatar,
  CardProfile,
  ComentBox,
  ComentContent,
  ComentAvatar,
  ComentName,
  NewComent,
  NewComentTitle,
  NewComentButton,
  NewComentButtonTitle,
  NewComentBox,
  PostButton,
  PostButtonDisabled,
  PostTitle,
  InputComent,
  BorraTrue,
  BorraTitleTrue,
} from './styles';

import ArrowBigLeft from '../../components/icons/ArrowBigLeft';
import VerifiedSeal from '../../components/icons/VerifiedSeal';
import Calmo from '../../../assets/animation/calmo.json';

export default function PostSingleActivity({ navigation }) {
  // Buscar notícia props
  const postsingle = navigation.getParam('postsingle');

  // Carregar comentários
  const [loading, Setloading] = useState(false);
  const [comments, Setcomments] = useState([]);
  const [page, Setpage] = useState(1);
  const [total, Settotal] = useState(0);
  const [refreshing, Setrefreshing] = useState(false);

  // Modal
  const [isModalVisible, setisModalVisible] = useState(false);

  const [comment, Setcomment] = useState('');
  const [loadpost, Setloadpost] = useState(false);

  async function loadComments(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    Setloading(true);

    const responseComments = await api.get(
      `wp/v2/comments?post=${postsingle._embedded['up'][0].id}&page=${pageNumber}&per_page=10&_embed`
    );

    const totalItems = responseComments.headers['x-wp-totalpages'];

    Settotal(totalItems);

    Setcomments(
      shouldRefresh
        ? responseComments.data
        : [...comments, ...responseComments.data]
    );
    Setpage(pageNumber + 1);
    Setloading(false);
  }

  useEffect(() => {
    loadComments();
    const navFocusListener = navigation.addListener('didFocus', () => {
      // API_CALL();
      loadComments();
    });

    return () => {
      navFocusListener.remove();
    };
  }, []);

  async function refreshList() {
    Setrefreshing(true);

    await loadComments(1, true);

    Setrefreshing(false);
  }

  handleNavigateProfile = (profilesingle) => {
    navigation.push('PublicProfile', { profilesingle });
  };

  async function postComment() {
    Setloadpost(true);
    try {
      await api.post('wp/v2/comments', {
        content: comment,
        post: postsingle.id,
      });
      await letEstado();
      setisModalVisible(false);
      Setcomment('');
    } catch (err) {
      if (err.message === 'Request failed with status code 400') {
        Alert.alert('Ops..', 'Parece que você não escreveu nada.');
      }
      if (err.message === 'Request failed with status code 409') {
        Alert.alert('Ops..', 'Parece que você ja comentou isso.');
      }
      Alert.alert('Ops..', 'Houve algum erro, tente novamente.');
    }
    Setloadpost(false);
  }

  toggleModalOpen = () => {
    setisModalVisible(true);
  };

  toggleModal = () => {
    setisModalVisible(false);
  };

  async function letEstado() {
    const responseComments = await api.get(
      `wp/v2/comments?post=${postsingle._embedded['up'][0].id}&page=1&per_page=10&_embed`
    );

    Setcomments(responseComments.data);
  }

  const HeaderList = (
    <View>
      <Card
        style={{
          backgroundColor: postsingle._embedded['up'][0].title.rendered,
        }}
      >
        <TouchableOpacity
          style={{ marginBottom: 20 }}
          onPress={() => navigation.goBack()}
        >
          <ArrowBigLeft />
        </TouchableOpacity>

        <HTML
          ignoredTags={[...IGNORED_TAGS, 'img', 'iframe', 'script', 'span']}
          tagsStyles={{
            p: {
              fontFamily: 'SF Pro Text',
              fontWeight: '600',
              color: '#060606',
              fontSize: 16,
              marginBottom: 25,
            },
          }}
          html={postsingle._embedded['up'][0].excerpt.rendered}
        />
        <CardFooter>
          <CardProfile>
            {postsingle.format === 'quote' ? (
              <BorraTrue>
                <BorraTitleTrue>Nome borrado</BorraTitleTrue>
              </BorraTrue>
            ) : (
              <>
                <ProfileAvatar
                  source={{
                    uri: postsingle._embedded['author'][0].avatar_urls[48],
                  }}
                />
                <CardNameLight>
                  {postsingle._embedded['author'][0].name}
                </CardNameLight>
                {postsingle._embedded['author'][0].acf.verified === 'yes' ? (
                  <VerifiedSeal />
                ) : (
                  <View />
                )}
              </>
            )}
          </CardProfile>
        </CardFooter>
      </Card>
      <NewComent>
        <NewComentTitle>Comentários ({comments.length})</NewComentTitle>
        <NewComentButton onPress={() => toggleModalOpen()}>
          <NewComentButtonTitle>Comentar</NewComentButtonTitle>
        </NewComentButton>
      </NewComent>
    </View>
  );

  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#2B3239' }}>
        <FlatList
          data={comments}
          keyExtractor={(post) => String(post.id)}
          onEndReached={() => loadComments()}
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
            <View>
              <ComentBox onPress={() => handleNavigateProfile(item)}>
                <ComentAvatar source={{ uri: item.author_avatar_urls['24'] }} />
                <ComentContent>
                  <View style={{ flexDirection: 'row' }}>
                    <ComentName>{item._embedded['author'][0].name}</ComentName>
                    {item._embedded['author'][0].acf.verified === 'yes' ? (
                      <VerifiedSeal />
                    ) : (
                      <View />
                    )}
                  </View>

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
                        fontWeight: 'normal',
                        color: '#ffffff',
                        fontSize: 14,
                      },
                    }}
                    html={item.content.rendered}
                  />
                </ComentContent>
              </ComentBox>
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
        isVisible={isModalVisible}
        onBackdropPress={() => toggleModal()}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <NewComentBox>
          <ScrollView showsVerticalScrollIndicator={false}>
            <InputComent
              placeholder="Digite seu comentário"
              autoCorrect={false}
              numberOfLines={5}
              multiline
              textAlignVertical="top"
              maxLength={200}
              onChangeText={Setcomment}
              value={comment}
              returnKeyType="go"
              blurOnSubmit={true}
              onSubmitEditing={() => postComment()}
            />

            {loadpost ? (
              <PostButtonDisabled>
                <ActivityIndicator color="#ffffff" size={25} />
              </PostButtonDisabled>
            ) : (
              <>
                {comment === '' ? (
                  <PostButtonDisabled>
                    <PostTitle>Comentar</PostTitle>
                  </PostButtonDisabled>
                ) : (
                  <PostButton onPress={() => postComment()}>
                    <PostTitle>Comentar</PostTitle>
                  </PostButton>
                )}
              </>
            )}
          </ScrollView>
        </NewComentBox>
      </Modal>
    </>
  );
}
