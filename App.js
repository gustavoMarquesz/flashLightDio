import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity, } from 'react-native';
import Torch from "react-native-torch";
import RNShake from 'react-native-shake';
import imageOn from './assets/icons/eco-light.png';
import imageOff from './assets/icons/eco-light-off.png';
import logoDio from './assets/icons/logo-dio.png';
import logoDioW from './assets/icons/logo-dio-white.png';

const App = () => {
  const [toggle, setToggle] = useState(false)

  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() => {
    // liga o flash do cell
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() => {
    /**
     * mudar o toggle quando balança o cell
     */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });
  
    return () => subscription.remove();
  }, []);

  return (
    <View style={toggle ? style.containerLight : style.container} >
      <TouchableOpacity onPress={handleChangeToggle}>
        <Image
          style={toggle ? style.lightingOn : style.lightingOff}
          source={toggle ? imageOn: imageOff}/>
        <Image style={style.dioLogo}source={toggle ? logoDio : logoDioW}/>
      </TouchableOpacity>
    </View>
  );
};
export default App

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },

  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  lightingOn: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightingOff: {
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },

  dioLogo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 200,
    height: 200,
  },

});