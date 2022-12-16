import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore,updateDoc } from "firebase/firestore";
import "./App.css";
import { doc, setDoc } from "firebase/firestore"; 
import ReactDOM from "react-dom/client";
import "./componentes/canvas.css";
import PizarraN from "./PizarraN";
import PizarraCargada from "./PizarraCargada";
import PizarraCompartida from "./PizarraCompartida";
import CanvasAdministrador from "./componentes/CanvasAdministrador";
const firebaseConfig = {
  apiKey: "AIzaSyA6MIt0ytsj6mIS-qcYhRqoM7das3AV880",
  authDomain: "pizarra-1528c.firebaseapp.com",
  projectId: "pizarra-1528c",
  storageBucket: "pizarra-1528c.appspot.com",
  messagingSenderId: "362476303725",
  appId: "1:362476303725:web:5c82702d8f2bfddcbcd664",
  measurementId: "G-0KQNTCB4HM",
  storageBucket: "pizarra-1528c.appspot.com",
};

// Initialize Firebase
const iniApp = initializeApp(firebaseConfig);
const db = getFirestore(iniApp);

async function cargarPizarras(idUsuario) {
  const usuarios = collection(db, "usuarios");
  const use = await getDocs(usuarios);
  const datos = use.docs.map((doc) => ({
    id: doc.id,
    nombre: doc.data().nombre,
    imagen: doc.data().imagen,
  }));
  return arrayNombres(datos, idUsuario);
}

function arrayNombres(datos, idUsuario) {
  let res = [];
  for (let i = 0; i < datos.length; i++) {
    if (datos[i].id === idUsuario) {
      res = datos[i].nombre;
    }
  }
  return res;
}
async function registrar(idUsuario,nombrePizarra,cod){
  await setDoc(doc(db, "pizarraCompartida", nombrePizarra), {Administrador:idUsuario,Grupo:[],Mano:"",Pizarra64:"",Codigo:cod});
}
function pizarraNueva(idUsu){
  let inputValue = document.getElementById("domTextElement").value;
  root.render(<PizarraN idUsuario={idUsu} nombre={inputValue}></PizarraN>);
}
function nuevaPizarraCompartida(idUsu){
  let inputValue = document.getElementById("domTextElement2").value;
  if(inputValue!=""){
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1= Math.random().toString(36).substring(0,6);  
    registrar(idUsu,inputValue,result1);
    root.render(<CanvasAdministrador idUsuario={idUsu} nombrePizarra={inputValue} mano="" grupo="" codigo={result1}></CanvasAdministrador>);
  }
  else{
    root.render(<>
    <h1>Tiene que poner un nombre valido</h1>
    </>);
  }
}
async function unirsePizarra(codigoPiz,idUsu){
  const usuarios = collection(db, "pizarraCompartida");
  const use = await getDocs(usuarios);
  const datos = use.docs.map((doc) => ({
    id: doc.id,
    administrador:doc.data().Administrador,
    grupo:doc.data().Grupo,
    pizarra64: doc.data().Pizarra64,
    codigo:doc.data().Codigo
  }));
    let grupoNuevo=[];
    let name="";
    let admin="";
    let pizarra="";
    for(let i=0;i<datos.length;i++){
      if(datos[i].codigo===codigoPiz){
        name=datos[i].id;
        admin=datos[i].administrador;
        pizarra=datos[i].pizarra64;
        if(datos[i].grupo.length!=0){
           grupoNuevo=datos[i].grupo;
           grupoNuevo.push(idUsu);
        }
        else{
          grupoNuevo.push(idUsu);
        }
      }
    }

  const washingtonRef = doc(db, "pizarraCompartida", `${name}`);
  await updateDoc(washingtonRef,{
    Administrador:admin,
    Grupo:grupoNuevo,
    Pizarra64:pizarra
  });
}
function pizarraConCodigo(idUsu){
  let inputValue = document.getElementById("domTextElement3").value;
  unirsePizarra(inputValue,idUsu);
  if(inputValue!=""){
  root.render(<h1>Ingreso Favorable,vaya a la seccion "Ver mis pizarras Compartidas"</h1>);
  }
}
function pizarraCompartida(idUsu){
  root.render(<PizarraCompartida idUsuario={idUsu}></PizarraCompartida>);
}
function pizarraCargar(nombre,idUsuario){
   root.render(<PizarraCargada name={nombre} idUsuario={idUsuario}></PizarraCargada>);
}
const root = ReactDOM.createRoot(document.getElementById("root"));
export default function App2(props) {
  // let datos = cargarPizarras(props.data);
  let arrrayNom=cargarPizarras(props.data).then(response=>{
    root.render(
      <>
         <h1 className="title2">Mis Pizarras</h1>     
        {response.map((nombre) => (
            <button key={nombre} onClick={()=>pizarraCargar(nombre,props.data)} className="btn-global">{nombre}</button>
        ))}
        <hr></hr>
        <br />
        <input className="inputT" placeholder={"Titulo nueva pizarra"} type="text" id="domTextElement"></input>
        <button  className="btn-global2" onClick={()=>pizarraNueva(props.data)}>Nueva Pizarra Individual</button>
        <br></br>
        <input className="inputT" placeholder={"Titulo nueva pizarra Compartida"} type="text" id="domTextElement2"></input>
        <button onClick={()=>nuevaPizarraCompartida(props.data)} className="btn-global2">Nueva Pizarra Compartida</button>
        <br/>
        <input className="inputT"  placeholder={"Insertar Codigo"} type="text" id="domTextElement3"></input>
        <button onClick={()=>pizarraConCodigo(props.data)} className="btn-global2">Unirse a una Pizarra</button>
          <br></br>
        <button onClick={()=>pizarraCompartida(props.data)} className="btn-global2">Ver mis Pizarras Compartidas</button>
        <br/>
        </>
    );
  });
}

