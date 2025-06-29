import { View, Text, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { useShopContext } from '@/context/ShopContext';

export default function ProductPage() {
  const { id } = useLocalSearchParams();
  const { backendUrl, products, currency } = useShopContext();

  const [product, setProduct] = useState(null);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    const found = products.find((p) => p._id === id);
    setProduct(found);
  }, [products, id]);

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <Text className="text-red-500 text-lg">Product not found</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-white px-5 py-3" contentContainerStyle={{ alignItems: 'center' }}>
      {/* Image Carousel */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={{ width: screenWidth, height: 350 }}
      >
        {product.image.map((img, index) => (
          <Image
            key={index}
            source={{ uri: img }}
            style={{
              width: screenWidth,
              height: 350,
              resizeMode: 'cover',
              paddingHorizontal: 20,
            }}
          />
        ))}
      </ScrollView>

      {/* Product Details */}
      <View className="mt-5 w-full">
        <Text className="text-2xl font-bold mb-2">{product.name}</Text>
        <Text className="text-gray-600 text-base mb-2">{product.description}</Text>
        <Text className="text-xl font-semibold text-[#111]">
          {currency}
          {product.price}
        </Text>
        <Text className="text-lg font-semibold text-[#111] mt-5">Select Sizes</Text>
        <View className="flex flex-row flex-wrap gap-5 mt-3">
            {product.sizes.map((size, index) => (
                <TouchableOpacity key={index} className="border border-gray-300 w-12 h-12 flex items-center justify-center">
                    <Text className="text-xl">{size}</Text>
                </TouchableOpacity>
            ))}
        </View>
        <TouchableOpacity className="bg-black py-4 px-4 mt-4">
            <Text className="text-white text-center">
                ADD TO CART
            </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
