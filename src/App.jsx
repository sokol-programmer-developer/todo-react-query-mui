import { CssBaseline } from '@mui/material'
import { QueryClient, QueryClientProvider } from 'react-query'

import { ThemeProvider, createTheme } from '@mui/material/styles'

import Home from './pages/Home'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
})

const primaryColor = '#A9A9A9'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
  typography: {
    fontFamily: ['Actor', 'Abhaya Libre SemiBold'].join(', ')
  },
  components: {
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 50,
          height: 29,
          padding: 0,
        },
        switchBase: {
          color: "#F4F4F4",
          opacity: 1,
          padding: 2,
          paddingLeft: 3,
          transform: `translateX(calc(50 - 25 - 2))`,
          "&.Mui-checked": {
            color: '#fff',
            ".MuiSwitch-thumb": {
              backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill="${encodeURIComponent(
                primaryColor
              )}" d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>')`,
            }
          },
        },
        track: {
          backgroundColor: "#366EFF",
          opacity: 1,
          borderRadius: 20,
          ".Mui-checked.Mui-checked + &": {
            backgroundColor: "#10C200",
            opacity: 1,
          },
        },
        thumb: {
          width: 25,
          height: 25,
          boxShadow: 'none',
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path fill="${encodeURIComponent(
            primaryColor
          )}" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/><path d="M0 0h24v24H0z" fill="none"/></svg>')`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        },
        checked: {},
      }
    }
  }
})

function App() {
  return (

    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Home />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
