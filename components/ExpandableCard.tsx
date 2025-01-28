import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { PropsWithChildren } from "react";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface Props {
    headerTitle: string
    headerText: string
    bodyTitle: string
    cardOpen: boolean
    setCardOpen: (open: boolean) => void
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);


const ExpandableCard = ({ cardOpen, setCardOpen, headerTitle, headerText, bodyTitle, children }: PropsWithChildren<Props>) => {
  return (
    <View style={styles.card}>
      {!cardOpen && (
        <AnimatedTouchableOpacity
          onPress={() => setCardOpen(false)}
          style={styles.cardPreview}
          entering={FadeIn.duration(200)}
          exiting={FadeOut.duration(200)}
        >
          <Text style={styles.previewText}>{headerTitle}</Text>
          <Text style={styles.previewText}>
            {headerText}
          </Text>
        </AnimatedTouchableOpacity>
      )}

      {cardOpen && (
        <>
          <Animated.Text entering={FadeIn} style={styles.cardHeader}>
            {bodyTitle}
          </Animated.Text>
          <Animated.View style={styles.cardBody}>
            {children}
          </Animated.View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    margin: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    gap: 20,
  },
  previewText: {
    fontFamily: "mn-sb",
    fontSize: 14,
    color: "#000",
  },
  cardPreview: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  cardHeader: {
    fontFamily: "mn-b",
    fontSize: 24,
    padding: 20,
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
});

export default ExpandableCard;
