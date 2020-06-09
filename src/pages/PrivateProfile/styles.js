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
`;

export const ProfileBox = styled.View`
  margin: 5px 20px;

  flex-direction: row;
  align-items: center;
`;

export const ProfileAvatar = styled.Image`
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

export const Card = styled.View`
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
`;

export const CardYellow = styled.View`
  background: #fbc932;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
`;

export const CardPink = styled.View`
  background: #fd84ad;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
`;

export const CardTitleLight = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #060606;
  font-size: 16px;

  margin: 0 0 25px 0;
`;

export const CardTitleDark = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #ffffff;
  font-size: 16px;

  margin: 0 0 25px 0;
`;

export const CardProfile = styled.View`
  flex: 1;

  flex-direction: row;
  align-items: center;
`;

export const CardFooter = styled.View`
  flex-direction: row;
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

export const ProfileAvatarTwo = styled.Image`
  width: 26px;
  height: 26px;
  border-radius: 13px;
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

export const MessageBox = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;

  background-color: #22272e;
  padding: 20px;
  margin: 10px 20px;
`;

export const MessageAvatar = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 25px;
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

export const Disclaimer = styled.View`
  border-radius: 4px;
  padding: 5px;
  margin: 0 20px 10px 20px;
`;

export const DisclaimerText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #2aeaa9;
  font-size: 10px;
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
