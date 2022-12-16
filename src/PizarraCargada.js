import CanvasCargar from './componentes/CanvasCargar';
function PizarraCargada(props) {
  return (
  <CanvasCargar name={props.name} idUsuario={props.idUsuario}></CanvasCargar>
  );
}

export default PizarraCargada;