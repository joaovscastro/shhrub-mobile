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

export const MessageBox = styled.TouchableOpacity`
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
  width: 40px;
  height: 40px;
  border-radius: 25px;
`;

export const MessageContent = styled.Text.attrs({
  numberOfLines: 1,
})`
  flex: 1;
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #eee;
  font-size: 14px;
  margin: 0 10px;
`;

export const ButtonFriend = styled.TouchableOpacity`
  border: 1px solid #2aeaa9;
  padding: 10px 10px;
  border-radius: 4px;
`;

export const ButtonFriendText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #2aeaa9;
  font-size: 12px;
  text-align: center;
`;

export const ButtonFriendRequest = styled.TouchableOpacity`
  padding: 8px 15px;
  border-radius: 4px;
`;

export const ButtonFriendRequestText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #7da0d6;
  font-size: 13px;
  text-align: center;
`;

export const ButtonFriendAccept = styled.TouchableOpacity`
  border: 1px solid #d19076;
  padding: 8px 15px;
  border-radius: 4px;
`;

export const ButtonFriendAcceptText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #d19076;
  font-size: 13px;
  text-align: center;
`;

export const ButtonFriendRemove = styled.TouchableOpacity`
  border: 1px solid #e74c3c;
  padding: 10px 10px;
  border-radius: 4px;

  margin: 0 5px 0 0;
`;

export const ButtonFriendRemoveText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #e74c3c;
  font-size: 12px;
  text-align: center;
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
