import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Profile from "../../../components/Profile";

const index = () => {
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        const userId = decodedToken.userId;
        setUserId(userId);
      }
    };

    fetchUser();
  }, []);

  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
      const user = response.data;
      setUser(user?.user);
    } catch (error) {
      console.log("Error fetching user description", error);
    }
  };

  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/profiles", {
        params: {
          userId: userId,
          gender: user?.gender,
          turnOns: user?.turnOns,
          lookingFor: user?.lookingFor,
        },
      });

      // Gán id nếu thiếu
      const profilesWithIds = response.data.profiles.map((profile, index) => ({
        ...profile,
        id: profile.id || `profile-${index}`, // Gán id tạm thời
      }));

      setProfiles(profilesWithIds);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);

  useEffect(() => {
    if (userId && user) {
      fetchProfiles();
    }
  }, [userId, user]);

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={profiles}
        keyExtractor={(item, index) => item.id || index.toString()} // Đảm bảo key duy nhất
        renderItem={({ item, index }) => (
          <Profile
            item={item}
            userId={userId}
            setProfiles={setProfiles}
            isEven={index % 2 === 0}
          />
        )}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
