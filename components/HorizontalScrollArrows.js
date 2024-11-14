import React, { useRef, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from 'react-native-vector-icons';

const HorizontalScrollWithArrows = ({ children }) => {
  const scrollViewRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const cardwidth = 177 * 2;

  const scroll = (direction) => {
    if (scrollViewRef.current) {
        scrollViewRef.current.measure(() => {
            const scrollAmount = direction === 'left' ? scrollPosition - cardwidth : scrollPosition + cardwidth;
            scrollViewRef.current.scrollTo({ x: scrollAmount, animated: true });
          });
    }
  };

  const handleScroll = (event) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    if (contentOffset && layoutMeasurement && contentSize) {
        setShowLeftArrow(contentOffset.x > 0);
        setScrollPosition(contentOffset.x)
        setShowRightArrow(contentOffset.x < contentSize.width - layoutMeasurement.width);
    }
  };
  return (
    <View style={styles.container}>
      {showLeftArrow && (
        <TouchableOpacity style={[styles.arrow, styles.leftArrow]} onPress={() => scroll('left')}>
          <FontAwesome name="chevron-left" size={20} color="#fff" />
        </TouchableOpacity>
      )}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {children}
      </ScrollView>
      {showRightArrow && (
        <TouchableOpacity style={[styles.arrow, styles.rightArrow]} onPress={() => scroll('right')}>
          <FontAwesome name="chevron-right" size={20} color="#fff" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  arrow: {
    position: 'absolute',
    top: '50%',
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    padding: 10,
  },
  leftArrow: {
    left: 10,
  },
  rightArrow: {
    right: 10,
  },
});

export default HorizontalScrollWithArrows;