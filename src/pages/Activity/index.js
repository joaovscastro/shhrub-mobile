import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  SafeAreaView,
  View,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import HTML from 'react-native-render-html';
import { IGNORED_TAGS } from 'react-native-render-html/src/HTMLUtils';
import Lottie from 'lottie-react-native';

import api from '../../services/api';

import { Container, Header, Title, MessageBox, MessageContent } from './styles';

import ArrowBigLeftDark from '../../components/icons/ArrowBigLeftDark';
import Calmo from '../../../assets/animation/calmo.json';

function Activity({ navigation, profile }) {
  const [loading, Setloading] = useState(false);
  const [noticias, Setnoticias] = useState([]);
  const [page, Setpage] = useState(1);
  const [total, Settotal] = useState(0);
  const [refreshing, Setrefreshing] = useState(false);

  async function loadPosts(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    Setloading(true);

    const responseNoticias = await api.get(
      `/wp/v2/comments?author=${profile.id}&page=${pageNumber}&_embed`
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

  handleNavigateActivityPost = (postsingle) => {
    navigation.push('PostSingleActivity', { postsingle });
  };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBigLeftDark />
          </TouchableOpacity>
          <Title>Atividades</Title>
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
              <MessageBox onPress={() => handleNavigateActivityPost(item)}>
                <View>
                  <MessageContent>Você comentou em:</MessageContent>
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
                        fontSize: 12,
                      },
                    }}
                    html={item._embedded['up'][0].excerpt.rendered}
                  />
                </View>
              </MessageBox>
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
                    fontSize: 14,
                  }}
                >
                  Está tudo tão calmo por aqui...
                </Text>
              </View>
            </>
          )}
        />
      </SafeAreaView>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  profile: state.user.profile,
});

export default connect(mapStateToProps)(Activity);
