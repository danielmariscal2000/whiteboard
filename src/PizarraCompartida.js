import CanvasCompartido from './componentes/CanvasCompartido';
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import MostrarPizarras from "./MostrarPizarras";
import ReactDOM from "react-dom/client";
function PizarraCompartida(props) {
  const firebaseConfig = {
    apiKey: "AIzaSyA6MIt0ytsj6mIS-qcYhRqoM7das3AV880",
    authDomain: "pizarra-1528c.firebaseapp.com",
    projectId: "pizarra-1528c",
    storageBucket: "pizarra-1528c.appspot.com",
    messagingSenderId: "362476303725",
    appId: "1:362476303725:web:5c82702d8f2bfddcbcd664",
    measurementId: "G-0KQNTCB4HM",
  };
  const iniApp = initializeApp(firebaseConfig);
const db = getFirestore(iniApp);
validacion();
async function validacion(){
  const pizarrasCompartidas = collection(db, "pizarraCompartida");
const use = await getDocs(pizarrasCompartidas);
const datos = use.docs.map((doc) => ({
  id: doc.id,
  administrador:doc.data().Administrador,
  grupo:doc.data().Grupo
}));
const root = ReactDOM.createRoot(document.getElementById("root"));
   let val=false;
   for(let i=0;i<datos.length;i++){
      if(datos[i].administrador===props.idUsuario){
        val=true;
        root.render (
          <MostrarPizarras idUsuario={props.idUsuario}></MostrarPizarras>
          );
      }
      for(let j=0;j<datos[i].grupo.length;j++){
         if(datos[i].grupo[j]===props.idUsuario){
          val=true;
          root.render(
          <MostrarPizarras idUsuario={props.idUsuario}></MostrarPizarras>
          );
         }
      }
   }
   if(val===false){
      root.render(
        <h1>Usted No tiene pizarras Compartidas</h1>
      );
   }
}
}
export default PizarraCompartida;