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
  margin: 0 0 0 10px;
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

export const MessageBox = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 20px 20px;
  border: 1px;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #42454b;
`;

export const MessageAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
`;

export const MessageContent = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #42454b;
  font-size: 10px;
  margin: 0 10px 5px 10px;
`;

export const NewComentBox = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  padding: 20px;
  background-color: #22272e;
`;

export const PostButton = styled.TouchableOpacity`
  background-color: #f96895;
  border-radius: 4px;
  padding: 7px 20px;
  margin-bottom: 40px;
`;

export const PostButtonDisabled = styled.TouchableOpacity`
  background-color: #f96895;
  border-radius: 4px;
  padding: 7px 20px;
  margin-bottom: 40px;
  opacity: 0.5;
`;

export const PostTitle = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

export const InputComent = styled.TextInput.attrs({
  placeholderTextColor: '#aaa',
})`
  height: 100px;
  padding: 10px;
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #fff;
  font-size: 14px;
  background-color: #2b3239;
  border-radius: 8px;
  margin-bottom: 20px;
`;
