import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  flex-direction: column;

  background-color: #6345df;
`;

export const SectionOne = styled.View`
  align-items: center;
  padding: 100px 0 70px 0;
`;

export const SectionTwo = styled.View`
  flex: 1;
  background-color: #2b3239;
  padding: 30px 20px;

  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

export const Title = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 900;
  color: #ffffff;
  font-size: 24px;
`;

export const Desc = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #dddddd;
  font-size: 14px;
`;

export const ButtonLogin = styled.TouchableOpacity`
  border-radius: 4px;
  background-color: #6345df;

  align-items: center;
  padding: 15px;

  margin: 20px 0 10px 0;
`;

export const ButtonLoginText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #ffffff;
  font-size: 14px;
`;

export const ButtonRegister = styled.TouchableOpacity`
border-radius: 4px;
  background-color: #ffffff

  align-items: center;
  padding: 15px;
`;

export const ButtonRegisterText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #6345df;
  font-size: 14px;
`;
