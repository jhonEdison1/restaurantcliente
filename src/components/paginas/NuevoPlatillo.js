import React, {useContext, useState} from 'react';
import {useFormik} from 'formik';
import * as Yup from 'yup'
import {FirebaseContext} from '../../firebase';
import {useNavigate} from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';

const NuevoPlatillo = () => {

    //context con las operaciones de firebase

    const {firebase} = useContext(FirebaseContext);

    //console.log(firebase);

    //hook para redireccionar
    const navigate = useNavigate();

    

    //Validacion datos Formulario

    const formik = useFormik({
        initialValues: {
            Nombre: '',
            Precio: '',
            Categoria: '',
            Imagen: '',
            Descripcion: '',

        }, 
        validationSchema: Yup.object({
            Nombre: Yup.string()
                        .min(3, 'El nombre debe tener al menos 3 caracteres')
                        .required('El nombre es obligatorio'),
            Precio: Yup.number()
                        .min(1, 'Se debe agregar un numero')
                        .required('El precio es obligatorio'),
            Categoria: Yup.string()
                          .required('La categoria es obligatoria'),
            Descripcion: Yup.string()
                          .min(5, 'La Descripcion debe tener al menos 5 caracteres')
                          .required(' La Descripcion es obligatoria'),

        }),
        onSubmit: platillo => {
            try {
                platillo.existencia = true;
                platillo.Imagen = urlimagen;
                firebase.db.collection('productos').add(platillo)


                ///redireccionar
                navigate('/menu');
            } catch (error) {
                console.log(error);
                
            }
        }

    });


    //state para las imagenes


    const  [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlimagen, guardarUrlimagen] = useState('');


    ///imagenes
    const handleUploadStart = () =>{
        guardarProgreso(0);
        guardarSubiendo(true);
        //console.log(guardarSubiendo);


    }

    const handleUploadError = error =>{
        guardarSubiendo(false);
        console.log(error);

    }
    const  handleUploadSuccess = async Nombre => {

        try {
            guardarProgreso(100);
            guardarSubiendo(false);
            //almacenar la url
    
        const url = await firebase
                    .storage
                    .ref("productos")
                    .child(Nombre)
                    .getDownloadURL();
    
                    console.log(url);
                    guardarUrlimagen(url);
            
        } catch (error) {
            console.log(error);
            
        }
       

    }

    const handleProgress = progreso => {
        guardarProgreso(progreso);
        console.log(progreso);

    }



    return  ( 
        <>
            <h1 className="text-3xl font-light mb-4"> Agregar Platillo</h1>

            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form 
                    onSubmit= {formik.handleSubmit} 
                    >
                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Nombre" >Nombre</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " 
                            id="Nombre"
                            type="text"
                            placeholder="Nombre Platillo"
                            value={formik.values.Nombre}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.Nombre && formik.errors.Nombre ?   (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5  " role="alert">
                                <p className="font-bold">Hubo un Error: </p>
                                <p>{formik.errors.Nombre}</p>
                            </div>

                        ): null}




                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Precio" >Precio</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline " 
                            id="Precio"
                            type="number"
                            placeholder="Precio "
                            min="0"
                            value={formik.values.Precio}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.Precio && formik.errors.Precio ?   (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5  " role="alert">
                                <p className="font-bold">Hubo un Error: </p>
                                <p>{formik.errors.Precio}</p>
                            </div>

                        ): null}

                       

                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Categoria" >Categoria</label>
                            <select  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
                             id="Categoria"
                             name="Categoria"
                             value={formik.values.Categoria}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            >

                                 <option value="">--Seleccione --</option>
                                 <option value="desayuno">Desayuno</option>
                                 <option value="almuerzo">Almuerzo</option>
                                 <option value="cena">Cena</option>
                                 <option value="bebida">Bebida</option>
                                 <option value="postre">Postre</option>
                                 <option value="postre">Ensalda</option>



                            </select>
                        </div>
                        {formik.touched.Categoria && formik.errors.Categoria ?   (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5  " role="alert">
                                <p className="font-bold">Hubo un Error: </p>
                                <p>{formik.errors.Categoria}</p>
                            </div>

                        ): null}


                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Imagen" >Imagen</label>
                           <FileUploader
                                accept="image/*"
                                id="Imagen"
                                name="Imagen"
                                randomizeFilename
                                storageRef = {firebase.storage.ref("productos")}
                                onUploadStart = {handleUploadStart}
                                onUploadError = {handleUploadError}
                                onUploadSuccess = {handleUploadSuccess}
                                onProgress = {handleProgress}                      
                           />
                        </div>

                        {subiendo && (
                            <div className="h.12 relative w-full border">
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center " style= {{ width: `${progreso}%`}} >
                                    {progreso} %
                                </div>

                            </div>


                        )}

                        { urlimagen && (
                            <p className="bg-green-500 text-white p-3 text-center my-5">
                                La imagen se subio Correctamente
                            </p>

                        )}





                        <div className="mb-4">

                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Descripcion" >Descripcion</label>
                            <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40" 
                            id="Descripcion"        
                            placeholder="Descripcion "
                            value={formik.values.Descripcion}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            ></textarea>
                        </div>
                        {formik.touched.Descripcion && formik.errors.Descripcion ?   (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5  " role="alert">
                                <p className="font-bold">Hubo un Error: </p>
                                <p>{formik.errors.Descripcion}</p>
                            </div>

                        ): null}

                       <input 
                       type="submit"
                       className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                       value="Agregar Platillo"
                       />
                    </form>
                       
                </div>
            
            </div>


        </>


     );
}
 
export default NuevoPlatillo ;