import { Platform } from 'react-native';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  justify-content: center;
  margin: 0 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;

  margin: 20px 0;
`;

export const Title = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 900;
  color: #ffffff;
  font-size: 24px;

  margin: 0 0 0 20px;
`;

export const TitleTwo = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 900;
  color: #ffffff;
  font-size: 22px;
  text-align: center;

  margin: 20px 0 0 0;
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
`;

export const ContainerRecover = styled.View`
  background-color: #2b3239;
  border-radius: 8px;
`;

export const DisclaimerTwo = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: bold;
  color: #f96556;
  font-size: 12px;
  text-align: center;
`;
