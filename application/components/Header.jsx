import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from "react-native";
import { useRouter } from "expo-router";
import logo from '../assets/logo.jpg';
import { useEffect, useState } from "react";
import { useShopContext } from '@/context/ShopContext';
import Card from "./Card";

export default function Header() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);
  const { products, backendUrl } = useShopContext();
  const router = useRouter();

  useEffect(() => {
    if (search.length > 0) {
      const filtered = products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]);
    }
  }, [search]);

  return (
    <>
      {/* Header */}
      <View className="flex-row items-center justify-between p-4 bg-white rounded-b-2xl z-10">
        <Image source={logo} className="rounded-full w-12 h-12" />

        <TextInput
          className="text-lg text-gray-700 border border-gray-400 rounded-xl px-4 py-1 w-[65%]"
          placeholder="Search"
          value={search}
          onChangeText={setSearch}
        />

        <TouchableOpacity
          onPress={() => {
          router.push('/signin')
          }}
        >
        <Image source={logo} className="rounded-full w-12 h-12" />
        </TouchableOpacity>
      </View>

      {/* Search Result Overlay */}
      {search.length > 0 && (
        <View
          style={{
            position: 'absolute',
            top: 80,
            left: 0,
            right: 0,
            bottom: 0,
          }}
          className="bg-black/40 z-20"
        >
          <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View className="bg-white p-4 rounded-xl">
              {results.length > 0 ? (
                results.slice(0, 3).map((product, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      setSearch(''); // close overlay
                      router.push(`/product/${product._id}`)
                    }}
                  >
                    <View className="flex flex-row items-center justify-between py-1 pr-2">
                      <Image
                        source={{ uri: product.image[0] }}
                        className="w-12 h-12 rounded-lg"
                      />
                      <Text className="text-md w-[70%]" numberOfLines={1}>
                        {product.name}
                      </Text>
                      <Text className="text-sm font-bold">
                        {product.price}
                      </Text>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <Text className="text-gray-600 text-center py-4">No products found.</Text>
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
}
