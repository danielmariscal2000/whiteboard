import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

// import App4 from "./App4";
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
      <h1>Bienvenido a nuestra herramienta con Canvas</h1>
      <label>Usuario</label>
      <i>En caso de no estar registrado ingrese un nombre de usuario</i>
      <br></br>
      <input type="text" id="domTextElement"></input>
      <button type="button" onClick={getValueInput}>
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
  await setDoc(doc(db, "usuarios", valor), {nombre:"Daniel",pizarraCompartida:false, grupo:["Daniel","Julia"]});

  const usuarios = collection(db, "usuarios");
  const use = await getDocs(usuarios);
  //   const cityList = use.docs.map(doc => doc.data());
  const datos = use.docs.map((doc) => ({
    id: doc.id,
    name: doc.data().nombre,
    compartida: doc.data().pizarraCompartida,
  }));
  for (let i = 0; i < datos.length; i++) {
    if (datos[i].name === valor) {
      if (datos[i].compartida === true) {
        root.render(<App></App>);
      }
    } else if (i + 1 === datos.length) {
      let pasar=datos[0].id;
      root.render(<App2 data={pasar}></App2>);
    }
  }
}
reportWebVitals();
