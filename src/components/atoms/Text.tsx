import React from 'react';
import {Text} from 'react-native';

interface ITextProps {
  text: string | undefined | number;
  style?: Object;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  numberOfLines?: number;
}

export const TextComponent = (props: ITextProps) => {
  const {style, text, numberOfLines, ellipsizeMode} = props;
  return (
    <Text
      style={style}
      allowFontScaling={false}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}>
      {text}
    </Text>
  );
};
