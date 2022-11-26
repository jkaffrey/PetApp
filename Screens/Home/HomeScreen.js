import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import PetSelector from "../../Components/Pets/PetSelector";

export default function HomeScreen({ appUser }) {
  useEffect(() => {
    console.log(appUser);
  });

  let testPets = [
    {
      name: "Claus",
      dob: "4/02/2018",
    },
    {
      name: "Cornelius",
      dob: "2/14/2020",
    },
    {
      name: "Shiloh",
      dob: "1/01/2021",
    },
  ];

  return (
    <View style={styles.container}>
      <PetSelector appUser={appUser} pets={testPets} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },

  startingText: {
    marginTop: 50,
  },
});
