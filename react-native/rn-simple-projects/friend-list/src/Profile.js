import { Image, Text, View } from "react-native";
import Margin from "./Margin";
import styled from "styled-components/native";

export default (props) => {
  const size = props.isMe ? 50 : 40;

  return (
    <Container>
      <ProfileImage source={{ uri: props.uri }} size={size} />
      <View style={{ justifyContent: "center", marginLeft: 10 }}>
        <Text
          style={{
            fontWeight: props.isMe ? "bold" : "normal",
            fontSize: props.isMe ? 16 : 14,
          }}
        >
          {props.name}
        </Text>
        {props.introduction && (
          <View>
            <Margin height={props.isMe ? 6 : 4} />
            <Text style={{ fontSize: props.isMe ? 12 : 10, color: "grey" }}>
              {props.introduction}
            </Text>
          </View>
        )}
      </View>
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  background-color: white;
`;

const ProfileImage = styled.Image`
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: ${(props) => props.size * 0.4}px;
`;
