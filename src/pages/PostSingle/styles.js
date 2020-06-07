import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Card = styled.View`
  border-radius: 8px;
  padding: 60px 25px 25px 25px;
  margin-bottom: 20px;
`;

export const CardTitleLight = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #060606;
  font-size: 16px;

  margin: 0 0 25px 0;
`;

export const CardFooter = styled.View`
  flex-direction: row;
`;

export const CardProfile = styled.View`
  flex: 1;

  flex-direction: row;
  align-items: center;
`;

export const CardNameLight = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #060606;
  font-size: 14px;
  opacity: 0.5;

  margin: 0 5px 0 5px;
`;

export const ProfileAvatar = styled.Image`
  width: 26px;
  height: 26px;
  border-radius: 13px;
`;

export const ComentBox = styled.TouchableOpacity`
  flex-direction: row;
  padding: 20px 20px;
  border: 1px;
  border-top-color: transparent;
  border-left-color: transparent;
  border-right-color: transparent;
  border-bottom-color: #55586b;
`;

export const ComentContent = styled.View`
  margin: 0 40px 0 15px;
`;

export const ComentAvatar = styled.Image`
  width: 30px;
  height: 30px;
  border-radius: 15px;
`;

export const ComentName = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #fff;
  font-size: 12px;

  margin: 0 5px 10px 0;
`;

export const ComentText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #fff;
  font-size: 14px;
`;

export const NewComent = styled.View`
  flex-direction: row;
  margin: 0 20px 10px 20px;
  align-items: center;
`;

export const NewComentTitle = styled.Text`
  flex: 1;
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #fff;
  font-size: 14px;
`;

export const NewComentButton = styled.TouchableOpacity`
  background-color: #6345df;
  border-radius: 4px;
  padding: 7px 20px;
`;

export const NewComentButtonTitle = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #fff;
  font-size: 14px;
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

export const BorraTrue = styled.View`
  border: 1px solid #000;
  background-color: #000;
  border-radius: 20px;
  padding: 5px 8px;
`;

export const BorraTitleTrue = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #fff;
  font-size: 12px;
  text-align: center;
`;

export const ContainerRecover = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  background-color: #2b3239;
  border-radius: 8px;
`;

export const ProfileBox = styled.View`
  margin: 5px 20px;

  flex-direction: row;
  align-items: center;
`;

export const ProfileAvatarTwo = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 60px;
`;

export const ProfileContent = styled.View`
  flex: 1;
  margin: 0 20px 0 15px;
`;

export const ProfileNameBox = styled.View`
  flex-direction: row;
`;

export const ProfileName = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #fff;
  font-size: 18px;

  margin: 0 5px 0 0;
`;

export const ProfileButtonsBox = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px 0 0 0;
`;

export const InstaButton = styled.TouchableOpacity`
  border: 1px solid #525467;
  border-radius: 4px;

  padding: 8px;
`;

export const InstaIcon = styled.Image`
  width: 15px;
  height: 15px;
`;

export const EditButton = styled.TouchableOpacity`
  flex: 1;
  background-color: #478ce0;
  padding: 8px;
  border-radius: 4px;
  margin: 0 0 0 10px;
`;

export const EditButtonText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #fff;
  font-size: 13px;
  text-align: center;
`;

export const BioText = styled.Text.attrs({
  numberOfLines: 2,
})`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #fff;
  font-size: 13px;
  margin: 5px 0;
`;
