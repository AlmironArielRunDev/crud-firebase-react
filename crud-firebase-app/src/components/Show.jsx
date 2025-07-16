import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'
import { doc } from 'firebase/firestore'


// Importar sweet Alert 2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Show = () => {
    const [products, setProducts] = useState ([])
    
    // Referencia a la base de datos de firestore
    const productsCollection = collection(db, "products")
    
    // Mostrar todos los datos
    const getProducts = async () => {
        const data = await getDocs(productsCollection)
        setProducts(
        data.docs.map((doc) => ({...doc.data(), id:doc.id}))
        )
    }


    // Funcion para eliminar un doc
    const deleteProduct = async (id) => {
        const productDoc = doc(db, "products", id)
        await deleteDoc(productDoc)
        getProducts()
    }

    // Eliminar doc con sweet alert
    const confirmDelete = (id) => {
       Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            }).then((result) => {
            if (result.isConfirmed) {
                deleteProduct(id)
                Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success"
                });
            }
        });
    }


    useEffect(() => {
        getProducts()
    }, [])

    useEffect(() => {
    console.log(products)
    }, [products])
    

    // vista del componente
    return(
        <>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <div className="d-grid gap-2">
                            <Link to="/create" className='btn btn-secondary mt-2 mb-2'>Create</Link>
                        </div>

                        <table className='table table-dark table-hover'>
                            <thead>
                                <tr>
                                    <th>Description</th>
                                    <th>Stock</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                            { products.map( (product) => (
                                <tr key={product.id}>
                                    <td>{product.description}</td>
                                    <td>{product.stock}</td>
                                    <td>
                                        <Link to={`/edit/${product.id}`} className='btn btn-light'><i className="fa-solid fa-pencil"></i></Link>
                                        <button onClick={ () => { confirmDelete(product.id)}} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                    </td>
                                </tr>

                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Show 