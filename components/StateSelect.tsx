import React from "react";
import { Modal, FlatList, Pressable, Text, View } from "react-native";
import { mexicoStates } from "@/utils/mexicoStates";

interface StateSelectProps {
  visible: boolean;
  onClose: () => void;
  onSelect: (state: string) => void;
  selectedState: string;
}

const StateSelect = ({ visible, onClose, onSelect, selectedState }: StateSelectProps) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ backgroundColor: '#fff', borderRadius: 16, width: '85%', maxHeight: '70%' }}>
          <FlatList
            data={mexicoStates}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  onSelect(item.name);
                  onClose();
                }}
                style={{ padding: 18, borderBottomWidth: 1, borderBottomColor: '#eee', backgroundColor: selectedState === item.name ? '#f3e8ff' : '#fff' }}
              >
                <Text style={{ color: '#000', fontSize: 16, fontFamily: 'mn-r' }}>{item.name}</Text>
              </Pressable>
            )}
            ListFooterComponent={<Pressable onPress={onClose} style={{ padding: 18, alignItems: 'center' }}><Text style={{ color: '#7c3aed', fontWeight: 'bold', fontFamily: 'mn-sb' }}>Cancelar</Text></Pressable>}
          />
        </View>
      </View>
    </Modal>
  );
};

export default StateSelect;
