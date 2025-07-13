import React, { useEffect, useRef, useState, useLayoutEffect } from 'react'
import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import { Animated as RNAnimated, Easing } from 'react-native'
import { useNavigation, router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'

const loadingPhrases = [
  'Analizando tus síntomas...',
  'Buscando especialistas cercanos...',
  'Consultando IA médica...',
  'Filtrando resultados para ti...',
  'Casi listo, preparando recomendaciones...'
]

interface Specialist {
  id: string;
  name: string;
  specialty: string;
  location: string;
}

const mockSpecialists: Specialist[] = [
  { id: '1', name: 'Dra. Ana López', specialty: 'Psicología', location: 'CDMX' },
  { id: '2', name: 'Dr. Juan Pérez', specialty: 'Nutrición', location: 'Guadalajara' },
  { id: '3', name: 'Dra. Sofía Ramírez', specialty: 'Medicina General', location: 'Monterrey' },
]

const Result = () => {
  const [loading, setLoading] = useState(true)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [specialists, setSpecialists] = useState<Specialist[]>([])
  const progress = useRef(new RNAnimated.Value(0)).current
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerTransparent: true,
      headerLeft: () => (
        <TouchableOpacity onPressIn={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#7c3aed" />
        </TouchableOpacity>
      ),
    })
  }, [])

  useEffect(() => {
    if (!loading) return
    RNAnimated.timing(progress, {
      toValue: 1,
      duration: 6000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start()
    const phraseInterval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % loadingPhrases.length)
    }, 1800)
    const timeout = setTimeout(() => {
      setLoading(false)
      setSpecialists(mockSpecialists)
    }, 6000)
    return () => {
      clearInterval(phraseInterval)
      clearTimeout(timeout)
      progress.setValue(0)
    }
  }, [loading])

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  })

  return (
    <View style={styles.container}>
      {loading ? (
        <Animated.View entering={FadeIn} exiting={FadeOut} style={styles.loadingBox}>
          <Text style={styles.loadingTitle}>Estamos trabajando en tu recomendación</Text>
          <Text style={styles.loadingPhrase}>
            {loadingPhrases[phraseIndex]}
          </Text>
          <View style={styles.progressBarBg}>
            <RNAnimated.View style={[styles.progressBar, { width: barWidth }]} />
          </View>
        </Animated.View>
      ) : (
        <Animated.View entering={FadeIn} style={styles.resultBox}>
          <Text style={styles.resultTitle}>
            Especialistas recomendados para ti
          </Text>
          <FlatList
            data={specialists}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.specialistCard}>
                <Text style={styles.specialistName}>{item.name}</Text>
                <Text style={styles.specialistSpecialty}>{item.specialty}</Text>
                <Text style={styles.specialistLocation}>{item.location}</Text>
              </View>
            )}
            ListEmptyComponent={<Text style={styles.emptyText}>No se encontraron especialistas</Text>}
          />
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  loadingBox: {
    alignItems: 'center',
    width: '100%',
  },
  loadingTitle: {
    fontFamily: 'mn-sb',
    fontSize: 18,
    color: Colors.dark.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingPhrase: {
    fontFamily: 'mn-r',
    fontSize: 16,
    color: Colors.dark.onBackground,
    textAlign: 'center',
    minHeight: 24,
    marginBottom: 24,
  },
  progressBarBg: {
    width: '100%',
    height: 12,
    backgroundColor: Colors.dark.primaryContainer,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 32,
  },
  progressBar: {
    height: 12,
    backgroundColor: Colors.dark.primary,
    borderRadius: 8,
  },
  resultBox: {
    width: '100%',
  },
  resultTitle: {
    fontFamily: 'mn-sb',
    fontSize: 20,
    color: Colors.dark.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  specialistCard: {
    backgroundColor: Colors.dark.primaryContainer,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  specialistName: {
    fontFamily: 'mn-sb',
    fontSize: 17,
    color: Colors.dark.onBackground,
  },
  specialistSpecialty: {
    fontFamily: 'mn-r',
    fontSize: 15,
    color: Colors.dark.primary,
  },
  specialistLocation: {
    fontFamily: 'mn-r',
    fontSize: 14,
    color: Colors.dark.outline,
  },
  emptyText: {
    textAlign: 'center',
    color: Colors.dark.outline,
    marginTop: 24,
  },
})

export default Result