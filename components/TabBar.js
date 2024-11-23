import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import HamburgerMenu from './HamburgerMenu';

const TabBar = () => {
  return (
    <View style={styles.tabBarContainer}>
      {/* Tab for Hamburger Menu */}
      <TouchableOpacity style={styles.tabItem}>
        <HamburgerMenu />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2E2E2E',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: '#444',
  },
  tabItem: {
    alignItems: 'center',
  },
});

export default TabBar;
