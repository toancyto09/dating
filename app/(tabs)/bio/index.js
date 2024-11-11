import { StyleSheet, Text, View, ScrollView, Image, Pressable, TextInput, Button } from 'react-native'
import { Entypo, AntDesign } from "@expo/vector-icons";
// import Carousel from 'react-native-snap-carousel';
import React, { useState } from 'react';

const index = () => {
  const [option, setOption] = useState("AD");
  const [description, setDescription] = useState("");
  const [activeSlide, setActiveSlide] = React.useState(0);


  const profileImages = [
    {
      image:
        "https://images.pexels.com/photos/1042140/pexels-photo-1042140.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/1215695/pexels-photo-1215695.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
    {
      image:
        "https://images.pexels.com/photos/7580971/pexels-photo-7580971.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  // const renderImageCarousel = ({ item }) => (
  //   <View
  //     style={{ width: "100%", justifyContent: "center", alignItems: "center" }}
  //   >
  //     <Image
  //       style={{
  //         width: "85%",
  //         resizeMode: "cover",
  //         height: 290,
  //         borderRadius: 10,
  //         transform: [{ rotate: "-5deg" }],
  //       }}
  //       source={{ uri: item?.image }}
  //     />
  //     <Text
  //       style={{ position: "absolute", top: 10, right: 10, color: "black" }}
  //     >
  //       {activeSlide + 1}/{profileImages.length}
  //     </Text>
  //   </View>
  // );
  return (
    <ScrollView>
      <View>
        <Image
          style={{ width: "100%", height: 200, resizeMode: "cover" }}
          source={{
            uri: "https://static.vecteezy.com/system/resources/thumbnails/018/977/074/original/animated-backgrounds-with-liquid-motion-graphic-background-cool-moving-animation-for-your-background-free-video.jpg",
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
                  uri: "https://static.vecteezy.com/system/resources/thumbnails/018/977/074/original/animated-backgrounds-with-liquid-motion-graphic-background-cool-moving-animation-for-your-background-free-video.jpg",
                }}
              />
              <Text style={{ fontSize: 16, fontWeight: "600", marginTop: 6 }}>
                Huynh Van Toan
              </Text>
              <Text style={{ marginTop: 4, fontSize: 15 }}>
                20 years 110 days
              </Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={{
        marginTop: 80,
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
            AD
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
            Photos
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
            Turn-ons
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
            Looking For
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
              }}
              placeholder="Write your AD for people to like you"
              placeholderTextColor={"black"}
            />
            <Pressable
              // onPress={updateUserDescription}
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
                Publish in feed
              </Text>
              <Entypo name="mask" size={24} color="white" />
            </Pressable>
          </View>
        )}
      </View>

      <View style={{ marginHorizontal: 14 }}>
        {option == "Photos" && (
          <View>
            {/* <Carousel
              data={profileImages}
              renderItem={renderImageCarousel}
              sliderWidth={350}
              itemWidth={300}
              onSnapToItem={(index) => setActiveSlide(index)}
            /> */}

            <View style={{ marginTop: 25 }}>
              <Text>Add a picture of yourself</Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  paddingVertical: 5,
                  borderRadius: 5,
                  marginTop: 10,
                  backgroundColor: "#DCDCDC",
                }}
              >
                <Entypo
                  style={{ marginLeft: 8 }}
                  name="image"
                  size={24}
                  color="gray"
                />
                {/* <TextInput
                  value={imageUrl}
                  onChangeText={(text) => setImageUrl(text)}
                  style={{ color: "gray", marginVertical: 10, width: 300 }}
                  placeholder="enter your image url"
                /> */}
              </View>
              {/* <Button onPress={handleAddImage} style={{ marginTop: 5 }} title="Add Image" /> */}
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

export default index

const styles = StyleSheet.create({})