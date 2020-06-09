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
  border: 1px solid #d19076;
  border-radius: 20px;
  padding: 7px 20px;
`;

export const NewPostTitle = styled.Text`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #d19076;
  font-size: 16px;
`;

export const GroupContent = styled.ScrollView`
  margin: 0 0 100px 0;
`;

export const GroupBox = styled.View`
  flex-direction: row;

  margin-bottom: 30px;
`;

export const GroupCover = styled.Image`
  width: auto;
  height: 180px;
`;

export const GroupTitle = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-family: 'SF Pro Text';
  font-weight: 600;
  color: #fff;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

export const GroupButtonOne = styled.TouchableOpacity`
  flex: 1;
  margin: 0 5px 0 0;
`;

export const GroupButtonTwo = styled.TouchableOpacity`
  flex: 1;
  margin: 0 0 0 5px;
`;
