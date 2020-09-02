import React from 'react';

export default class CreateShop extends React.Component {
    state = {
        item: "",
        price: "",
        qty: "",
        active: true
    };
    handleSubmit = (e) => {
        e.preventDefault();
        const api_url = process.env.REACT_APP_API_URL;
        fetch(`${api_url}/shopa`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state) 
        }) .then(response => response.json())
            .then(data => console.log(data))
            .then(() => {
                this.setState({
                    item: "",
                    price: "",
                    qty: ""
                })
            }) .then(this.props.refresh)            
    }
    handleChange = (e) => {
        this.setState({ [e.target.name] : e.target.value});
    }
    render() {
        return (
            <form className="CreateForm"
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
                    value="Add Item"/>
            </form>           
        ) 
    }
}
