import '../App.css'
import VLA from '../pictures/VLA.png'
import Card from '../components/Card'
import Footer from '../components/Footer'

function App() {
  const footerInfo = [{
  }]
  return (
    <div className="App">
      <h1 style={{ "color": "#00CCFF", "fontFamily": "-apple-system,BlinkMacSystemFont,'Segoe UI','Roboto','Oxygen','Ubuntu','Cantarell','Fira Sans','Droid Sans','Helvetica Neue',sans-serif" }}>Gachiho Leader Board</h1>
      <Card image={VLA} title="VeryLongAnimals" link='/VLA' style={{ marginBottom: '20px' }} />
      <hr
        style={{
          background: "#FFFFFF",
          height: "2px",
          border: "none",
        }}
      />
      <Footer links={footerInfo} />
    </div>
  )
}
export default App
