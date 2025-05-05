import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Student } from "../types";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const StudentCard = ({
  student,
  onDelete,
}: {
  student: Student;
  onDelete: (id: string) => void;
}) => {
  return (
    <View style={styles.cardContainer}>
      <Image
        source={{ uri: student.photo }} // Assuming `profilePicture` is a URL
        style={styles.profileImage}
      />
      <View style={styles.textContainer}>
        <View>
          <Text style={styles.name}>{student.name}</Text>
          <Text style={styles.email}>{student.email}</Text>
          <Text style={styles.status}>Status: {student.status}</Text>
        </View>

        <TouchableOpacity onPress={() => onDelete(student.id)}>
          <MaterialIcons name="delete-forever" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudentCard;

const styles = StyleSheet.create({
  cardContainer: {
    borderWidth: 1,
    padding: 16, // p-4 (4 * 4 = 16)
    marginBottom: 12, // mb-2 (2 * 4 = 8)
    borderRadius: 12, // rounded-xl
    backgroundColor: "#FFFFFF", // bg-white
    flexDirection: "row", // to arrange image and text side by side
    alignItems: "center", // center the content vertically
    shadowColor: "#000", // add a shadow effect for the card
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android shadow effect
  },
  profileImage: {
    width: 50, // Size of the profile image
    height: 50, // Keep it square
    borderRadius: 25, // Make it circular
    marginRight: 16, // Space between image and text
  },
  textContainer: {
    flex: 1, // Take up remaining space
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: "space-between"
  },
  name: {
    fontSize: 18, // Larger font size for name
    fontWeight: "bold", // Make name bold
    color: "#333", // Dark text color
  },
  email: {
    fontSize: 14, // Default size for email
    color: "#555", // Lighter text color
    marginTop: 4, // Space between email and status
  },
  status: {
    fontSize: 14, // Default size for status
    color: "#4CAF50", // Green color for status
    marginTop: 4, // Space between email and status
  },
});
