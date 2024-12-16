import { Pressable, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import "core-js/stable/atob";
import { jwtDecode } from "jwt-decode"; // Sửa lại cách import
import axios from "axios";
import { useRouter } from "expo-router";

const Select = () => {
  const router = useRouter();
  const [option, setOption] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");

        if (!token) {
          console.error("Token không tồn tại hoặc không hợp lệ");
          return;
        }

        const decodedToken = jwtDecode(token); // Decode token
        console.log("Token đã decode:", decodedToken);

        if (decodedToken && decodedToken.userId) {
          setUserId(decodedToken.userId); // Lưu userId vào state
        } else {
          console.error("Token không chứa userId hợp lệ");
        }
      } catch (error) {
        console.error("Lỗi khi xử lý token:", error);
      }
    };

    fetchUser();
  }, []);

  const updateUserGender = async () => {
    try {
      if (!userId) {
        console.error("UserId không tồn tại. Vui lòng kiểm tra lại.");
        return;
      }

      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/gender`, // Thay thế `192.168.x.x` bằng IP cục bộ của bạn
        { gender: option }
      );

      console.log("Phản hồi từ server:", response.data);

      if (response.status === 200) {
        router.replace("(tabs)/bio");
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật giới tính:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 12 }}>
      <Pressable
        onPress={() => setOption("male")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option === "male" ? "#D0D0D0" : "transparent",
          borderWidth: option === "male" ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Tôi là Nam</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/12442/12442425.png",
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => setOption("female")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option === "female" ? "#D0D0D0" : "transparent",
          borderWidth: option === "female" ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Tôi là nữ</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/9844/9844179.png",
          }}
        />
      </Pressable>

      <Pressable
        onPress={() => setOption("nonbinary")}
        style={{
          backgroundColor: "#F0F0F0",
          padding: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 25,
          borderRadius: 5,
          borderColor: option === "nonbinary" ? "#D0D0D0" : "transparent",
          borderWidth: option === "nonbinary" ? 1 : 0,
        }}
      >
        <Text style={{ fontSize: 16, fontWeight: "500" }}>Không xác định</Text>
        <Image
          style={{ width: 50, height: 50 }}
          source={{
            uri: "https://cdn-icons-png.flaticon.com/128/12442/12442425.png",
          }}
        />
      </Pressable>

      {option && (
        <Pressable
          onPress={updateUserGender}
          style={{
            marginTop: 25,
            backgroundColor: "black",
            padding: 12,
            borderRadius: 4,
          }}
        >
          <Text
            style={{ textAlign: "center", color: "white", fontWeight: "600" }}
          >
            Done
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({});
