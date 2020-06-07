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

export const SearchContent = styled.View`
  flex-direction: row;
  align-items: center;

  background: #40464d;

  border-radius: 12px;
  margin: 0 0 25px 0;
`;

export const SearchInput = styled.TextInput.attrs({
  placeholderTextColor: '#939393',
})`
  flex: 1;

  height: 50px;
  padding: 10px;

  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #fff;
  font-size: 14px;

  border-radius: 12px;
`;

export const SearchButton = styled.TouchableOpacity`
  margin: 0 10px;
`;

export const Card = styled.TouchableOpacity`
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
