import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import * as NavigationBar from "expo-navigation-bar";
import { ShopContextProvider } from "../context/ShopContext";
import { Provider as PaperProvider } from 'react-native-paper';
import Navbar from "../components/Navbar";
import Header from "../components/Header";

export default function Layout() {
  useEffect(() => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#ffffff");
    NavigationBar.setButtonStyleAsync("dark");
  }, []);

  return (
    <PaperProvider>
      <ShopContextProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <StatusBar style="dark"/>
          <Header />
          <Stack screenOptions={{ headerShown: false }} />
          <Navbar />
        </SafeAreaView>
      </ShopContextProvider>
    </PaperProvider>
  );
}
