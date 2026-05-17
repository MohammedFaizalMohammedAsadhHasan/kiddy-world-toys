import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
  return (
    <LinearGradient
      colors={['#FF6B9D', '#FF8E53', '#FFD93D']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Text style={styles.title}>Kiddy World</Text>
        <Text style={styles.subtitle}>Toys</Text>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>🧸</Text>
          <Text style={styles.emoji}>🚗</Text>
          <Text style={styles.emoji}>🎮</Text>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 36,
    fontWeight: '300',
    color: '#fff',
    marginTop: -10,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  emojiContainer: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 20,
  },
  emoji: {
    fontSize: 50,
  },
});

export default SplashScreen;
