import { View, Text, Pressable } from "react-native";
import { useRouter, usePathname } from "expo-router";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { name: "Home", route: "/home", icon: "home" },
    { name: "Collection", route: "/collection", icon: "collections" },
    { name: "About", route: "/about", icon: "info-outline" },
    { name: "Contact", route: "/contact", icon: "contact-support" },
  ];

  return (
    <View className="flex-row items-center justify-around bg-white">
      {navItems.map((item) => (
        <Pressable
          key={item.route}
          onPress={() => pathname !== item.route && router.push(item.route)}
          className={`py-5 px-5 flex items-center justify-center`}
        >
          <Icon name={item.icon} size={25} color={pathname === item.route ? "black" : "gray"} />
          <Text className={`${pathname === item.route ? "text-gray-700" : "text-gray-400"} text-sm`}>
            {item.name}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
