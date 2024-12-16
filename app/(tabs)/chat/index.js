import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import UserChat from "../../../components/UserChat";

const index = () => {
  const router = useRouter();
  const [userId, setUserId] = useState("");
  const [profiles, setProfiles] = useState([]);
  const [matches, setMatches] = useState([]);

  //fetch user
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);

  //fetch recieved like Details
  const fetchRecievedLikesDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/received-likes/${userId}/details`
      );

      console.log(response);

      const receivedLikesDetails = response.data.receivedLikesDetails;

      setProfiles(receivedLikesDetails);
    } catch (error) {
      console.log("error fetching the details", error);
    }
  };

  //fecth user matches
  const fetchUserMatches = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/users/${userId}/matches`
      );

      const userMatches = response.data.matches;

      setMatches(userMatches);
    } catch (error) {
      console.log("Error", error);
    }
  };

  //effect recieved like Details
  useEffect(() => {
    if (userId) {
      fetchRecievedLikesDetails();
    }
  }, [userId]);

  //effect fetch user matches
  useEffect(() => {
    if (userId) {
      fetchUserMatches();
    }
  }, [userId]);

  //focus effect
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchUserMatches();
      }
    }, [])
  );
  console.log("matches", matches);


  return (
    <View style={{ backgroundColor: "white", flex: 1, padding: 10 }}>
      <View style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>CHATS</Text>
        <Ionicons name="chatbox-ellipses-outline" size={25} color="black" />
      </View>
      <Pressable

        onPress={() =>
          router.push({
            pathname: "/chat/select",
            params: {
              profiles: JSON.stringify(profiles),
              userId: userId,
            },
          })
        }

        style={{
          marginVertical: 12,
          flexDirection: "row",
          alignItems: "center",
        }}>
        <View style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: "#E0E0E0",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Feather name="heart" size={24} color="black" />
        </View>
        <Text style={{ fontSize: 17, marginLeft: 10, flex: 1 }}>
          Bạn đã có {profiles?.length} lượt thích
        </Text>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </Pressable>

      <View>
        {matches?.map((item, index) => (
          <UserChat key={index} userId={userId} item={item} />
        ))}
      </View>
    </View>
  )
}

export default index

const styles = StyleSheet.create({})