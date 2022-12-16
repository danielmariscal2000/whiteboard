import './App.css';
import Canvas from './componentes/Canvas.jsx';
function App(props) {
  return (
  <Canvas idUsuario={props.data}/>
  );
}

export default App;
