import { useEffect, useState } from "react"
import Navbar from "../components/Navbar/Navbar"
import HTTPClient from "../utils/HTTPClient"
import { useParams } from "react-router-dom"
import MapDetailLocation from "../components/MapDetailLocation/MapDetailLocation"

const Detail = () => {
    const [data, setData] = useState({})
    const [loaded, setLoaded] = useState(false)
    const { id } = useParams();
    useEffect(() => {
        let client = new HTTPClient();

        client.getEstate(id)
            .then(res => {
                setData(res.data)
                setLoaded(true)
            })
            .catch(err => console.log(err))
    },[])
    return (
        <div>
            <div className="mb-8">
                <Navbar />
            </div>
            {!loaded? <h1 className="text-center text-3xl pt-8">Cargando...</h1>
            :   <div>
                    <div className="flex justify-center">
                        <div className="border p-8 shadow-md mr-4">
                            <h1 className="text-3xl mb-4">{data.title}</h1>
                            <img src={data.image} alt={data.title} className="h-96 rounded-md"/>
                        </div>
                        <div className="border flex flex-col justify-between p-8 shadow-md">
                            <div>
                                <MapDetailLocation coordinates={data.coordinates}/>
                            </div>
                            <div className="flex">
                                <div className="flex-1">
                                    <p>{data.description}</p>
                                    <p>Habitaciones: {data.rooms}</p>
                                    <p>Dormitorios: {data.bedrooms}</p>
                                    <p>Baños: {data.bathrooms}</p>
                                    <p>Propietario: {data.owner}</p>
                                </div>
                                <div className="flex-1">
                                    <p>Address: {data.address}</p>
                                </div>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-green-700 text-2xl">{data.price}$</p>
                                <button className="border bg-blue-500 hover:bg-blue-600 px-2 py-2 rounded-md">Contactar</button>
                            </div>
                        </div>
                    </div> 
                </div>
            }
        </div>
    )
}
export default Detail