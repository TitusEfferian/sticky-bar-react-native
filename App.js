/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet,TouchableOpacity, Text, View, Animated, Image, Easing, TouchableHighlight } from 'react-native';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      animationValue: 0,
      animationFinishValue: 1,
      marginMovingStart: 0,
      marginMovingEnd: 128,
      colorStart:'green',
      colorEnd:'yellow'
    }
    this.animatedValue = new Animated.Value(this.state.animationValue)
  }

  viewAnimated() {
    this.animatedValue.setValue(0)
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear
      }
    ).start()
  }

  stateChecker() {
    if (this.state.animationValue == 0) {
      this.setState({ animationValue: 1, marginMovingStart: 128, marginMovingEnd: 0,colorStart:'yellow' })
    }
    else if (this.state.animationValue == 1) {
      this.setState({ animationValue: 0, marginMovingStart: 0, marginMovingEnd: 128,colorEnd:'green' })

    }

  }

  render() {

    const movingBox = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [this.state.marginMovingStart, this.state.marginMovingEnd]
    })

    const changingColor = this.animatedValue.interpolate({
      inputRange:[0,1],
      outputRange:[this.state.colorStart,this.state.colorEnd]
    })

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => { this.viewAnimated(), this.stateChecker() }}>
          <View style={{ paddingVertical: 8, paddingHorizontal: 16, borderRadius: 60, borderColor: 'black', borderWidth: 1 }}>
            <Text>press</Text>
          </View>
        </TouchableOpacity>
        <Animated.View style={{ width: 50, height: 50, backgroundColor: changingColor, marginTop: 16, marginLeft: movingBox }}></Animated.View>
        <Text>{this.state.animationValue}</Text>
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
