import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useShopContext } from '@/context/ShopContext';

export default function Card({ product, onPress }) {
  const { currency } = useShopContext();

  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[100%] rounded-xl bg-white p-2 shadow-sm flex-row items-center gap-3 my-2"
    >
      <Image
        source={{ uri: product.image[0] }}
        className="w-28 h-28 rounded-lg"
      />
      <View className="flex-1 mt-3">
        <Text className="text-lg" numberOfLines={2}>
          {product.name}
        </Text>
        <Text className="text-lg font-bold">
          {currency}
          {product.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
