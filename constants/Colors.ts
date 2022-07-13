const tintColorLight = '#2f95dc';
const tintColorDark = '#fff';

export enum ColorSet {
//LIGHT TO DARK
  c1 = "#DDD8C4",
  c2 = "#A3C9A8",
  c3 = "#84b59F",
  c4 = "#69A297",
  c5 = "#50808E",
}

export default {
  light: {
    text: '#000',
    background: '#fff',
    tint: tintColorLight,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#fff',
    background: '#000',
    tint: tintColorDark,
    tabIconDefault: '#ccc',
    tabIconSelected: tintColorDark,
  },
};
