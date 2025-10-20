import { useWindowDimensions } from 'react-native';

function useMetrics() {
  const { width: windowWidth, height: windowHeight } = useWindowDimensions();

  const guidelineBaseWidth: number = 375;
  const guidelineBaseHeight: number = 812;

  // Usage: width, marginLeft, marginRight, marginHorizontal, paddingLeft, paddingRight, paddingHorizontal
  const horizontalScale = (size: number): number =>
    (windowWidth / guidelineBaseWidth) * size;

  // Usage: height, marginTop, marginBottom, marginVertical, lineHeight, paddingTop, paddingBottom, paddingVertical
  const verticalScale = (size: number): number =>
    (windowHeight / guidelineBaseHeight) * size;

  // Usage: fontSize, borderRadius
  const moderateScale = (size: number, factor: number = 0.5): number =>
    size + (horizontalScale(size) - size) * factor;

  return {
    windowWidth,
    windowHeight,
    horizontalScale,
    verticalScale,
    moderateScale,
  };
}

export default useMetrics;
