import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from "axios";

const register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = () => {
    const user = {
      name: name,
      email: email,
      password: password,
    };

    axios
      .post("http://localhost:3000/api/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setPassword("");
        router.replace("/login");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior="padding"
        keyboardVerticalOffset={50}
      >
        <ScrollView contentContainerStyle={{ alignItems: "center", paddingBottom: 20 }}>
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
              Đăng ký tài khoản
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
              <Ionicons style={{ marginLeft: 8 }} name="person-sharp" size={24} color="white" />
              <TextInput
                value={name}
                onChangeText={(text) => setName(text)}
                placeholder='Nhập tên của bạn'
                placeholderTextColor={"white"}
                style={{ color: "white", marginVertical: 10, width: 300, fontSize: 17 }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#FFC0CB", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
              <MaterialIcons style={{ marginLeft: 8 }} name="email" size={24} color="white" />
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder='Nhập email của bạn'
                placeholderTextColor={"white"}
                style={{ color: "white", marginVertical: 10, width: 300, fontSize: 17 }}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#FFC0CB", paddingVertical: 5, borderRadius: 5, marginTop: 30 }}>
              <AntDesign style={{ marginLeft: 8 }} name="lock" size={24} color="white" />
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry
                placeholder='Nhập mật khẩu'
                placeholderTextColor={"white"}
                style={{ color: "white", marginVertical: 10, width: 300, fontSize: 17 }}
              />
            </View>
          </View>

          <Pressable
            onPress={handleRegister}
            style={{ width: 200, backgroundColor: "#FFC0CB", borderRadius: 6, marginTop: 50, padding: 15 }}
          >
            <Text style={{ textAlign: "center", color: "white", fontSize: 16, fontWeight: "bold" }}>Đăng ký</Text>
          </Pressable>

          <Pressable onPress={() => router.replace("/login")} style={{ marginTop: 12 }}>
            <Text style={{ textAlign: "center", color: "gray", fontSize: 16 }}>Bạn đã có tài khoản? Đăng nhập</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default register;

const styles = StyleSheet.create({});
