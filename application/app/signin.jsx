import { useState } from 'react'
import '../global.css'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import axios from 'axios';
import { useShopContext } from '@/context/ShopContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Signin() {
    const [state, setState] = useState('signin');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const { backendUrl } = useShopContext();
    const handleSubmit = async () => {
        console.log(formData)
        const response = state === 'signup' ? await axios.post(backendUrl + '/api/user/register', formData) : await axios.post(backendUrl + '/api/user/login', formData);
        if (response.data.success) {
            console.log("Success", response.data)
            await AsyncStorage.setItem('token', response.data.token);
        }
        else {
            console.log("Failed", response.data.message)
        }
    }
    return (
        <View className="flex-1 items-center justify-center bg-white gap-3">
            <Text className="text-3xl prata-regular realtive bottom-5">{state === 'signin' ? 'LOG IN' : 'SIGN UP'}</Text>
            {state === 'signup' &&
                <View className="flex-row items-center w-[75%] justify-between">
                    <Text>Name</Text>
                    <TextInput
                        onChangeText={(text) => setFormData({ ...formData, name: text })}
                        value={formData.name}
                        className="mb-2 border border-gray-400 rounded-lg w-[70%] px-2 py-2"
                    />
                </View>
            }

            <View className="flex-row items-center w-[75%] justify-between">
                <Text>Email</Text>
                <TextInput
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                    value={formData.email}
                    className="mb-2 border border-gray-400 rounded-lg w-[70%] px-2 py-2"
                />
            </View>

            <View className="flex-row items-center w-[75%] justify-between">
                <Text>Password</Text>
                <TextInput
                    onChangeText={(text) => setFormData({ ...formData, password: text })}
                    value={formData.password}
                    secureTextEntry
                    className="mb-2 border border-gray-400 rounded-lg w-[70%] px-2 py-2"
                />
            </View>

            <TouchableOpacity onPress={handleSubmit} className="bg-black w-[75%] py-3 mt-3 rounded-lg">
                <Text className="text-white text-center">{state === 'signin' ? 'Log In' : 'Sign Up'}</Text>
            </TouchableOpacity>
            <View className="flex flex-col gap-2 mt-10 justify-end items-end w-[75%]">
                {state === 'signin' && <Text className="text-sm text-gray-400">Forgot Password?</Text>}
                <View className="flex-row items-center">
                    <Text className="text-sm text-gray-400">{state === 'signin' ? 'Don\'t have an account? ' : 'Already have an account? '} </Text>
                    <TouchableOpacity onPress={() => setState(state === 'signin' ? 'signup' : 'signin')}>
                        <Text className="text-blue-400 text-sm">{state === 'signin' ? 'Sign Up' : 'Log In'}</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}
