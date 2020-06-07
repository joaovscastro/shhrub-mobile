import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #2b3239;
  padding: 0 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin: 10px 0 25px 0;
  align-items: center;
`;

export const Title = styled.Text`
  flex: 1;

  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #fff;
  font-size: 25px;
`;

export const NewPostButton = styled.TouchableOpacity`
  border: 1px solid #7ee288;
  border-radius: 20px;
  padding: 7px 20px;
`;

export const NewPostTitle = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #7ee288;
  font-size: 16px;
`;

export const Card = styled.TouchableOpacity`
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
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

export const ProfileAvatar = styled.Image`
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

// Novo post

export const ContainerPost = styled.View`
  flex: 1;
  background-color: #2b3239;
  padding: 0 20px;
`;

export const HeaderPost = styled.View`
  flex-direction: row;
  margin: 10px 0 25px 0;
  align-items: center;
`;

export const TitlePost = styled.Text`
  flex: 1;

  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #fff;
  font-size: 25px;
`;

export const NewPostButtonPost = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  align-items: center;
  justify-content: center;
`;

export const CardYellowPost = styled.View`
  background: #fbc932;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
`;

export const CardTitleLightPost = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #060606;
  font-size: 14px;
  opacity: 0.5;
  text-align: right;

  margin: 10px 10px 25px 0;
`;

export const CardFooterPost = styled.View`
  flex-direction: row;
`;

export const CardProfilePost = styled.View`
  flex: 1;

  flex-direction: row;
  align-items: center;
`;

export const CardNameLightPost = styled.Text`
  flex: 1;
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #060606;
  font-size: 14px;
  opacity: 0.5;

  margin: 0 0 0 5px;
`;

export const PostButtonPost = styled.TouchableOpacity`
  background-color: #f96895;
  border-radius: 20px;
  padding: 7px 20px;
`;

export const PostTitlePost = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #fff;
  font-size: 16px;
  text-align: center;
`;

export const BorraButtonPost = styled.TouchableOpacity`
  border: 1px solid #000;
  border-radius: 20px;
  padding: 7px 10px;
`;

export const BorraButtonPostTrue = styled.TouchableOpacity`
  border: 1px solid #000;
  background-color: #000;
  border-radius: 20px;
  padding: 7px 10px;
`;

export const BorraTitlePost = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #000;
  font-size: 14px;
  text-align: center;
`;

export const BorraTitlePostTrue = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  text-align: center;
`;

export const ThemeTitlePost = styled.Text`
  flex: 1;
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 8px;
`;

export const LoginButton = styled.TouchableOpacity`
  border-radius: 4px;
  background-color: #6345df;

  align-items: center;
  padding: 15px;

  margin: 0 0 10px 0;
`;

export const LoginButtonDisabled = styled.View`
  border-radius: 4px;
  background-color: #6345df;

  align-items: center;
  padding: 15px;

  margin: 0 0 10px 0;
  opacity: 0.5;
`;

export const LoginButtonText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #ffffff;
  font-size: 14px;
`;
