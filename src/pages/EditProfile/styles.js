import { Platform } from 'react-native';
import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { TextInputMask } from 'react-native-masked-text';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  justify-content: center;
  margin: 0 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  margin: 10px 20px 25px 0;
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

export const Form = styled.View``;

export const EmailInput = styled.TextInput.attrs({
  placeholderTextColor: '#cccccc',
})`
  border: 1px solid #ffffff;
  background-color: #2b3239;
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;

  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #ffffff;
  font-size: 14px;
`;

export const PassInput = styled.TextInput.attrs({
  placeholderTextColor: '#cccccc',
})`
  border: 1px solid #ffffff;
  background-color: #2b3239;
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;

  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #ffffff;
  font-size: 14px;
`;

export const DateInput = styled(TextInputMask).attrs({
  placeholderTextColor: '#cccccc',
})`
  border: 1px solid #ffffff;
  background-color: #2b3239;
  height: 50px;
  padding: 10px;
  margin-bottom: 10px;

  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #ffffff;
  font-size: 14px;
`;

export const LoginButton = styled.TouchableOpacity`
  border-radius: 4px;
  background-color: #6345df;

  align-items: center;
  padding: 15px;

  margin: 20px 0 10px 0;
`;

export const LoginButtonDisabled = styled.View`
  border-radius: 4px;
  background-color: #6345df;

  align-items: center;
  padding: 15px;

  margin: 20px 0 10px 0;
  opacity: 0.5;
`;

export const LoginButtonText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #ffffff;
  font-size: 14px;
`;

export const RegisterButton = styled.TouchableOpacity`
  background-color: #4d0d82;
  height: 50px;

  align-items: center;
  justify-content: center;

  margin-bottom: 10px;
`;

export const RegisterButtonText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #fff;
  font-size: 16px;
`;

export const ButtonForgot = styled.TouchableOpacity`
  border: 1px solid #6345df;

  align-items: center;
  padding: 10px;
`;

export const ButtonForgotText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #6345df;
  font-size: 14px;
`;

export const Label = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #ffffff;
  font-size: 14px;

  margin: 0 0 10px 0;
`;

export const Disclaimer = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: normal;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
  margin: 10px 0;
`;

export const ChangePhoto = styled.TouchableOpacity`
  align-items: center;
`;

export const ChangePhotoBtn = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #6345df;
`;

export const ChangePhotoText = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #ffffff;
  font-size: 12px;
  text-align: center;
`;

export const Avatar = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`;

export const DisclaimerTwo = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #f96556;
  font-size: 12px;
  text-align: center;
`;
