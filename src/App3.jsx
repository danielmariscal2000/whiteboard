import React, { useState } from 'react'
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage";
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
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);
export default function ModalEmpresa() {
    const [Imagen, setImagen] = useState();

    //OBTENIENDO LA IMAGEN
    const changeImagen = e => {
        setImagen(e.target.files[0]);
    }

    //FUNCION PARA GUARDAR LA IMAGEN EN FIREBASE
    const uploadImage = async () => {
        try {
            const newRef = storage.ref('images').child(Imagen.name); // nombre del archivo
            await newRef.put(Imagen);
            let urlImagen = await newRef.getDownloadURL()
            console.log('la ul de la imagen es' + urlImagen);
        } catch (error) {
            alert(error);
        }
    };
    return (
        <aside id="modal" className="modal">
            <div className="content-modal">
                <header>
                    <input type="file" name="imagen" onChange={changeImagen} />
                    <button onClick={uploadImage} >GUARDAR</button>
                </header>
            </div>
        </aside>
    )
}