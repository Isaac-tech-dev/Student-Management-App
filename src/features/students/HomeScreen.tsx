import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import StudentCard from "../../components/StudentCard";
import { Student } from "../../types";
import { useFocusEffect } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const HomeScreen = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const loadStudents = async () => {
    try {
      const stored = await AsyncStorage.getItem("students");
      const current = stored ? JSON.parse(stored) : [];
      setStudents(current);
    } catch (err) {
      console.error("Failed to load students", err);
    }
  };

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Delete Student",
      "Are you sure you want to delete this student?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            const updatedStudents = students.filter(
              (student) => student.id !== id
            );
            setStudents(updatedStudents);
            await AsyncStorage.setItem(
              "students",
              JSON.stringify(updatedStudents)
            );

            // Show success toast
            Toast.show({
              type: "success",
              text1: "Student deleted successfully!",
            });
          },
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      loadStudents(); // Load fresh data whenever screen is focused
    }, [])
  );

  useEffect(() => {
    loadStudents();
  }, []);

  console.log("STUDENTS", students);

  return (
    <SafeAreaView style={{ flex: 1, paddingVertical: 25 }}>
      <FlatList
        data={students}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <StudentCard student={item} onDelete={handleDelete} />
        )}
        ListEmptyComponent={
          <Text
            style={{ fontStyle: "normal", fontSize: 24, fontWeight: "bold" }}
          >
            No students yet.
          </Text>
        }
        contentContainerStyle={{ padding: 20 }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
