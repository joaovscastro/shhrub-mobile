import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from 'react-native';
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
  ButtonFriend,
  ButtonFriendText,
  ButtonFriendRequest,
  ButtonFriendRequestText,
  ButtonFriendAccept,
  ButtonFriendAcceptText,
  ButtonFriendRemove,
  ButtonFriendRemoveText,
  NewComentBox,
  PostButton,
  PostButtonDisabled,
  PostTitle,
  InputComent,
} from './styles';

import ArrowRightGray from '../../components/icons/ArrowRightGray';
import ArrowBigLeftDark from '../../components/icons/ArrowBigLeftDark';
import AvatarTeste from '../../../assets/img/avatar-teste.png';

function Friends({ navigation, profile }) {
  const [loading, Setloading] = useState(false);
  const [noticias, Setnoticias] = useState([]);
  const [page, Setpage] = useState(1);
  const [total, Settotal] = useState(0);
  const [refreshing, Setrefreshing] = useState(false);

  // Modal
  const [isModalVisible, setisModalVisible] = useState(false);
  const [comment, Setcomment] = useState('');
  const [loadpost, Setloadpost] = useState(false);
  const [idusuario, Setidusuario] = useState();

  async function loadPosts(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    Setloading(true);

    const responseNoticias = await api.get(
      `/buddypress/v1/friends?page=${pageNumber}&per_page=10&_embed`
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

  handleNavigateMessage = (messagesingle) => {
    navigation.push('MessageSingle', { messagesingle });
  };

  async function aceitarAmizade(amizadeid) {
    await api.put(`buddypress/v1/friends/${amizadeid}`);
  }

  toggleModalOpen = (userid) => {
    Setidusuario(userid);
    console.log(userid);
    setisModalVisible(true);
  };

  toggleModal = () => {
    setisModalVisible(false);
  };

  async function removerSolicitacao(idamizade) {
    await api.delete(`buddypress/v1/friends/${idamizade}`);
  }

  async function removerAmizade(idamizadeuser) {
    await api.delete(`buddypress/v1/friends/${idamizadeuser}`, {
      force: true,
    });
  }

  async function newMessage() {
    Setloadpost(true);
    try {
      await api.post('/buddypress/v1/messages', {
        message: comment,
        recipients: [idusuario, profile.id],
        sender_id: profile.id,
      });
      setisModalVisible(false);
      Setcomment('');
    } catch (err) {
      Alert.alert('Ops..', 'Houve algum erro, tente novamente.');
    }
    Setloadpost(false);
    Alert.alert('Mensagem enviada', 'Aguarde seu amigo responder.');
  }

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBigLeftDark />
          </TouchableOpacity>
          <Title>Amigos</Title>
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
              <MessageBox>
                {item.friend_id === profile.id ? (
                  <MessageAvatar
                    source={{
                      uri: item._embedded['initiator'][0].avatar_urls.thumb,
                    }}
                  />
                ) : (
                  <MessageAvatar
                    source={{
                      uri: item._embedded['friend'][0].avatar_urls.thumb,
                    }}
                  />
                )}

                {item.friend_id === profile.id ? (
                  <MessageContent>
                    {item._embedded['initiator'][0].name}
                  </MessageContent>
                ) : (
                  <MessageContent>
                    {item._embedded['friend'][0].name}
                  </MessageContent>
                )}

                {item.initiator_id === profile.id ? (
                  <>
                    {item.is_confirmed ? (
                      <>
                        <ButtonFriend
                          onPress={() => toggleModalOpen(item.friend_id)}
                        >
                          <ButtonFriendText>Mensagem</ButtonFriendText>
                        </ButtonFriend>
                      </>
                    ) : (
                      <ButtonFriendRequest>
                        <ButtonFriendRequestText>
                          Solicitação enviada
                        </ButtonFriendRequestText>
                      </ButtonFriendRequest>
                    )}
                  </>
                ) : (
                  <>
                    {item.is_confirmed ? (
                      <>
                        <ButtonFriend
                          onPress={() => toggleModalOpen(item.friend_id)}
                        >
                          <ButtonFriendText>Mensagem</ButtonFriendText>
                        </ButtonFriend>
                      </>
                    ) : (
                      <>
                        <ButtonFriendRemove
                          onPress={() => removerSolicitacao(item.initiator_id)}
                        >
                          <ButtonFriendRemoveText>
                            Remover
                          </ButtonFriendRemoveText>
                        </ButtonFriendRemove>
                        <ButtonFriendAccept
                          onPress={() => aceitarAmizade(item.initiator_id)}
                        >
                          <ButtonFriendAcceptText>
                            Aceitar
                          </ButtonFriendAcceptText>
                        </ButtonFriendAccept>
                      </>
                    )}
                  </>
                )}
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
              placeholder="Digite sua mensagem"
              autoCorrect={false}
              numberOfLines={5}
              multiline
              textAlignVertical="top"
              maxLength={200}
              onChangeText={Setcomment}
              value={comment}
              returnKeyType="go"
              blurOnSubmit={true}
              onSubmitEditing={() => newMessage()}
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
                  <PostButton onPress={() => newMessage()}>
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

export default connect(mapStateToProps)(Friends);
