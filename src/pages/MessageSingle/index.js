import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
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
  MessageBox,
  MessageAvatar,
  MessageContent,
  NewComentBox,
  PostButton,
  PostButtonDisabled,
  PostTitle,
  InputComent,
} from './styles';

import ArrowRight from '../../components/icons/ArrowRight';

import AvatarTeste from '../../../assets/img/avatar-teste.png';
import ArrowBigLeftDark from '../../components/icons/ArrowBigLeftDark';

function MessageSingle({ navigation, profile }) {
  const messagesingle = navigation.getParam('messagesingle');

  const [loading, Setloading] = useState(false);
  const [noticias, Setnoticias] = useState([]);
  const [page, Setpage] = useState(1);
  const [total, Settotal] = useState(0);
  const [refreshing, Setrefreshing] = useState(false);

  // Modal
  const [isModalVisible, setisModalVisible] = useState(false);
  const [comment, Setcomment] = useState('');
  const [loadpost, Setloadpost] = useState(false);

  async function loadPosts(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    Setloading(true);

    const responseNoticias = await api.get(
      `/buddypress/v1/messages/${messagesingle.id}?page=${pageNumber}`
    );

    const totalItems = responseNoticias.headers['x-wp-totalpages'];

    Settotal(totalItems);

    Setnoticias(
      shouldRefresh
        ? responseNoticias.data[0].messages
        : [...noticias, ...responseNoticias.data[0].messages]
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

  async function postComment() {
    Setloadpost(true);
    try {
      await api.post('/buddypress/v1/messages', {
        id: messagesingle.id,
        message: comment,
        recipients: messagesingle.dateFormatted[1],
        sender_id: profile.id,
      });
      await letEstado();
      setisModalVisible(false);
      Setcomment('');
    } catch (err) {
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
      `/buddypress/v1/messages/${messagesingle.id}`
    );

    Setnoticias(responseComments.data[0].messages);
  }

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBigLeftDark />
          </TouchableOpacity>
          <Title>Mensagem</Title>
          <NewPostButton onPress={() => toggleModalOpen()}>
            <NewPostTitle>Responder</NewPostTitle>
          </NewPostButton>
        </Header>
        <FlatList
          style={{ marginBottom: 0 }}
          data={noticias}
          keyExtractor={(post) => String(post.id)}
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
              <MessageBox>
                <MessageAvatar
                  source={{
                    uri:
                      messagesingle.recipients[item.sender_id].user_avatars
                        .thumb,
                  }}
                />
                <View>
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
                        marginLeft: 10,
                      },
                    }}
                    html={item.message.rendered}
                  />
                </View>
              </MessageBox>
            </View>
          )}
        />
      </SafeAreaView>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => toggleModal()}
        style={{ justifyContent: 'flex-end', margin: 0 }}
      >
        <NewComentBox>
          <ScrollView showsVerticalScrollIndicator={false}>
            <InputComent
              placeholder="Escreva sua mensagem"
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
                    <PostTitle>Enviar</PostTitle>
                  </PostButtonDisabled>
                ) : (
                  <PostButton onPress={() => postComment()}>
                    <PostTitle>Enviar</PostTitle>
                  </PostButton>
                )}
              </>
            )}
          </ScrollView>
        </NewComentBox>
      </Modal>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(MessageSingle);
