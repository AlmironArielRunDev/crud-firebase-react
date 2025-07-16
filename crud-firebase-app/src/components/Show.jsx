import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {collection, getDocs, getDoc, deleteDoc} from 'firebase/firestore'
import { db } from '../firebaseConfig/firebase'

// Importar sweet Alert 2
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

const Show = () => {
    const [products, setProducts] = useState ([])
    
    const productsCollection = collection(db, "products")
    
    const getProducts = async ()  => {
        const data = await getDocs(productsCollection)
        console.log(data.docs)
    }

    useEffect(()=>{
        getProducts()
    }, [])
    
}

export default Show 