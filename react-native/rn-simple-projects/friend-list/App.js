import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Division from "./src/Division";
import FriendSection from "./src/FriendSection";
import Header from "./src/Header";
import Margin from "./src/Margin";
import Profile from "./src/Profile";
import TabBar from "./src/TabBar";
import { friendProfiles, myProfile } from "./src/data";
import FriendList from "./src/FriendList";
import { useState } from "react";

export default function App() {
  const [isOpened, setIsOpened] = useState(true);
  const [selectedTabIdx, setSelectedTabIdx] = useState(0);

  const onPressArrow = () => {
    setIsOpened(!isOpened);
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
        <FlatList
          data={isOpened ? friendProfiles : []}
          contentContainerStyle={{ paddingHorizontal: 15 }}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={() => <Margin height={13} />}
          stickyHeaderIndices={[0]}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={() => (
            <View style={{ backgroundColor: "white" }}>
              <Header />
              <Margin height={10} />
              <Profile
                uri={myProfile.uri}
                name={myProfile.name}
                introduction={myProfile.introduction}
                isMe={true}
              />
              <Margin height={12} />
              <Division />
              <Margin height={12} />
              <FriendSection
                friendProfileLen={friendProfiles.length}
                onPress={onPressArrow}
                isOpened={isOpened}
              />
              <Margin height={6} />
            </View>
          )}
          renderItem={({ item, index }) => (
            <View>
              <Profile
                uri={item.uri}
                name={item.name}
                introduction={item.introduction}
                isMe={false}
              />
            </View>
          )}
          ListFooterComponent={() => <Margin height={12} />}
        />
        <TabBar
          selectedTabIdx={selectedTabIdx}
          setSelectedTabIdx={setSelectedTabIdx}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={["right", "left", "top"]}>
        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          <Header />
          <Margin height={10} />
          <Profile
            uri={myProfile.uri}
            name={myProfile.name}
            introduction={myProfile.introduction}
          />
          <Margin height={12} />
          <Division />
          <Margin height={12} />
          <FriendSection
            friendProfileLen={friendProfiles.length}
            onPress={onPressArrow}
            isOpened={isOpened}
          />
          <FriendList data={friendProfiles} isOpened={isOpened} />
        </View>
        <TabBar
          selectedTabIdx={selectedTabIdx}
          setSelectedTabIdx={setSelectedTabIdx}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
