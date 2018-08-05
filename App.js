/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, Image, Easing,TouchableHighlight } from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.animatedValue1 = new Animated.Value(0)
    this.animatedValue2 = new Animated.Value(0)
    this.animatedValue3 = new Animated.Value(0)
  }

  componentDidMount() {
    this.animate()
  }
  animate() {
    this.animatedValue1.setValue(0)
    this.animatedValue2.setValue(0)
    this.animatedValue3.setValue(0)
    const createAnimation = function (value, duration, easing, delay = 0) {
      return Animated.timing(
        value,
        {
          toValue: 1,
          duration,
          easing,
          delay
        }
      )
    }
    Animated.parallel([
      createAnimation(this.animatedValue1, 2000, Easing.ease),
      createAnimation(this.animatedValue2, 1000, Easing.ease, 1000),
      createAnimation(this.animatedValue3, 1000, Easing.ease, 2000)
    ]).start()
  }

  render() {
    const scaleText = this.animatedValue1.interpolate({
      inputRange: [0, 0.5,1],
      outputRange: [0.5, 2,0.5]
    })
    const spinText = this.animatedValue2.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '720deg']
    })
    const introButton = this.animatedValue3.interpolate({
      inputRange: [0, 1],
      outputRange: [-100, 400]
    })
    return (
      <View style={styles.container}>
        <Animated.View
          style={{ transform: [{ scale: scaleText }] }}>
          <Text>Welcome</Text>
        </Animated.View>
        <Animated.View
          style={{ marginTop: 20, transform: [{ rotate: spinText }] }}>
          <Text
            style={{ fontSize: 20 }}>
            to the App!
          </Text>
        </Animated.View>
        <Animated.View
          style={{ top: introButton, position: 'absolute' }}>
          <TouchableHighlight
            onPress={this.animate.bind(this)}
            style={styles.button}>
            <Text
              style={{ color: 'black', fontSize: 20 }}>
              Click Here To Start
            </Text>
          </TouchableHighlight>
        </Animated.View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
