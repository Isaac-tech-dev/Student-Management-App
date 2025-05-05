import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Alert,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Student } from "../../types";
import uuid from "react-native-uuid";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import Toast from "react-native-toast-message";
import DropDownPicker from "react-native-dropdown-picker";

const AddStudentScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Enrolled", value: "enrolled" },
    { label: "Graduated", value: "graduated" },
    { label: "Alumni", value: "alumni" },
  ]);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const handlePickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission denied",
        "Allow access to media library to upload a photo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.5,
    });

    if (!result.canceled) {
      const asset = result.assets[0];
      const uri = asset.uri;
      const type = asset.type ?? ""; // image

      const extension = uri.split(".").pop()?.toLowerCase();
      if (extension !== "jpg" && extension !== "jpeg" && extension !== "png") {
        Alert.alert("Invalid File", "Only .jpg and .png files are allowed.");
        return;
      }

      setPhoto(uri);
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim() || !status.trim()) {
      Toast.show({
        type: "error",
        text1: 'Validation Error", "All fields are required.',
        position: "top",
      });
      //Alert.alert("Validation Error", "All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      Toast.show({
        type: "error",
        text1: 'Validation Error", "Enter a valid email address."',
        position: "top",
      });
      //Alert.alert("Validation Error", "Enter a valid email address.");
      return;
    }

    const newStudent: Student = {
      id: uuid.v4().toString(),
      name,
      email,
      status,
      photo: photo || "",
    };

    try {
      const stored = await AsyncStorage.getItem("students");
      const current = stored ? JSON.parse(stored) : [];
      current.push(newStudent);
      await AsyncStorage.setItem("students", JSON.stringify(current));
      Toast.show({
        type: "success",
        text1: "Student added successfully!",
        position: "top",
      });
      //Alert.alert("Success", "Student added successfully!");
      setName("");
      setEmail("");
      setStatus("");
      setPhoto(null);
    } catch (err) {
      Toast.show({
        type: "error",
        text1: 'Error", "Failed to save student data.',
        position: "top",
      });
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, paddingVertical: 25 }}
    >
      <View style={{ paddingHorizontal: 20, gap: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          Add New Student
        </Text>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={{
            borderWidth: 1,
            padding: 10,
            marginBottom: 10,
            borderRadius: 10,
          }}
        />

        <Text style={{ marginBottom: 2, fontSize: 16, fontWeight: 200 }}>
          Enrollment Status
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderBlockColor: "gray",
            borderRadius: 10,
            //overflow: "hidden",
          }}
        >
          {/* <Picker
            selectedValue={status ?? "Select Status"}
            onValueChange={(itemValue) => setStatus(itemValue)}
            style={{
              height: 50,
              paddingHorizontal: 10,
            }}
          >
            <Picker.Item label="Select status..." value="" />
            <Picker.Item label="Enrolled" value="enrolled" />
            <Picker.Item label="Graduated" value="graduated" />
            <Picker.Item label="Alumni" value="alumni" />
          </Picker> */}

          <DropDownPicker
            open={open}
            value={status}
            items={items}
            setOpen={setOpen}
            setValue={setStatus}
            setItems={setItems}
            placeholder="Select status..."
            //containerStyle={{ marginBottom: 20 }}
            style={{
              //borderColor: "#D1D5DB",
              backgroundColor: "transparent",
            }}
          />
        </View>

        {photo && <Image source={{ uri: photo }} style={styles.Image} />}

        <TouchableOpacity onPress={handlePickImage} style={{ marginBottom: 6 }}>
          <View style={styles.PhotoView}>
            <Text>{photo ? "Change Photo" : "Upload Profile Photo"}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
          <Text style={styles.text}>Save Student</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddStudentScreen;

const styles = StyleSheet.create({
  PhotoView: {
    borderWidth: 1,
    borderColor: "#D1D5DB", // gray-300
    borderRadius: 6, // rounded
    padding: 12, // p-3 (3 * 4 = 12)
    flexDirection: "row", // flex
    alignItems: "center", // items-center
    justifyContent: "center", // justify-center
    backgroundColor: "#F3F4F6",
  },
  Image: {
    width: 100, // w-32 (32 * 4 = 128)
    height: 100, // h-32
    borderRadius: 9999, // rounded-full
    alignSelf: "center", // self-center
    marginBottom: 16, // mb-4 (4 * 4 = 16)
  },
  button: {
    backgroundColor: "#2563EB", // bg-blue-600
    paddingVertical: 12, // py-3 (3 * 4 = 12)
    borderRadius: 8, // rounded
    alignItems: "center", // items-center
  },
  text: {
    color: "#FFFFFF", // text-white
    fontWeight: "600", // font-semibold
  },
});
