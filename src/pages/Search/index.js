import React, { useState } from 'react';
import { NavigationActions, StackActions } from 'react-navigation';
import {
  SafeAreaView,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import HTML from 'react-native-render-html';

import {
  Container,
  Header,
  Title,
  SearchContent,
  SearchInput,
  SearchButton,
  Card,
  CardYellow,
  CardPink,
  CardTitleLight,
  CardFooter,
  CardProfile,
  CardNameLight,
  CardTitleDark,
  ProfileAvatar,
  BorraTrue,
  BorraTitleTrue,
} from './styles';

import api from '../../services/api';

import SearchIcon from '../../components/icons/SearchIcon';
import IconSearch from '../../components/icons/IconSearch';
import CommentBubble from '../../components/icons/CommentBubble';
import VerifiedSeal from '../../components/icons/VerifiedSeal';

export default function Search({ navigation }) {
  const [loading, Setloading] = useState(false);
  const [pesquisa, Setpesquisa] = useState('');
  const [posts, Setposts] = useState([]);
  const [page, Setpage] = useState(1);
  const [total, Settotal] = useState(0);
  const [refreshing, Setrefreshing] = useState(false);

  async function hadleSearch(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    Setloading(true);

    const responseNoticias = await api.get(
      `/wp/v2/posts?search=${pesquisa}&_embed`
    );

    if (responseNoticias.data.length === 0) {
      Setloading(false);
      Alert.alert('Ops..', 'Nada encontrado! Continue tentando (;');
      return;
    }

    const totalItems = responseNoticias.headers['x-wp-totalpages'];

    Settotal(totalItems);

    Setposts(
      shouldRefresh
        ? responseNoticias.data
        : [...posts, ...responseNoticias.data]
    );
    Setpage(pageNumber + 1);
    Setloading(false);
  }

  async function refreshList() {
    Setrefreshing(true);

    await hadleSearch(1, true);

    Setrefreshing(false);
  }

  handleNavigatePostSearch = (postsingle) => {
    navigation.push('PostSingle', { postsingle });
  };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <Title>Pesquisar</Title>
        </Header>
        <SearchContent>
          <SearchInput
            keyboardType="default"
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="O que procura?"
            onChangeText={Setpesquisa}
            value={pesquisa}
            returnKeyType="search"
            onSubmitEditing={() => hadleSearch(1, true)}
          />
          {loading ? (
            <View style={{ marginRight: 11 }}>
              <ActivityIndicator color="#ffffff" />
            </View>
          ) : (
            <SearchButton onPress={() => hadleSearch(1, true)}>
              <SearchIcon />
            </SearchButton>
          )}
        </SearchContent>

        <FlatList
          style={{ marginBottom: 0 }}
          data={posts}
          keyExtractor={(post) => String(post.id)}
          onEndReached={() => hadleSearch()}
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
                onPress={() => handleNavigatePostSearch(item)}
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
          ListEmptyComponent={() => (
            <>
              <View
                style={{
                  alignItems: 'center',
                  marginTop: 20,
                  marginBottom: 20,
                }}
              >
                <IconSearch />
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'SF Pro Text',
                    fontWeight: 'normal',
                    fontSize: 16,
                    marginTop: 15,
                  }}
                >
                  Pesquise por posts
                </Text>
              </View>
            </>
          )}
        />
      </SafeAreaView>
    </Container>
  );
}
