import { styled, theme } from 'stitches.config';

export const HeroButton = styled('button', {
  padding: `${theme.space.paddingRegular} ${theme.space.paddingMajor}`,
  borderRadius: theme.radii.regular,
  transition: theme.transitions.regular,
  userSelect: 'none',
  color: theme.colors.textHighContrast_accent,
  fontSize: theme.fontSizes.subheading,
  backgroundImage: `linear-gradient(-45deg, ${theme.colors.componentSolidInteractive_accent}, ${theme.colors.componentSolidInteractive_accentSecondary})`,
  boxShadow: `0 0 2px ${theme.colors.componentInteractive}, 0 0 0 0 ${theme.colors.componentInteractive_accent}`,
  border: 'none',
  cursor: 'pointer',
  transform: 'scale(1)',

  '&:hover, &:focus': {
    filter: 'brightness(1.1)',
    boxShadow: `0 0 10px ${theme.colors.textHighContrast_accent}, 0 0 0 1px ${theme.colors.textHighContrast_accent}`,
  },

  variants: {
    showProjects: {
      true: {
        transform: 'scale(0)',
        position: 'absolute',
      },
    },
  },
});
