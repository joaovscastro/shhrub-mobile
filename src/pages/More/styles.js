import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #2b3239;
`;

export const Header = styled.View`
  flex-direction: row;
  margin: 10px 20px 25px 20px;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;

  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #fff;
  font-size: 25px;
  margin: 0 0 0 20px;
`;

export const NewPostButton = styled.TouchableOpacity`
  border: 1px solid #7da0d6;
  border-radius: 20px;
  padding: 7px 20px;
`;

export const NewPostTitle = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #7da0d6;
  font-size: 16px;
`;

export const MessageBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
  border: 1px;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #42454b;
`;

export const MessageAvatar = styled.Image`
  width: 20px;
  height: 20px;
`;

export const MessageContent = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex: 1;
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #fff;
  font-size: 14px;
  margin: 0 10px;
`;
