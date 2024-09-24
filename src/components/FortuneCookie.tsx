import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { api } from '../services/api/api';

export default function FortuneCookie() {
  const [broken, setBroken] = useState(false);
  const [fortune, setFortune] = useState(''); 
  const [loading, setLoading] = useState(false);  

  // Função para quebrar o biscoito e pegar uma frase
  const getFortune = async () => {
    setLoading(true);
    try {
      const response = await api.get('/fortunes');
      const randomFortune = response.data[Math.floor(Math.random() * response.data.length)];
      setFortune(randomFortune.message);
      setBroken(true);
    } catch (error) {
      console.error('Erro ao buscar frase de sorte', error);
    } finally {
      setLoading(false); 
    }
  };

  // Função para resetar o biscoito
  const resetCookie = () => {
    setBroken(false);
    setFortune('');
  };

  return (
    <View className="flex-1 w-full justify-center items-center bg-gray-600">
      <Text className="text-2xl font-bold mb-4">Quebre o biscoito da sorte!</Text>

      {!broken ? (
        <TouchableOpacity onPress={getFortune}>
          <Image
            source={require('../../assets/fortune_cookie_closed.png')} 
            className="w-48 h-48"
          />
        </TouchableOpacity>
      ) : (
        <View className="items-center">
          <Image
            source={require('../../assets/fortune_cookie_open.png')}
            className="w-48 h-48"
          />
          {loading ? (
            <ActivityIndicator size="large" color="#000" className="mt-4" />
          ) : (
            <>
              <Text className="mt-4 text-lg text-center">{fortune}</Text>
              <TouchableOpacity onPress={resetCookie} className="mt-4">
                <Text className="text-blue-500 text-lg">Quebrar outro biscoito</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );
}
