import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { Colors } from '@/constants/Colors'

const ModalHeaderText = () => {
  return (
    <View style={{flexDirection: 'row', justifyContent: "center"}}>
      <Text style={{ fontFamily: "mn-sb", fontSize: 18,}}>Filtrar Especialistas</Text>
    </View>
  )
}

export default ModalHeaderText
