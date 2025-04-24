import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductThunk, postProductThunk, deleteProductThunk, updateProductThunk } from "../../redux/reducer/productSlice"
import { TiDeleteOutline } from "react-icons/ti";
import { GoPencil } from "react-icons/go";
import styles from "./Home.module.css"

const Home = () => {
    const [newProduct, setNewProduct] = useState({
        name: '',
        description: '',
        id: '',
    })

    const dispatch = useDispatch()
    const db = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loading)
    const error = useSelector(state => state.products.error)


    useEffect(() => {
        dispatch(getProductThunk())
    }, [])

    if (loading) return <span>YÜKLƏNİR...</span>
    if (error) return <span>YÜKLƏMƏ ZAMANI XƏTA BAŞ VERDİ</span>



    const handlePost = () => {
        if (!newProduct.name.trim() || !newProduct.description.trim()) {
            alert("Zəhmət olmasa bütün sahələri doldurun!")
            return
        }

        dispatch(postProductThunk(newProduct))
        setNewProduct({ name: '', description: '' })
    }




    const removeItem = (id) => {
        dispatch(deleteProductThunk(id))
    }


    const updateItem = (item) => {
        const newName = prompt("New Name:", item.name)
        const newDesc = prompt("New Description:", item.description)

        if (newName && newDesc) {
            const updatedData = { name: newName, description: newDesc }
            dispatch(updateProductThunk({ id: item.id, updatedData }))
        } else {
            alert("Heç bir sahə boş olmamalıdır!")
        }
    }


    return (

        <>


            <div className={styles.inputBox}>
                <form onSubmit={(e) => {
                    e.preventDefault()
                    handlePost()
                }}>
                    <input
                        type="text"
                        placeholder="name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="description"
                        value={newProduct.description}
                        onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    />
                    <button type="submit">GÖNDƏR</button>
                </form>
            </div>

            <div className={styles.container}>
                {db && db.map(item => {
                    return (
                        <div className={styles.card} key={item.id}>
                            <div className={styles.body}>
                                <TiDeleteOutline onClick={() => removeItem(item.id)} className={styles.bodyicon} />
                                <GoPencil onClick={() => updateItem(item)} className={styles.pen} />
                                <span className={styles.title}>{item.name}</span>
                                <span className={styles.price}>{item.description}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home
