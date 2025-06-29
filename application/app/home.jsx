import '../global.css'
import { Image, Text, View, ScrollView } from "react-native";
import Heading from '../components/Heading'
import { useFonts, Prata_400Regular } from '@expo-google-fonts/prata';
import hero_img from '../assets/hero_img.png'
import { useEffect, useState } from 'react';
import { useShopContext } from '@/context/ShopContext';
import Card from '../components/Card';
import { useRouter } from 'expo-router';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Footer from '../components/Footer';

const router = useRouter();

export default function App() {
  const [fontsLoaded] = useFonts({
    Prata: Prata_400Regular,
  });
  const { products } = useShopContext();
  const [latest, setLatest ]= useState([]);
  const [best, setBest] = useState([]);
  const [sortOption, setSortOption] = useState(null);
  useEffect(() => {
    setLatest(products.slice(0, 5));
    const getBestSeller = () => {
      setBest([]);
      products.forEach(product => {
        if (product.bestSeller) {
          setBest(prev => [...prev, product]);
        }
      });
    }
    getBestSeller();
  },[products])

  if (!fontsLoaded) return null;

  return (
    <ScrollView className="bg-white px-5" contentContainerStyle={{ alignItems: 'center' }}>


      {/* Hero Section (Banner) */}
      <View className="flex flex-col items-center bg-white border border-gray-400 justify-between w-full mb-2 mt-3">
        <View className='flex gap-2 mt-8 mb-6'>
          <View className="flex flex-row gap-2 items-center">
            <View className="h-[2px] w-8 bg-[#414141]" />
            <Text className="text-[#414141]">OUR BEST SELLER</Text>
          </View>
          <Text className="text-3xl text-black" style={{ fontFamily: "Prata" }}>
            LATEST ARRIVALS
          </Text>
          <View className="flex flex-row gap-2 items-center">
            <Text className="text-[#414141] font-bold">SHOP NOW</Text>
            <View className="h-[2px] w-8 bg-[#414141]" />
          </View>
        </View>

        {/* ✅ Responsive Image */}
        <Image source={hero_img} className='w-[100%] h-[250px]'/>
      </View>


      {/* Collection Section */}
      <View className='mt-9 flex justify-center gap-3'>
        <View className='flex gap-2 items-center'>
          <Heading title1="LATEST" title2="COLLECTION" />
        </View>
        <Text className='text-center text-gray-600 flex px-5'>Lorem ipsum dolor sit amet consectetur ada adipisicing elit.</Text>
        <View className='mt-3'>
          {latest.map((product, index) => (
            <Card key={index} product={product} onPress={() => router.push(`/product/${product._id}`)} />
          ))}
        </View>
      </View>

      {/* Bestsellers Section */}
      <View className='mt-9 flex justify-center gap-3'>
        <View className='flex gap-2 items-center'>
          <Heading title1="BEST" title2="SELLER" />
        </View>
        <Text className='text-center text-gray-600 flex px-5'>Lorem ipsum dolor sit amet consectetur ada adipisicing elit.</Text>
        <View className='mt-3'>
          {best.map((product, index) => (
            <Card key={index} product={product} onPress={() => router.push(`/product/${product._id}`)} />
          ))}
        </View>
      </View>

      <View className='mt-9 flex flex-col gap-10 mb-10'>
        <View className='flex gap-2 items-center'>
          <MaterialIcons name="currency-exchange" size={35} color="black" />
          <Text className='font-semibold text-gray-600'>Easy Exchange Policy</Text>
          <Text className='text-gray-400 text-sm'>We offer hassle free exchange policy</Text>
        </View>
        <View className='flex gap-2 items-center'>
          <MaterialIcons name="verified" size={35} color="black" />
          <Text className='font-semibold text-gray-600'>7 Days Return Policy</Text>
          <Text className='text-gray-400 text-sm'>We provide 7 days free return policy</Text>
        </View>
        <View className='flex gap-2 items-center'>
          <MaterialIcons name="headphones" size={35} color="black" />
          <Text className='font-semibold text-gray-600'>Best Customer Support</Text>
          <Text className='text-gray-400 text-sm'>We provide 24/7 customer support</Text>
        </View>
      </View>
      <View className='h-[1px] w-full bg-gray-400' />
      <Footer />

    </ScrollView>
  );
}
