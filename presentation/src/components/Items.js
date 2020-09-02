import React from 'react';
import Shop from './Item';
import CreateShop from './CreateItem';

class Shops extends React.Component {
    state = {
        shops: [ ]
    }    
    getShop = () => {
        const api_url = process.env.REACT_APP_API_URL;
        fetch(`${api_url}/shopa`)
            .then(response => response.json())
            .then(data => this.setState({shops:data}))
    }
    componentDidMount() {
        this.getShop();
    }

    deleteShop = (id, refresh) => {
        const api_url = process.env.REACT_APP_API_URL;
        fetch(`${api_url}/shopa/${id}`,{
            method: "DELETE"
        }) .then(response => response.json())
            .then(data => {
                console.log(data);
                refresh();
            })
    }

    render(){
        const displayShop= this.state.shops.map(shop =>
        <Shop 
            key={shop._id} 
            shop={shop} 
            deleteShop={this.deleteShop}
            refresh={this.getShop} />
            
        )
        return (
            <>
                <h2>The Reference Shop </h2>
                <div className="card-grid"> 
                    {displayShop}
                </div>
                <h4>New Item</h4>
                <CreateShop refresh={this.getShop}/>
            </>
        )
    }
}
export default Shops;