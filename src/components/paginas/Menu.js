import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import {FirebaseContext}  from '../../firebase'
import Platillo from '../ui/Platillo';

const Menu = () => {

    const [platillos, guardarPlatillos ] = useState([]);

    const {firebase} = useContext(FirebaseContext);
    //consultar la base de datos
    useEffect (() =>{
        const obtenerPlatillos =  () =>{
            firebase.db.collection('productos').onSnapshot(manejarSnapshot);
        }
        obtenerPlatillos();     
    }, []);

    //Snapshot Tiempo real firestore
    function manejarSnapshot(snapshot){
            const platillos = snapshot.docs.map(doc => {
                return{
                    id: doc.id,
                    ...doc.data()
                }
            });
            //almacenar resultados en el state
           guardarPlatillos(platillos);
    }



    return ( 
        <>
            <h1 className="text-3xl font-light mb-4"> Menu</h1>
            <Link to="/NuevoPlatillo" className=" bg-blue-800 hover:bg-blue-700, inline-bock mb-5 p-2 text-white uppercase font-bold ">
                Agregar Platillo
            </Link>

            {platillos.map(platillo => (
                <Platillo 
                    key={platillo.id}
                    platillo = {platillo}                
                />

            ))}
        </>

     );
}
 
export default Menu ;