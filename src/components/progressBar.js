import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';

export default class ProgressBar extends Component {
  bgColor = () => {
    const half = Math.floor(this.props.maxTime / 2);
    const x = Math.floor(
      (this.props.progressStatus * 2 * 255) / this.props.maxTime,
    );
    if (this.props.progressStatus <= half) {
      return `rgb(${x}, 255, 50)`;
    } else {
      return `rgb(255, ${510 - x} , 50)`;
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.inner,
            {
              backgroundColor: this.bgColor(),
              width:
                (this.props.progressStatus * 100) / this.props.maxTime + '%',
            },
          ]}
        />
      </View>
    );
  }
  componentDidUpdate() {
    this.bgColor();
  }
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 30,
    borderWidth: 1,
    borderColor: '#FFFDE4',
    borderRadius: 7.5,
    justifyContent: 'center',
  },
  inner: {
    width: '100%',
    height: 28,
    borderRadius: 7.6,
  },
});
