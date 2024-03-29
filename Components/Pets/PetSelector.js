import React, { useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
import { Ionicons } from "@expo/vector-icons";

import { APP_COLORS } from "../../Helpers/colors";

const { width, height } = Dimensions.get("window");
const screen = Dimensions.get("screen");

export default function PetSelector({ appUser, pets }) {
  const navigation = useNavigation();

  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const tabBarHeight = useBottomTabBarHeight();

  let defaultPetImg = require("../../assets/default_pet_image.jpg");

  const calculateAge = (dob) => {
    let today = new Date();
    let birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    let yearStr = "years";
    let monthStr = "months";

    if (age <= 1) {
      yearStr = "year";
    }

    if (m <= 1) {
      monthStr = "months";
    }

    return `${age} ${yearStr}` + (m !== 0 ? ` ${m} ${monthStr} old` : "");
  };

  const navigateToPet = () => {
    navigation.navigate("PetInfo", {
      pet: pets[activeIndex],
    });
  };

  const renderItem = ({ item, index }, parallaxProps) => {
    let pet = item;

    return (
      <Pressable
        style={styles.item}
        onPress={() => {
          navigateToPet();
        }} /** Need to figure out how to navigate to the pet view and pass in the pet key */
      >
        <ParallaxImage
          source={pet.petImage || defaultPetImg}
          containerStyle={styles.imageContainer}
          style={styles.image}
          {...parallaxProps}
        />
        <View style={styles.itemContent}>
          <View style={{ paddingLeft: 30 }}>
            <Text style={styles.petName}>{pet.name || "Fido"}</Text>
            <Text style={styles.petAge}>
              {pet.dob ? calculateAge(pet.dob) : "?"}
            </Text>
          </View>
          <View style={styles.petViewEdit}>
            <Pressable
              onPress={() => {
                navigateToPet();
              }}
              style={{ flexDirection: "row" }}
            >
              <Text style={styles.petViewEditText}>View / Edit</Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        position: "absolute",
        bottom: -1 * (height * 0.19) + tabBarHeight,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.myPets}>My Pets</Text>
        <Pressable style={styles.addPet}>
          <Ionicons name="add-circle" size={32} color="black" />
        </Pressable>
      </View>
      <Carousel
        loop={true}
        hasParallaxImages={true}
        inactiveSlideScale={1}
        ref={carouselRef}
        data={pets}
        sliderWidth={width}
        sliderHeight={height * 0.75}
        itemWidth={width - width * 0.25}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveIndex(index)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    flexDirection: "row",
  },

  addPet: {
    marginTop: 4,
    marginLeft: 8,
  },

  myPets: {
    paddingLeft: 32,
    fontWeight: "bold",
    fontSize: 32,
    color: APP_COLORS.black,
  },

  item: {
    padding: 10,
    width: width - width * 0.25,
    height: screen.height * 0.6,
    shadowColor: APP_COLORS.black,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.55,
    shadowRadius: 5.5,
  },

  itemContent: {
    bottom: width * 0.35,
    paddingBottom: 15,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },

  petName: {
    color: APP_COLORS.primary,
    fontSize: 30,
    paddingTop: 15,
  },

  petAge: {
    color: APP_COLORS.primary,
    paddingBottom: 15,
  },

  petViewEdit: {
    alignItems: "flex-end",
    paddingRight: 15,
    paddingTop: 4,
  },

  petViewEditText: {
    fontSize: 16,
    color: APP_COLORS.primary,
    fontWeight: "500",
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: APP_COLORS.primary,
    borderRadius: 8,
  },

  image: {
    resizeMode: "center",
  },
});
