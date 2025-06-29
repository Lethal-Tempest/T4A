import '../global.css'
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useShopContext } from '@/context/ShopContext';
import Card from '../components/Card';
import Heading from '../components/Heading';
import { useEffect, useState } from 'react';
import { Checkbox } from 'react-native-paper';
import { FlatList } from 'react-native';

export default function App() {
  const { products } = useShopContext();
  const router = useRouter();
  const [filter, setFilter] = useState(false);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState("SORT");
  const [visibleProducts, setVisibleProducts] = useState([]);
  const [categories, setCategories] = useState({
    "Men": false,
    "Women": false,
    "Kids": false
  });
  const [subCategories, setSubCategories] = useState({
    "Topwear": false,
    "Bottomwear": false,
    "Winterwear": false
  });

  const toggleCategory = (key) => {
    setCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  const toggleSubCategory = (key) => {
    setSubCategories((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const filterProducts = () => {
    const selectedCategories = Object.keys(categories).filter(key => categories[key]);
    const selectedSubCategories = Object.keys(subCategories).filter(key => subCategories[key]);

    let filtered = products.filter(product => {
      return (
        (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
        (selectedSubCategories.length === 0 || selectedSubCategories.includes(product.subCategory))
      );
    });

    // Sorting logic
    if (selected === 'Price: Low to High') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (selected === 'Price: High to Low') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (selected === 'Newest First') {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    setVisibleProducts(filtered);
  };

  useEffect(() => {
    filterProducts();
  }, [categories, subCategories, products, selected]);

  return (
    <ScrollView className="bg-white px-5" contentContainerStyle={{ alignItems: 'center' }}>
      <View className="flex gap-2 items-center my-2">
        <Heading title1="ALL" title2="COLLECTION" />
      </View>

      <Text className="text-center text-gray-600 px-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>

      <View className="flex flex-row px-5 mt-6 w-full gap-3 mb-1">
        <TouchableOpacity onPress={() => setFilter(!filter)} className="w-1/2 flex-1 border border-gray-600 bg-gray-100 rounded-md justify-center h-10">
          <Text className="text-gray-600 text-center text-md w-full">FILTER</Text>
        </TouchableOpacity>
        <View className="w-1/2">
          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            className="w-full h-10 bg-gray-100 rounded-md justify-center items-center border border-gray-600"
          >
            <Text className="text-gray-600 text-md">{selected || "SORT"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {visible && (
        <View className="w-[80%] bg-white border border-gray-300 rounded-md mt-5 mb-5 relative left-[5%]">
          <FlatList
            data={['Price: Low to High', 'Price: High to Low', 'Newest First']}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  setSelected(item);
                  setVisible(false);
                }}
                className="px-4 py-3 border-b border-gray-200 z-10"
              >
                <Text className="text-black text-md">{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}

      {filter &&
        <View className="flex flex-col gap-2 w-[80%] relative right-[5%] border border-gray-300 rounded-md mt-2">
          {/* Categories */}
          <View className="flex flex-col px-5 w-[90%] pb-5">
            <Text className="text-lg font-bold pb-4 px-5 pt-6 text-gray-700">CATEGORIES</Text>
            {Object.keys(categories).map((key) => (
              <View key={key} className="flex-row gap-2 items-center">
                <View style={{ transform: [{ scale: 0.6 }] }}>
                  <Checkbox
                    status={categories[key] ? 'checked' : 'unchecked'}
                    onPress={() => toggleCategory(key)}
                    color='black'
                    className={`border ${categories[key] ? 'border-gray-700' : 'border-gray-300'}`}
                  />
                </View>
                <Text className={`${categories[key] ? 'text-gray-700' : 'text-gray-400'}`}>{key}</Text>
              </View>
            ))}
          </View>

          <View className="h-[1px] w-full bg-gray-300" />

          {/* Subcategories */}
          <View className="flex flex-col px-5 w-[90%] pb-5">
            <Text className="text-lg font-bold pb-4 px-5 pt-6 text-gray-700">TYPES</Text>
            {Object.keys(subCategories).map((key) => (
              <View key={key} className="flex-row gap-2 items-center">
                <View style={{ transform: [{ scale: 0.6 }] }}>
                  <Checkbox
                    status={subCategories[key] ? 'checked' : 'unchecked'}
                    onPress={() => toggleSubCategory(key)}
                    color='black'
                    className={`border ${subCategories[key] ? 'border-gray-700' : 'border-gray-300'}`}
                  />
                </View>
                <Text className={`${subCategories[key] ? 'text-gray-700' : 'text-gray-400'}`}>{key}</Text>
              </View>
            ))}
          </View>
        </View>
      }

      {/* Product cards */}
      <View className="mt-3 w-full items-center">
        {visibleProducts.length > 0 ? (
          visibleProducts.map((product, index) => (
            <Card
              key={index}
              product={product}
              onPress={() => router.push(`/product/${product._id}`)}
            />
          ))
        ) : (
          <Text className="text-gray-500 mt-5">No products found.</Text>
        )}
      </View>
    </ScrollView>
  );
}
