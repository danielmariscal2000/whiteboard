import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import App2 from "./App2";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Registro></Registro>);

const firebaseConfig = {
  apiKey: "AIzaSyA6MIt0ytsj6mIS-qcYhRqoM7das3AV880",
  authDomain: "pizarra-1528c.firebaseapp.com",
  projectId: "pizarra-1528c",
  storageBucket: "pizarra-1528c.appspot.com",
  messagingSenderId: "362476303725",
  appId: "1:362476303725:web:5c82702d8f2bfddcbcd664",
  measurementId: "G-0KQNTCB4HM",
};

// Initialize Firebase
const iniApp = initializeApp(firebaseConfig);
const db = getFirestore(iniApp);

function Registro() {
  return (
    <>
      <h1 className="title2">Bienvenido a nuestra herramienta con Canvas</h1>
      <label className="usuario">Usuario</label>
      <br></br>
      <i>En caso de no estar registrado ingrese su nombre</i>
      <br></br>
      <input className="inputT" type="text" id="domTextElement"></input>
      <button className="btn-global2" type="button" onClick={getValueInput}>
        Ingresar
      </button>
    </>
  );
}
const getValueInput = () => {
  let inputValue = document.getElementById("domTextElement").value;
  getContactos(db, inputValue);
};

async function getContactos(db, valor) {
  const usuarios = collection(db, "usuarios");
  const use = await getDocs(usuarios);
  const datos = use.docs.map((doc) => ({
    id: doc.id,
  }));
 let boo=true;
  for (let i = 0; i < datos.length; i++) {
    if (datos[i].id === valor) {
      boo=false;
      root.render(<App2 data={datos[i].id}></App2>);
    }
  }
  if(boo===true){
      root.render(<App data={valor}></App>);
  }
}
reportWebVitals();
