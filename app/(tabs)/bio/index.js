import { StyleSheet, Text, View, ScrollView, Image, Pressable, TextInput, Button, FlatList, Alert } from 'react-native'
import { Entypo, AntDesign } from "@expo/vector-icons";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
  const [option, setOption] = useState("AD");
  const [description, setDescription] = useState("");
  const [userId, setUserId] = useState("");
  const [selectedTurnOns, setSelectedTurnOns] = useState([]);
  const [lookingOptions, setLookingOptions] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [images, setImages] = useState([]);
  const [userName, setUserName] = useState("");
  const [age, setAge] = useState(0);

  // const profileImages = [
  //   {
  //     image:
  //       "https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/1215695/pexels-photo-1215695.jpeg?auto=compress&cs=tinysrgb&w=800",
  //   },
  //   {
  //     image:
  //       "https://images.pexels.com/photos/7580971/pexels-photo-7580971.jpeg?auto=compress&cs=tinysrgb&w=800",
  //   },
  // ];

  const turnons = [
    {
      id: "0",
      name: "Âm nhạc",
      description: "Pop Rock-Indie, hãy chọn nhạc nền của chúng ta",
    },
    {
      id: "10",
      name: "Hôn",
      description:
        "Đó là cảm giác gần gũi, nơi mỗi nụ hôn tạo nên một bản giao hưởng của cảm xúc.",
    },
    {
      id: "1",
      name: "Những tưởng tượng",
      description:
        "Những tưởng tượng có thể rất cá nhân, bao gồm nhiều yếu tố đa dạng như lãng mạn.",
    },
    {
      id: "2",
      name: "Cắn nhẹ",
      description:
        "Một hình thức cắn vui vẻ hoặc những cú cắn nhỏ, nhẹ nhàng, thường được thực hiện bằng răng.",
    },
    {
      id: "3",
      name: "Khao khát",
      description:
        "Một cảm xúc mạnh mẽ hoặc mong muốn đạt được ai đó cụ thể.",
    },
  ];

  const data = [
    {
      id: "0",
      name: "Thư giãn",
      description: "Hãy để mọi thứ thoải mái và xem nó dẫn đến đâu.",
    },
    {
      id: "1",
      name: "Lâu dài",
      description: "Một mối quan hệ trọn đời thì sao?",
    },
    {
      id: "2",
      name: "Ảo",
      description: "Hãy có chút niềm vui trong thế giới ảo.",
    },
    {
      id: "3",
      name: "Mở lòng với mọi thứ",
      description: "Hãy kết nối và xem mọi chuyện diễn ra thế nào.",
    },
  ];


  //render image
  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image style={styles.carouselImage} source={{ uri: item }} />
    </View>
  );

  //Handle Add Image
  const handleAddImage = async () => {
    try {
      try {
        const response = await axios.post(`http://localhost:3000/api/users/${userId}/profile-images`, {
          imageUrl: imageUrl
        });

        console.log(response);

        setImageUrl("");
      } catch (error) {
        console.log("error", error)
      }
    } catch (error) {

    }
  }

  //fecth user
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("auth");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      const randomAge = Math.floor(Math.random() * (30 - 18 + 1)) + 18;
      setAge(randomAge);
    };

    fetchUser();
  }, []);

  //fectch user description

  const fetchUserDescription = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/users/${userId}`);
      console.log(response);
      const user = response.data;
      setUserName(user?.user?.name);
      setDescription(user?.user?.description);
      setSelectedTurnOns(user.user?.turnOns);
      setImages(user?.user.profileImages);
      setLookingOptions(user?.user.lookingFor);
    } catch (error) {
      console.log("Error fetching user description", error);
    }
  };


  useEffect(() => {
    if (userId) {
      fetchUserDescription();
    }
  }, [userId]);

  //update user description
  const updateUserDescription = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/description`,
        {
          description: description,
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        Alert.alert("Success", "Description updated successfully");
      }
    } catch (error) {
      console.log("Error updating the user Description");
    }
  };

  //handle Turn On
  const handleToggleTurnOn = (turnOn) => {
    if (selectedTurnOns.includes(turnOn)) {
      removeTurnOn(turnOn);
    } else {
      addTurnOn(turnOn);
    }
  }

  //handle LookingFor
  const handleOption = (lookingFor) => {
    if (lookingOptions.includes(lookingFor)) {
      removeLookingFor(lookingFor);
    } else {
      addLookingFor(lookingFor);
    }
  };


  //Add LookingFor
  const addLookingFor = async (lookingFor) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/looking-for`,
        {
          lookingFor: lookingFor,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setLookingOptions([...lookingOptions, lookingFor]);
      }
    } catch (error) {
      console.log("Error addding looking for", error);
    }
  };

  //Remove LookingFor
  const removeLookingFor = async (lookingFor) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/looking-for/remove`,
        {
          lookingFor: lookingFor,
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        setLookingOptions(lookingOptions.filter((item) => item !== lookingFor));
      }
    } catch (error) {
      console.error("Error removing looking for:", error);
    }
  };


  //Add Turn on
  const addTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/turn-ons/add`,
        {
          turnOn: turnOn,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setSelectedTurnOns([...selectedTurnOns, turnOn]);
      }
    } catch (error) {
      console.log("Error adding turn on", error);
    }
  };

  //Remove Turn on
  const removeTurnOn = async (turnOn) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/users/${userId}/turn-ons/remove`,
        {
          turnOn: turnOn,
        }
      );

      console.log(response.data);

      if (response.status == 200) {
        setSelectedTurnOns(selectedTurnOns.filter((item) => item !== turnOn));
      }
    } catch (error) {
      console.log("error removing turn on", error);
    }
  };

  //Random Image avatar
  const getRandomImage = () => {
    // const randomIndex = Math.floor(Math.random() * images.length);
    return images[0]
  }
  const randomImage = getRandomImage()

  //logout
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('auth');
      Alert.alert('Logged out', 'You have been logged out successfully.');
      router.replace('/(authenticate)/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };


  return (
    <ScrollView>
      <View>
        <Image
          style={{ width: "100%", height: 200, resizeMode: "cover" }}
          source={{
            uri: randomImage,
          }}
        />
        <View>
          <View>
            <Pressable style={{
              padding: 10,
              backgroundColor: "#DDA0DD",
              width: 300,
              marginLeft: "auto",
              marginRight: "auto",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              position: "absolute",
              top: -60,
              left: "50%",
              transform: [{ translateX: -150 }],
            }}>
              <Image
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  resizeMode: "cover",
                }}
                source={{
                  uri: images[0],
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 6 }}>
                {userName || "Tên không xác định"}
              </Text>
              <Text style={{ marginTop: 4, fontSize: 15 }}>
                {age} years
              </Text>
              <AntDesign onPress={handleLogout} name="logout" size={20} color="black" />
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{
        marginTop: 100,
        marginHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 25,
        justifyContent: "center",
      }}>
        <Pressable onPress={() => setOption("AD")}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: option == "AD" ? "black" : "gray",
            }}
          >
            Bio
          </Text>
        </Pressable>
        <Pressable onPress={() => setOption("Photos")}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: option == "Photos" ? "black" : "gray",
            }}
          >
            Ảnh
          </Text>
        </Pressable>
        <Pressable onPress={() => setOption("Turn-ons")}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: option == "Turn-ons" ? "black" : "gray",
            }}
          >
            Sở thích
          </Text>
        </Pressable>
        <Pressable onPress={() => setOption("Looking For")}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "500",
              color: option == "Looking For" ? "black" : "gray",
            }}
          >
            Tìm kiếm
          </Text>
        </Pressable>
      </View>

      <View style={{ marginHorizontal: 14, marginVertical: 15 }}>
        {option == "AD" && (
          <View
            style={{
              borderColor: "#202020",
              borderWidth: 1,
              padding: 10,
              borderRadius: 10,
              height: 300,
            }}
          >
            <TextInput
              value={description}
              multiline
              onChangeText={(text) => setDescription(text)}
              style={{
                fontFamily: "Helvetica",
                fontSize: description ? 17 : 17,
                height: "100%"
              }}
              placeholder="Write your AD for people to like you"
              placeholderTextColor={"black"}
            />
            <Pressable
              onPress={updateUserDescription}
              style={{
                marginTop: "auto",
                flexDirection: "row",
                alignItems: "center",
                gap: 15,
                backgroundColor: "black",
                borderRadius: 5,
                justifyContent: "center",
                padding: 10,
              }}
            >
              <Text
                style={{
                  color: "white",
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "500",
                }}
              >
                Đăng công khai
              </Text>
              <Entypo name="mask" size={24} color="white" />
            </Pressable>
          </View>
        )}
      </View>

      <View style={{ marginHorizontal: 14 }}>
        {option == "Photos" && (
          <View>
            <View style={{ marginTop: 10 }}>
              {/* FlatList for photo slide */}
              <FlatList
                horizontal
                data={images}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.flatListContainer}
              />
              <Text>Thêm hình ảnh của bạn</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 10,
                  marginBottom: 10,
                  backgroundColor: "#DCDCDC",
                }}
              >
                <Entypo
                  style={{ marginLeft: 8 }}
                  name="image"
                  size={24}
                  color="gray"
                />
                <TextInput
                  value={imageUrl}
                  onChangeText={(text) => setImageUrl(text)}
                  style={{ color: "gray", marginVertical: 10, width: 300 }}
                  placeholder="nhập link ảnh của bạn"
                />
              </View>
              <Button onPress={handleAddImage} style={{ marginTop: "5px" }} title="Thêm ảnh" />
            </View>
          </View>
        )}
      </View>

      <View style={{ marginHorizontal: 14 }}>
        {option == "Turn-ons" && (
          <View>
            {turnons?.map((item, index) => (
              <Pressable
                onPress={() => handleToggleTurnOn(item?.name)}
                style={{
                  backgroundColor: "#FFFDD0",
                  padding: 10,
                  marginVertical: 10,
                }}
                key={index}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 15,
                      fontWeight: "bold",
                      flex: 1,
                    }}
                  >
                    {item?.name}
                  </Text>
                  {selectedTurnOns.includes(item?.name) && (
                    <AntDesign name="checkcircle" size={18} color="#17B169" />
                  )}
                </View>
                <Text
                  style={{
                    marginTop: 4,
                    fontSize: 15,
                    color: "gray",
                    textAlign: "center",
                  }}
                >
                  {item?.description}
                </Text>
              </Pressable>
            ))}
          </View>
        )}
      </View>

      <View style={{ marginHorizontal: 14 }}>
        {option == "Looking For" && (
          <>
            <View>
              <FlatList
                columnWrapperStyle={{ justifyContent: "space-between" }}
                numColumns={2}
                data={data}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => handleOption(item?.name)}
                    style={{
                      backgroundColor: lookingOptions.includes(item?.name)
                        ? "#fd5c63"
                        : "white",
                      padding: 16,
                      justifyContent: "center",
                      alignItems: "center",
                      width: 150,
                      margin: 10,
                      borderRadius: 5,
                      borderColor: "#fd5c63",
                      borderWidth: lookingOptions.includes(item?.name)
                        ? "transparent"
                        : 0.7,
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        fontWeight: "500",
                        fontSize: 13,
                        color: lookingOptions.includes(item?.name)
                          ? "white"
                          : "black",
                      }}
                    >
                      {item?.name}
                    </Text>
                    <Text
                      style={{
                        color: lookingOptions.includes(item?.name)
                          ? "white"
                          : "gray",
                        textAlign: "center",
                        width: 140,
                        marginTop: 10,
                        fontSize: 13,
                      }}
                    >
                      {item?.description}
                    </Text>
                  </Pressable>
                )}
              />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({
  carouselItem: {
    marginRight: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
    padding: 5,
  },
  carouselImage: {
    width: 250,
    height: 200,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  flatListContainer: {
    paddingVertical: 10,
  },
});
