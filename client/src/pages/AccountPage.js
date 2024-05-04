import { useContext, useEffect } from "react";
import { Context } from "../PageRouter";
import { useNavigate } from "react-router-dom";
import HTTPClient from "../utils/HTTPClient";
import Navbar from "../components/Navbar/Navbar";
import HousePic from '../images/HousePic3.jpg'

const AccountPage = () => {
    const navigate = useNavigate();
    const {user, setUser} = useContext(Context);
    
    useEffect(() => {
        if(!user.logged){
            navigate("/login")
        }
    }, [])

    const handleLogout = (event) => {
        if(window.confirm('Estas seguro que quieres cerrar sesión?')){
            const client = new HTTPClient();
            client.logout()
                .then(res => {})
                .catch(err => {
                    console.log(err)
                });
            setUser({});
            navigate("/home");
        }
    }

    return(
        <div className='h-screen bg-cover bg-no-repeat bg-center bg-fixed bg-opacity-90'  style={{ backgroundImage: `url(${HousePic})` }}>
            <div className='bg-gray-800 bg-opacity-50 h-full'>
                <Navbar />
                <div className="pt-8">
                    <div className="w rounded mx-auto flex flex-col justify-between bg-gray-800 bg-opacity-70 p-4">
                        <h1 className="text-4xl text-center mb-8 text-white">Mi cuenta</h1>
                        { user.logged && <div className="flex flex-col ">
                            <div className="text-xl mb-2 p-4 text-white">Nombre de usuario: {user.userName}</div>
                            <div className="text-xl p-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-2 rounded shadow-md mr-2" onClick={(event) => {navigate("/mis-publicaciones")}}>Mis publicaciones</button>
                                <button className="bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-2 rounded shadow-md" onClick={(event) => {handleLogout(event)}}>Cerrar sesión</button>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
export default AccountPage;