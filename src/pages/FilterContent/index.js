import React from 'react';
import { connect, useDispatch } from 'react-redux';
import { SafeAreaView, View, TouchableOpacity } from 'react-native';

import { updateSensitive } from '../../store/modules/user/actions';

import { Container, Header, Title, MessageBox, MessageContent } from './styles';

import CheckIcon from '../../components/icons/CheckIcon';
import ArrowBigLeftDark from '../../components/icons/ArrowBigLeftDark';

function FilterContent({ navigation, sensitive }) {
  const dispatch = useDispatch();

  function sensitiveTrue() {
    dispatch(
      updateSensitive({
        tame: 39,
      })
    );
  }

  function sensitiveFalse() {
    dispatch(
      updateSensitive({
        tame: '',
      })
    );
  }

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <Header>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowBigLeftDark />
          </TouchableOpacity>
          <Title>Filtrar conteúdo</Title>
        </Header>
        <View>
          <MessageBox onPress={() => sensitiveFalse()}>
            <MessageContent>Não filtrar</MessageContent>
            <View>{sensitive.tame === '' ? <CheckIcon /> : <View />}</View>
          </MessageBox>
          <MessageBox onPress={() => sensitiveTrue()}>
            <MessageContent>Filtrar conteúdo sensível</MessageContent>
            <View>{sensitive.tame === '' ? <View /> : <CheckIcon />}</View>
          </MessageBox>
        </View>
      </SafeAreaView>
    </Container>
  );
}

const mapStateToProps = (state) => ({
  sensitive: state.user.sensitivecontent,
});

export default connect(mapStateToProps)(FilterContent);
