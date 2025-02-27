import LoginPage from './pages/loginPage/LoginPage'
import { CssBaseline, GlobalStyles } from '@mui/material'
import Routing from './routing/Routing'

function App() {

  return (
    <>
    {/* CssBaseline resets default browser styles */}
    <CssBaseline />
      {/* Custom Global Styles */}
      <GlobalStyles
        styles={{
          html: {
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%",
          },
          body: {
            margin: 0,
            padding: 0,
            width: "100%",
            height: "100%",
          },
          "#root": {
            width: "100%",
            height: "100%",
            backgroundColor:'rgb(243,243,243)'
          },
        }}
      />
      <Routing />

    </>
      
  )
}

export default App
