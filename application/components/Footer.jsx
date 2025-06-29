import { View, Text, StyleSheet, Image } from "react-native";
import { usePathname } from "expo-router";
import logo from '../assets/logo.jpg'

export default function Footer() {

  return (
    <View className="flex-row items-center justify-between p-4 bg-white rounded-b-2xl gap-3">
      <Image source={logo} className="rounded-full w-8 h-8" />
      <Text className="text-sm text-gray-700">Copyright © 2025. All rights reserved.</Text>
    </View>
  );
}
