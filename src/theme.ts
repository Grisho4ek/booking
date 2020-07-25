import { createMuiTheme } from '@material-ui/core/styles';
import { grey, blue, yellow } from '@material-ui/core/colors';

declare module '@material-ui/core/styles/createPalette' {
  interface Palette {
    neutral: Palette['primary'];
  }
  interface PaletteOptions {
    neutral: PaletteOptions['primary'];
  }
}

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[700]
    },
    secondary: {
      main: yellow[700]
    },
    neutral: {
      main: grey[100]
    }
  },
  overrides: {
    MuiPaper: {
      rounded: {
        borderRadius: '10px'
      }
    },
    MuiButton: {
      contained: {
        borderRadius: '10px'
      },
      outlined: {
        borderRadius: '10px'
      },
      containedPrimary: {
        color: '#fff'
      }
    }
  }
});
