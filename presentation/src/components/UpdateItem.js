import React from 'react';

export default class UpdateShop extends React.Component {
    state = {
        item: this.props.shop.item,
        price: this.props.shop.price,
        qty: this.props.shop.qty
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const api_url = process.env.REACT_APP_API_URL;
        fetch(`${api_url}/shopa/${this.props.shop._id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state) 
        }) .then(response => response.json())
            .then(data => console.log(data))
            .then(this.props.toggleForm)
            .then(this.props.refresh)            
    }
    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }
    render() {
        return (
            <form className="UpdateForm"
            onSubmit={this.handleSubmit}>
                <input name="item"
                    type="text"
                    placeholder="Item Name"
                    value={this.state.item}
                    onChange={this.handleChange} 
                    required/>
                <input name="price"
                    type="text"
                    placeholder="Price"
                    value={this.state.price}
                    onChange={this.handleChange} />
                <input name="qty"
                    type="number"
                    placeholder="QTY"
                    value={this.state.qty}
                    onChange={this.handleChange} />

                <input type="submit"
                    value="Update"/>
            </form>           
        ) 
    }
}
