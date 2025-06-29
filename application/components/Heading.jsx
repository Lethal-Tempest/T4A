import React from 'react'
import { View, Text } from 'react-native'

const Heading = ({title1, title2}) => {
  return (
    <View className='flex flex-row gap-2 items-center'>
        <Text className='text-gray-500 font-semibold text-2xl'>{title1}</Text>
        <Text className='text-gray-700 font-bold text-2xl'>{title2}</Text>
        <View className='h-[2px] w-8 bg-[#414141]' />
    </View>
  )
}

export default Heading