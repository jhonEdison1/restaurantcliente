import React, {useContext, useRef} from 'react';
import { FirebaseContext } from '../../firebase';

const  Platillo = ({platillo}) => {

    //existencia platillo

    const existenciaRef = useRef(platillo.existencia);

    //context de firebase para cambios en la bd
    const {firebase} = useContext(FirebaseContext)



    const {id, Nombre, Imagen, Descripcion, existencia, Categoria, Precio} = platillo;



    //modificar el estado del platillo

    const actualizarDisponibilidad = () =>{

        const existencia = (existenciaRef.current.value == "true");

        try {
            firebase.db.collection('productos')
                .doc(id).update({
                    existencia
                });
        } catch (error) {
            console.log(error);
            
        }


    }

    return ( 

        <div className="w-full px-3 mb-4">
            <div className="p-5 shadow-md bg-white">

                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12">
                            <img src={Imagen} alt="Imagen Platillo"/>

                            <div className="sm:flex sm:-mx-2 pl-2">
                                <label className="block mt-5 sm:w-2/4" >
                                    <span className="block text-gray-800 mb-2">Existencia</span>

                                    <select clasName="bg-white shadow appeareance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none 
                                    focus:shadow-outline" value={existencia}
                                    ref={existenciaRef}
                                    onChange= {() => actualizarDisponibilidad () }
                                    
                                    >

                                        <option value="true">Disponible</option>
                                        <option value="false">No Disponible</option>
                                    </select>
                                </label>
                            </div>
                    </div>
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                        <p className="font-bold text-2xl text-yellow-600 mb-4">{Nombre}</p>
                        <p className="text-gray-600 mb-4 ">Categoria: {''} <span className="text-gray-700 font-bold">
                            {Categoria.toUpperCase()}
                        </span></p>

                        <p className="text-gray-600 mb-4 ">{Descripcion}</p>

                        <p className="text-gray-600 mb-4 ">Precio: {''} <span className="text-gray-700 font-bold">
                            ${Precio}
                        </span></p>
                    </div>

                </div>

               


            </div>

        </div>
     );
}
 
export default  Platillo ;
