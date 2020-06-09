import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Image, TouchableOpacity } from 'react-native';

import api from '../../services/api';

import {
  Container,
  Header,
  Title,
  GroupContent,
  GroupBox,
  GroupCover,
  GroupTitle,
  GroupButtonOne,
  GroupButtonTwo,
} from './styles';

// Covers
import MoviesCover from '../../../assets/img/movies-cover.jpg';
import BooksCover from '../../../assets/img/books-cover.jpg';
import MusicCover from '../../../assets/img/music-cover.jpg';
import AnxietyCover from '../../../assets/img/anxiety-cover.jpg';
import PolicyCover from '../../../assets/img/policy-cover.jpg';
import SexCover from '../../../assets/img/sex-cover.jpg';
import Madruga from '../../../assets/img/madrugada.jpg';

export default function Groups({ navigation }) {
  const [confess, Setconfess] = useState('');

  handleNavigateGroup = (idgroup, groupname) => {
    navigation.navigate('GroupSingle', { idgroup, groupname });
  };

  async function checkConfess() {
    const response = await api.get('wp/v2/pages/358');
    Setconfess(response.data.acf.confessionario);
  }

  useEffect(() => {
    checkConfess();
  }, []);
  return (
    <Container>
      <SafeAreaView>
        <Header>
          <Title>Grupos</Title>
        </Header>
        <GroupContent showsVerticalScrollIndicator={false}>
          {confess === 'yes' ? (
            <View style={{ marginBottom: 20 }}>
              <TouchableOpacity
                onPress={() => handleNavigateGroup(32, 'Confessionário')}
              >
                <Image source={Madruga} resizeMode="contain" />
                <GroupTitle>Confessionário da madrugada</GroupTitle>
              </TouchableOpacity>
            </View>
          ) : (
            <View />
          )}

          <GroupBox>
            <GroupButtonOne onPress={() => handleNavigateGroup(26, 'Filmes')}>
              <View style={{ flexGrow: 1 }}>
                <GroupCover source={MoviesCover} resizeMode="contain" />
                <GroupTitle>Séries e Filmes</GroupTitle>
              </View>
            </GroupButtonOne>
            <GroupButtonTwo onPress={() => handleNavigateGroup(27, 'Livros')}>
              <View style={{ flexGrow: 1 }}>
                <GroupCover source={BooksCover} resizeMode="contain" />
                <GroupTitle>Livros</GroupTitle>
              </View>
            </GroupButtonTwo>
          </GroupBox>
          <GroupBox>
            <GroupButtonOne onPress={() => handleNavigateGroup(28, 'Música')}>
              <View style={{ flexGrow: 1 }}>
                <GroupCover source={MusicCover} resizeMode="contain" />
                <GroupTitle>Música</GroupTitle>
              </View>
            </GroupButtonOne>
            <GroupButtonTwo onPress={() => handleNavigateGroup(29, 'Política')}>
              <View style={{ flexGrow: 1 }}>
                <GroupCover source={PolicyCover} resizeMode="contain" />
                <GroupTitle>Política</GroupTitle>
              </View>
            </GroupButtonTwo>
          </GroupBox>
          <GroupBox>
            <GroupButtonOne
              onPress={() => handleNavigateGroup(30, 'Ansiedade')}
            >
              <GroupCover source={AnxietyCover} resizeMode="contain" />
              <GroupTitle>Ansiedade</GroupTitle>
            </GroupButtonOne>
            <GroupButtonTwo onPress={() => handleNavigateGroup(31, 'Sexo')}>
              <GroupCover source={SexCover} resizeMode="contain" />
              <GroupTitle>Sexo</GroupTitle>
            </GroupButtonTwo>
          </GroupBox>
        </GroupContent>
      </SafeAreaView>
    </Container>
  );
}
