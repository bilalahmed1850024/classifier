import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const Spinner = ({size}) => {
  return (
    <View style={styles.spinnerStyle}>
      <ActivityIndicator size={size || 'large'} color="#00ff00" />
    </View>
  );
};

const styles = {
  spinnerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10, 
    backgroundColor: '#009387',
  },
};

export {Spinner};
