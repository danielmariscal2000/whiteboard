import CanvasCargar from './componentes/CanvasCargar';
import CanvasNuevo from './componentes/CanvasNuevo';
import { initializeApp } from "firebase/app"; 
import { collection, getDocs,getFirestore } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
function PizarraN(props) {
  let nombrePizarra=props.nombre;
  let idUsuario=props.idUsuario;
  const firebaseConfig = {
    apiKey: "AIzaSyA6MIt0ytsj6mIS-qcYhRqoM7das3AV880",
    authDomain: "pizarra-1528c.firebaseapp.com",
    projectId: "pizarra-1528c",
    storageBucket: "pizarra-1528c.appspot.com",
    messagingSenderId: "362476303725",
    appId: "1:362476303725:web:5c82702d8f2bfddcbcd664",
    measurementId: "G-0KQNTCB4HM",
  };
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  registrar();
  async function registrar(){
    const usuarios = collection(db, "usuarios");
    const use = await getDocs(usuarios);
    const datos = use.docs.map((doc) => ({
      id: doc.id,
      nombre: doc.data().nombre,
      imagen: doc.data().imagen,
    }));
    let resImagen=[];
    let resNombres=[];
    let m=0;
    for(let i=0;i<datos.length;i++){
       if(datos[i].id===idUsuario){
                 datos[i].nombre.push(`${nombrePizarra}`);
                 datos[i].imagen.push(" ");
                 m=i;
       }
    }
    resImagen=datos[m].imagen;
    resNombres=datos[m].nombre;

    await setDoc(doc(db, "usuarios", idUsuario), {nombre:resNombres, imagen:resImagen});
  }
  return (
  <CanvasNuevo nombre={nombrePizarra} idUsuario={idUsuario}/>
  );
}

export default PizarraN;