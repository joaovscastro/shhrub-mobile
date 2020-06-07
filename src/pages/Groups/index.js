import React from 'react';
import { SafeAreaView, View } from 'react-native';

import {
  Container,
  Header,
  Title,
  NewPostButton,
  NewPostTitle,
  GroupContent,
  GroupBox,
  GroupCover,
  GroupTitle,
  GroupButtonOne,
  GroupButtonTwo,
} from './styles';

// Covers
import MoviesCover from '../../../assets/img/movies-cover.png';
import BooksCover from '../../../assets/img/books-cover.png';
import MusicCover from '../../../assets/img/music-cover.png';
import AnxietyCover from '../../../assets/img/anxiety-cover.png';
import PolicyCover from '../../../assets/img/policy-cover.png';
import SexCover from '../../../assets/img/sex-cover.png';

export default function Groups({ navigation }) {
  handleNavigateGroup = (idgroup, groupname) => {
    navigation.navigate('GroupSingle', { idgroup, groupname });
  };
  return (
    <Container>
      <SafeAreaView>
        <Header>
          <Title>Grupos</Title>
          <NewPostButton>
            <NewPostTitle>Sugerir tema</NewPostTitle>
          </NewPostButton>
        </Header>
        <GroupContent showsVerticalScrollIndicator={false}>
          <GroupBox>
            <GroupButtonOne onPress={() => handleNavigateGroup(26, 'Filmes')}>
              <View style={{ flexGrow: 1 }}>
                <GroupCover source={MoviesCover} />
                <GroupTitle>Séries e Filmes</GroupTitle>
              </View>
            </GroupButtonOne>
            <GroupButtonTwo onPress={() => handleNavigateGroup(27, 'Livros')}>
              <View style={{ flexGrow: 1 }}>
                <GroupCover source={BooksCover} />
                <GroupTitle>Livros</GroupTitle>
              </View>
            </GroupButtonTwo>
          </GroupBox>
          <GroupBox>
            <GroupButtonOne onPress={() => handleNavigateGroup(28, 'Música')}>
              <View style={{ flexGrow: 1 }}>
                <GroupCover source={MusicCover} />
                <GroupTitle>Música</GroupTitle>
              </View>
            </GroupButtonOne>
            <GroupButtonTwo onPress={() => handleNavigateGroup(29, 'Política')}>
              <View style={{ flexGrow: 1 }}>
                <GroupCover source={PolicyCover} />
                <GroupTitle>Política</GroupTitle>
              </View>
            </GroupButtonTwo>
          </GroupBox>
          <GroupBox>
            <GroupButtonOne
              onPress={() => handleNavigateGroup(30, 'Ansiedade')}
            >
              <GroupCover source={AnxietyCover} />
              <GroupTitle>Ansiedade</GroupTitle>
            </GroupButtonOne>
            <GroupButtonTwo onPress={() => handleNavigateGroup(31, 'Sexo')}>
              <GroupCover source={SexCover} />
              <GroupTitle>Sexo</GroupTitle>
            </GroupButtonTwo>
          </GroupBox>
        </GroupContent>
      </SafeAreaView>
    </Container>
  );
}
