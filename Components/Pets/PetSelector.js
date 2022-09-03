import React, { useRef, useState } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";

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

    return `${age} ${yearStr}` + (m !== 0 ? ` ${m} ${monthStr}` : "");
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
          parallaxFactor={0.4}
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
    alignItems: "center",
    flex: 1,
  },

  item: {
    padding: 10,
    width: width - width * 0.25,
    height: screen.height * 0.65,
    shadowColor: "#000000",
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },

  petName: {
    color: APP_COLORS.offWhite,
    fontSize: 30,
    paddingTop: 15,
  },

  petAge: {
    color: APP_COLORS.offWhite,
    paddingBottom: 15,
  },

  petViewEdit: {
    flexDirection: "row",
    paddingLeft: 15,
    paddingTop: 4,
  },

  petViewEditText: {
    fontSize: 16,
    color: APP_COLORS.offWhite,
    textDecorationLine: "underline",
  },

  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
  },

  image: {
    resizeMode: "center",
  },
});
