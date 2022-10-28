import PropTypes from "prop-types";
import React from "react";
import { View, StyleSheet } from "react-native";

export default function Spacer({ width, height }) {
  return (
    <View
      style={{
        width,
        height,
      }}
    />
  );
}

Spacer.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

Spacer.defaultProps = {
  width: 1,
  height: 1,
};
