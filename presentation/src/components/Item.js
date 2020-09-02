import React, { useState } from 'react';
import UpdateShop from './UpdateItem';

const Shop = ({shop, deleteShop, refresh}) => {
    const [update, setUpdate] = useState(false);
    const toggleForm = () => setUpdate(!update);
    return(
        <div
        className="card">
            <i onClick= {()=> toggleForm()} className="fa fa-edit EdtBtn"></i>
                 {update ? 
            <UpdateShop shop={shop}
                toggleForm={toggleForm}
                refresh={refresh} /> : ''}
            
            {shop.item},
             ${shop.price}

            <button
                onClick={() => deleteShop(shop._id, refresh)} >X
            </button>

        
        </div>
    )
}

export default Shop

            