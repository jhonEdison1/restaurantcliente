import React from 'react'
import {NavLink} from 'react-router-dom'

const Sidebar = () => {
    return (  

        <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
            <div className="p-6">

                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">Restaurante App</p>

                <p className="mt-3  text-gray-600"> Administra el Restaurante </p>

                <nav className="mt-10">
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900" activeClassName="text-yellow-500"  end to="/">Ordenes</NavLink>
                    <NavLink className="p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"  activeClassName="text-yellow-500" end to="/Menu">Menu</NavLink>

                </nav>

            </div>

        </div>
    );
}
 
export  default Sidebar ;