import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductThunk, postProductThunk } from "../../redux/reducer/productSlice"
import styles from "./Home.module.css"

const Home = () => {
    const [newProduct, setNewProduct] = useState({
        title: '',
        price: '',
    })
    
    const dispatch = useDispatch()
    const db = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loading)
    const error = useSelector(state => state.products.error)
    console.log(db);

    useEffect(() => {
        dispatch(getProductThunk())
    }, [])

    if (loading) return <span>YÜKLƏNİR...</span>
    if (error) return <span>YÜKLƏMƏ ZAMANI XƏTA BAŞ VERDİ</span>




    const handlePost = () => {
        dispatch(postProductThunk(newProduct))
        setNewProduct({ title: '', price: '' })
    }

    return (

        <>


            <div className={styles.inputBox}>
                <input type="text"
                    placeholder='Title'
                    value={newProduct.title}
                    onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })}
                />
                <input type="text"
                    placeholder='Price'
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
                <button onClick={handlePost}>GONDER</button>
            </div>

            <div className={styles.container}>
                {db && db.map(item => {
                    return (
                        <div className={styles.card} key={item.id}>
                            <div className={styles.image}>
                                <img src={item.image} alt="" />
                            </div>
                            <div className={styles.body}>
                                <span className={styles.title}>{item.title}</span>
                                <span className={styles.price}>{item.price}</span>
                            </div>
                        </div>
                    )
                })}
            </div>
        </>
    )
}

export default Home
