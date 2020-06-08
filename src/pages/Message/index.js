import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  View,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';

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
} from './styles';

import ArrowRightGray from '../../components/icons/ArrowRightGray';

import AvatarTeste from '../../../assets/img/avatar-teste.png';

function Message({ navigation, profile }) {
  const [loading, Setloading] = useState(false);
  const [noticias, Setnoticias] = useState([]);
  const [page, Setpage] = useState(1);
  const [total, Settotal] = useState(0);
  const [refreshing, Setrefreshing] = useState(false);

  async function loadPosts(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    Setloading(true);

    const responseNoticias = await api.get(
      `/buddypress/v1/messages?page=${pageNumber}&per_page=5`
    );

    const totalItems = responseNoticias.headers['x-wp-totalpages'];

    Settotal(totalItems);

    const data = responseNoticias.data.map((posts) => ({
      ...posts,
      dateFormatted: Object.keys(posts.recipients),
    }));

    Setnoticias(shouldRefresh ? data : [...noticias, ...data]);
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

  handleNavigateFriends = () => {
    navigation.push('Friends');
  };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <Title>Mural</Title>
          <NewPostButton onPress={() => handleNavigateFriends()}>
            <NewPostTitle>Amigos</NewPostTitle>
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
              <MessageBox onPress={() => handleNavigateMessage(item)}>
                <MessageAvatar
                  source={{
                    uri:
                      item.recipients[item.dateFormatted[0]].user_avatars.thumb,
                  }}
                />

                <MessageContent>{item.excerpt.rendered}</MessageContent>
                <ArrowRightGray />
              </MessageBox>
            </View>
          )}
        />
      </SafeAreaView>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(Message);
