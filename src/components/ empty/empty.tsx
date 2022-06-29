import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

interface EmptyInterface {
  text: string;
}

const Empty: React.FC<EmptyInterface> = ({text}) => {
  console.log(text);
  return (
    <View style={styles.emptyBox}>
      <Text>{text}</Text>
    </View>
  );
};

export default Empty;

const styles = StyleSheet.create({
  emptyBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
