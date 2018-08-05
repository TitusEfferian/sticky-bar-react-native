/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Animated, Image, Easing, TouchableHighlight } from 'react-native';


const arr = []
for (var a = 0; a < 500; a++) {
  arr.push(a)
}

export default class App extends Component {

  constructor() {
    super()
    this.animatedValue = []
    arr.forEach((value) => {
      this.animatedValue[value] = new Animated.Value(0)
    })
    this.colorAnimatedValue = new Animated.Value(0)
  }

  componentDidMount() {
    //this.animate()
  }
  animate() {
    this.colorAnimatedValue.setValue(0)
    const animations = arr.map((item) => {
      return Animated.timing(
        this.animatedValue[item],
        {
          toValue: 1,
          duration: 50
        }
      )
    })
    Animated.sequence(animations).start()
  }

  render() {
    const changeColor = this.colorAnimatedValue.interpolate({
      inputRange:[0,1],
      outputRange:['black','blue']
    })
    const animations = arr.map((a, i) => {
      return <Animated.View key={i} style={{ opacity: this.animatedValue[a], height: 20, width: 20, backgroundColor: changeColor, marginLeft: 3, marginTop: 3 }} />
    })
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={()=>{this.animate()}}>
          <View style={{padding:8,justifyContent:'center',alignItems:'center',borderColor:'black',borderWidth:1}}>
            <Text>Press</Text>
          </View>
        </TouchableHighlight>
        {animations}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
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
