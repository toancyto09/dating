import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, ScrollView } from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import React, { useEffect, useState } from 'react';
import { useRouter } from "expo-router";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("auth");
        if (token) {
          router.replace("/(tabs)/profile");
        }
      } catch (error) {
        console.log("Error", error);
      }
    };
    checkLoginStatus();
  }, []);

  const handleLogin = () => {
    const user = {
      email: email,
      password: password,
    };

    router.replace("/(tabs)/profile");
    axios.post("http://localhost:3000/api/login", user).then((response) => {
      console.log(response);
      const token = response.data.token;
      console.log(token);
      AsyncStorage.setItem("auth", token);
      router.replace("/(authenticate)/select")
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={50}
      >
        <ScrollView contentContainerStyle={{ alignItems: "center" }}>
          <View style={{ height: 200, backgroundColor: "pink", width: "100%" }}>
            <View style={{ justifyContent: "center", alignItems: "center", marginTop: 25 }}>
              <Image
                style={{ width: 150, height: 80, resizeMode: "contain" }}
                source={{
                  uri: "https://cdn-icons-png.flaticon.com/128/6655/6655045.png",
                }}
              />
            </View>
            <Text
              style={{ marginTop: 20, textAlign: "center", fontSize: 20, fontWeight: "bold" }}
            >
              Hẹn hò
            </Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 17, fontWeight: "bold", marginTop: 25, color: "#F9629F" }}>
              Đăng nhập tài khoản của bạn
            </Text>
          </View>
          <View style={{ justifyContent: "center", alignItems: "center", marginTop: 20 }}>
            <Image
              style={{ width: 100, height: 80, resizeMode: "cover" }}
              source={{
                uri: "https://cdn-icons-png.flaticon.com/128/2509/2509078.png",
              }}
            />
          </View>
          <View style={{ marginTop: 20, width: "90%" }}>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#FFC0CB", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
              <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="white" />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder='Nhập email của bạn'
                placeholderTextColor={"white"}
                style={{ color: "white", marginVertical: 10, width: 300, fontSize: email ? 17 : 17 }}
              />
            </View>
            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#FFC0CB", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
              <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="white" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                placeholder='Nhập mật khẩu của bạn'
                placeholderTextColor={"white"}
                style={{ color: "white", marginVertical: 10, width: 300, fontSize: password ? 17 : 17 }}
              />
            </View>
            <View style={{ marginTop: 12, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
              <Text>Giữ đăng nhập</Text>
              <Text style={{ color: "#007FFF", fontWeight: "500" }}>Quên mật khẩu</Text>
            </View>
            <Pressable onPress={handleLogin} style={{ width: 200, backgroundColor: "#FFC0CB", borderRadius: 6, marginLeft: "auto", marginRight: "auto", padding: 15, marginTop: 50 }}>
              <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Đăng nhập</Text>
            </Pressable>
            <Pressable onPress={() => router.replace("/register")} style={{ marginTop: 12 }}>
              <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>Bạn chưa có tài khoản?</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
