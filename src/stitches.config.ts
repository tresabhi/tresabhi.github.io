import {
  indigoDark,
  mauveA,
  mauveDark,
  mauveDarkA,
  purpleDark,
} from '@radix-ui/colors';
import { createStitches } from '@stitches/react';
import {
  createBorderStyles,
  createColors,
  createFontSizes,
  createFontWeights,
  createRadii,
  createSizes,
  createSpaces,
} from 'bepaint';

export const {
  config,
  createTheme,
  css,
  getCssText,
  globalCss,
  keyframes,
  prefix,
  reset,
  styled,
  theme,
} = createStitches({
  theme: {
    colors: {
      ...createColors(mauveDark),
      ...createColors(indigoDark, 'accent'),
      ...createColors(purpleDark, 'accentSecondary'),
      ...createColors(mauveDarkA, 'glass'),
      ...createColors(mauveA, 'glassLight'),
    },
    fontSizes: {
      ...createFontSizes(),

      // TODO: add this to bepaint
      title: '4rem',
    },
    space: createSpaces(),
    radii: createRadii(),
    borderStyles: {
      ...createBorderStyles(mauveDark),
      ...createBorderStyles(mauveDarkA, undefined, 'glass'),
    },

    transitions: {
      regular: '0.25s',
    },

    sizes: {
      ...createSizes(),

      pageWidth: '54rem',
    },

    fontWeights: createFontWeights(),
  },

  media: {
    verticalNavbar: '(max-width: 35rem)',
    twoRowSearch: '(min-width: 48rem)',
  },
});
