import './App.css';
import ReactDOM from "react-dom/client";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import CanvasAdministrador from "./componentes/CanvasAdministrador";
import CanvasLector from "./componentes/CanvasLector";
export default function MostrarPizarras(props) {
  const root = ReactDOM.createRoot(document.getElementById("root"));
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

  async function cargarPizarras(idUsuario){
    const pizarrasCompartidas = collection(db, "pizarraCompartida");
    const use = await getDocs(pizarrasCompartidas);
    const datos = use.docs.map((doc) => ({
      id: doc.id,
      administrador:doc.data().Administrador,
      grupo:doc.data().Grupo
    }));
      let res=[];
      for (let i = 0; i < datos.length; i++) {
        if(datos[i].administrador===idUsuario){
              res.push(datos[i].id);
        }
        for(let j=0;j<datos[i].grupo.length;j++){
            if(datos[i].grupo[j]===idUsuario){
                res.push(datos[i].id);
            }
        }
      }
      return res;

  }
  async function pizarraCargar(nombrePizarra,idUsuario){
    const pizarrasCompartidas = collection(db, "pizarraCompartida");
    const use = await getDocs(pizarrasCompartidas);
    const datos = use.docs.map((doc) => ({
      id: doc.id,
      administrador:doc.data().Administrador,
      grupo:doc.data().Grupo,
      mano:doc.data().Mano,
      codigo:doc.data().Codigo
    }));
    
    for(let i=0;i<datos.length;i++){

      if(datos[i].id===nombrePizarra){
          if(datos[i].administrador===props.idUsuario){
            root.render(
                <CanvasAdministrador mano={datos[i].mano} idUsuario={props.idUsuario} nombrePizarra={nombrePizarra} grupo={datos[i].grupo} codigo={datos[i].codigo}></CanvasAdministrador>
            );
          }
          else{
            root.render(
            <CanvasLector idUsuario={props.idUsuario} nombrePizarra={nombrePizarra} mano={datos[i].mano} grupo={datos[i].grupo} codigo={datos[i].codigo}></CanvasLector>
            );
          }
      }
    }
  }
  let arrrayNom=cargarPizarras(props.idUsuario).then(response=>{
    root.render(
      <>
         <h1 >Mis Pizarras Compartidas</h1>     
        {response.map((nombre) => (
            <button key={nombre} onClick={()=>pizarraCargar(nombre,props.data)} className="btn-global">{nombre}</button>
        ))}
        </>
    );
  });
};




