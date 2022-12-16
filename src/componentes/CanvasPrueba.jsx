import '../App.css';
import CanvasAdministrador from './CanvasAdministrador';
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import ReactDOM from "react-dom/client";
function CanvasPrueba(props) {
    const firebaseConfig = {
        apiKey: "AIzaSyA6MIt0ytsj6mIS-qcYhRqoM7das3AV880",
        authDomain: "pizarra-1528c.firebaseapp.com",
        projectId: "pizarra-1528c",
        storageBucket: "pizarra-1528c.appspot.com",
        messagingSenderId: "362476303725",
        appId: "1:362476303725:web:5c82702d8f2bfddcbcd664",
        measurementId: "G-0KQNTCB4HM",
      };
      const root = ReactDOM.createRoot(document.getElementById("root"));
      // Initialize Firebase
      const iniApp = initializeApp(firebaseConfig);
      const db = getFirestore(iniApp);
       validarMano();

      async function validarMano(){
        const usuarios = collection(db, "pizarraCompartida");
        const use = await getDocs(usuarios);
        const datos = use.docs.map((doc) => ({
          id: doc.id,
          administrador:doc.data().Administrador,
          grupo:doc.data().Grupo,
          pizarra64: doc.data().Pizarra64,
          mano:doc.data().Mano
        }));
        for(let i=0;i<datos.length;i++){
           if(datos[i].id===props.nombrePizarra && datos[i].mano!=props.mano){
              root.render(      
            <CanvasAdministrador mano={datos[i].mano} idUsuario={props.idUsuario} nombrePizarra={props.nombrePizarra} grupo={props.grupo} codigo={props.codigo}></CanvasAdministrador>)
           }
        }
      }
  return (
    <CanvasAdministrador mano={props.mano} idUsuario={props.idUsuario} nombrePizarra={props.nombrePizarra} grupo={props.grupo} codigo={props.codigo}></CanvasAdministrador>
  );
}

export default CanvasPrueba;