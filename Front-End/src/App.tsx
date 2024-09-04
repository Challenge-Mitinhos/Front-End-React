import HeaderComponent from "./components/Header/HeaderComponent"
import Logo from "./svg/Logo"

function App() {

  return (
    <>
      <HeaderComponent icon={<Logo width="4em" height="4em" color="#01A1FD"/>}/>
    </>
  )
}

export default App
