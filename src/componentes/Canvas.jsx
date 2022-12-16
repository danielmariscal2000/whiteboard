import React, { useRef, useState, useEffect } from "react";
import "./canvas.css";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore,updateDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 

export default function Canvas(props) {
   let idUsuario=props.idUsuario;
  const firebaseConfig = {
    apiKey: "AIzaSyA6MIt0ytsj6mIS-qcYhRqoM7das3AV880",
    authDomain: "pizarra-1528c.firebaseapp.com",
    projectId: "pizarra-1528c",
    storageBucket: "pizarra-1528c.appspot.com",
    messagingSenderId: "362476303725",
    appId: "1:362476303725:web:5c82702d8f2bfddcbcd664",
    measurementId: "G-0KQNTCB4HM",
    storageBucket: "pizarra-1528c.appspot.com"
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  registrar();
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#3B3B3B");
  const [figura, setFigura] = useState("");
  const [texto, setTexto] = useState("");
  const handleInputChange = ({ target }) => {
    setTexto(target.value);
  };
  const [files, setFile] = useState("");
  const [posiX, setPosiX] = useState(0);
  const posicionX = ({ target }) => {
    setPosiX(target.value);
  };
  const [posiY, setPosiY] = useState(0);
  const posicionY = ({ target }) => {
    setPosiY(target.value);
  };
  const [size, setSize] = useState("3");
  const canvasRef = useRef(null);
  const ctx = useRef(null);
  const [cursor, setCursor] = useState("default");

   async function registrar(){
    await setDoc(doc(db, "usuarios", idUsuario), {
      imagen: [""],
      nombre: ["MiPizarra"],
    });
   }

  // ***********************************************
  useEffect(() => {
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    const canvasimg = localStorage.getItem("canvasimg");
    if (canvasimg) {
      var image = new Image();
      ctx.current = canvas.getContext("2d");
      image.onload = function () {
        ctx.current.drawImage(image, 0, 0);
        setIsDrawing(false);
      };
      image.src = canvasimg;
    }
  }, [ctx]);
  // ************************************************
  const dibujar = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const canvas = canvasRef.current;
    ctx.current = canvas.getContext("2d");
    ctx.current.lineWidth = size;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = color;

    ctx.current.lineTo(nativeEvent.clientX, nativeEvent.clientY);
    ctx.current.stroke();
    ctx.current.beginPath();
    ctx.current.moveTo(nativeEvent.clientX, nativeEvent.clientY);
    cargarContenido();
  };
  const limpiarPartesPizarra = () => {
    setSize("35");
    setColor("#fff");
  };
  
  // *********************************************************************
  const limpiarPizarra = () => {
    localStorage.removeItem("canvasimg");
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    cargarContenido();
  };
  // *************************************************************************
  const insertarTexto = () => {
    ctx.current.lineWidth = size;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = color;
    ctx.current.font = "bold 20px arial";
    ctx.current.strokeText(texto, posiX, posiY);
    cargarContenido();
  };
  async function cargarContenido(){
    var can=document.getElementById("miCanvas");
    var imagen_Guardar=can.toDataURL();
    // console.log(imagen_Guardar);
    const usuarios = collection(db, "usuarios");
    const use = await getDocs(usuarios);
    const datos = use.docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().nombre,
      imagen: doc.data().imagen,
    }));
    let resImagen=[];
    let resNombre=[];

    for(let i=0;i<datos.length;i++){
        if(datos[i].id===idUsuario){
         for(let j=0;j<datos[i].imagen.length;j++){
               if(datos[i].nombre[j]==="MiPizarra"){
                  resImagen.push(imagen_Guardar);
                  resNombre.push("MiPizarra");
               }
               else{
                resImagen.push(datos[i].imagen[j]);
                resNombre.push(datos[i].nombre[j]);
               }
         }
        }
    }
    const washingtonRef = doc(db, "usuarios", `${idUsuario}`);
     console.log(resImagen);
     console.log(resNombre);
    await updateDoc(washingtonRef, {
        imagen: resImagen,
        nombre:resNombre

      });
    // document.body.removeChild(link);
  };
  //**************************************************************************
  const getPincel = () => {
    setCursor("default");
    setSize("3");
    setColor("#000");
  };
  // *************************************************************************
  const refrescarPizarra = () => {
    setCursor("grab");
    setSize("20");
    setColor("#FFFFFF");
    if (!isDrawing) {
      return;
    }
  };
  // *************************************************************************
  const poscisionInicial = ({ nativeEvent }) => {
    setIsDrawing(true);
    dibujar(nativeEvent);
  };
  // *************************************************************************
  const poscisionFinal = () => {
    setIsDrawing(false);
    ctx.current.beginPath();
  };
  // *************************************************************************
  const insertarImagen = () => {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      // convierte la imagen a una cadena en base64
            let img=new Image();
            img.src=reader.result;
            img.onload=function (){
              ctx.current.beginPath();
              ctx.current.drawImage(img,posiX,posiY);
              console.log(img);
            }
    }, false);
  
    if (files[0]) {
      reader.readAsDataURL(files[0]);
    }
    cargarContenido();
  };
  // *************************************************************************
  const insertarFigura = () => {
    ctx.current.lineWidth = size;
    ctx.current.lineCap = "round";
    ctx.current.strokeStyle = color;
    if (figura === "Recta") {
      ctx.current.moveTo(100, 300);
      ctx.current.lineTo(400, 300);
      ctx.current.stroke();
    } else if (figura === "Cuadrado") {
      ctx.current.fillRect(100, 300, 50, 50);
    } else if (figura === "Rombo") {
      ctx.current.moveTo(255,205);
      ctx.current.lineTo(305, 255);
      ctx.current.lineTo(255, 305);
      ctx.current.lineTo(205, 255);
      ctx.current.stroke();
      ctx.current.fill();
    }else if(figura==="Pentagono"){
        ctx.current.moveTo(300, 205);
        ctx.current.lineTo(345, 238);
        ctx.current.lineTo(330, 280);
        ctx.current.lineTo(270, 280);
        ctx.current.lineTo(255, 238);
        ctx.current.stroke();
        ctx.current.fill();
    }
    else if(figura==="Hexagono"){
        ctx.current.moveTo(235,205);
        ctx.current.lineTo(295,205);
        ctx.current.lineTo(325,255);
        ctx.current.lineTo(295, 305);
        ctx.current.lineTo(235, 305);
        ctx.current.lineTo(205, 255);
        ctx.current.stroke();
        ctx.current.fill();
    } else if(figura==="Triangulo"){
        ctx.current.moveTo(255, 255);
        ctx.current.lineTo(255, 350);
        ctx.current.lineTo(400, 350);
        ctx.current.stroke();
        ctx.current.fill();
    }
    else if(figura==="Curva"){
        let puntoX1 = 200,
            puntoY1 = 300;
        let puntoX2 = 320,
            puntoY2 = 215;
        let x = 300, y = 300;
        ctx.current.bezierCurveTo(puntoX1, puntoY1, puntoX2, puntoY2, x, y);
        ctx.current.stroke();
    }
    else if(figura==="Circulo"){
        var X = 300;
        var Y = 300;
        var r = 75;
        ctx.current.arc(X,Y,r,0,2*Math.PI);
        ctx.current.fill();
        ctx.current.stroke();
    }
    cargarContenido();

  };
  //*************************************************************************
  const guardar_imagen =()=>{
    var can=document.getElementById("miCanvas");
    var imagen_Guardar=can.toDataURL("image/jpeg").replace("image/jpeg","image/octet-stream");
    window.location.href=imagen_Guardar;
  };
  // *************************************************************************
  const guardar_imagen_Png=()=>{
    var can=document.getElementById("miCanvas");
    var imagen_Guardar=can.toDataURL();
    var link=document.createElement("a");
    link.href=imagen_Guardar;
    link.download="MiCanvas";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  // ******************<<<<<<<<COMPONENTES>>>>>>>>>***************************************
  function ComponenteDibujar (){
         return( <div>
         <button onClick={getPincel} className="btn-global">Dibujar</button>
         </div>
       );
  };
  // *************************************************************************************
  function ComponenteLimpiar(){
      return(
        <div>
        <button onClick={limpiarPartesPizarra} className="btn-global">Borrar</button>
        <button onClick={limpiarPizarra} className="btn-global">Limpiar</button>
        </div>
      );
  };
  // **************************************************************************************
  function ComponenteRefrescar(){
    return(
      <div>
      <button onClick={refrescarPizarra} className="btn-global">Refrescar</button>
    </div>
    );
  };
  // **************************************************************************************
  function ComponentePosiciones(){
    return(
    <div>
      <input className="input-number" type="number" value={posiX} onChange={posicionX} placeholder="Pos X"></input>
      <input className="input-number" type="number" value={posiY} onChange={posicionY} placeholder="Pos Y"></input>
       <br />
    </div>
    );
  };
  // ***************************************************************************************
  function ComponenteFigura_GuardarImagen(){
   return(
    <div>
        <br />
         <button onClick={insertarFigura} className="btn-global">Insertar Figura</button>
        <br />
          <button onClick={guardar_imagen} className="btn-global">Guardar Imagen</button>
          <button onClick={guardar_imagen_Png} className="btn-global">Guardar Imagen PNG</button>
    </div>
   );
  };
  // ****************************************************************************************
  function ComponenteColor(){
    return(
      <div className="btn-color">
      <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
    </div>
    );
  };

  // ***********************<<<<<<<<<<<<<<<RETURN CANVAS.JSX>>>>>>>>>>>>>>>>>>>>*************
  return (
    <>
      <div className="canvas-btn"> 
         <ComponenteDibujar></ComponenteDibujar>
          <ComponenteColor></ComponenteColor>
        <div className="option">
          <select className="btn-tamanio" value={size} onChange={(e) => setSize(e.target.value)}>
            <option> 1 </option>
            <option> 3 </option>
            <option> 5 </option>
            <option> 10 </option>
            <option> 15 </option>
            <option> 20 </option>
            <option> 25 </option>
            <option> 30 </option>
          </select>
        </div>
        <ComponenteLimpiar></ComponenteLimpiar>
        <ComponenteRefrescar></ComponenteRefrescar>
        <div>
        <ComponentePosiciones></ComponentePosiciones>
          <input className="input-text" type="text" value={texto} onChange={handleInputChange} placeholder="Ingrese Texto"></input>
          <br />
          <button onClick={insertarTexto} className="btn-global">Texto</button>
        </div>
        
        <div>
          <input  multiple type="file" onChange={(e) => {setFile(e.target.files); }} files={files} />
          <br />
          <br />
           <button onClick={insertarImagen} className="btn-global">Insertar Imagen</button>
        </div>

        <div>
          <select className="btn-tamanio figura" value={figura} onChange={(e) => setFigura(e.target.value)}>
            <option>Figura</option>
            <option> Recta </option>
            <option> Cuadrado </option>
            <option> Rombo </option>
            <option> Triangulo </option>
            <option> Curva </option>
            <option> Circulo</option>
            <option> Pentagono </option>
            <option> Hexagono </option>
          </select>
         <ComponenteFigura_GuardarImagen></ComponenteFigura_GuardarImagen>
        </div>
      </div>
      <canvas
        style={{ cursor: cursor }}
        onMouseDown={poscisionInicial}
        onMouseUp={poscisionFinal}
        onMouseMove={dibujar}
        ref={canvasRef}
        id="miCanvas"  />
    </>
  );
}
