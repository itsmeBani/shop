// src/api.js
import axios from 'axios';
import {useEffect} from "react";
const API_BASE_URL = 'https://phoneshop.dyipspot.com/'; // Replace with your actual API base URL

export const createUser = (username, password, firstname, lastname, address) => {
    return axios.post(`${API_BASE_URL}/Register.php`, {
        username,
        password,
        firstname,
        lastname,
        address
    });
};
export const UpdateUser = (user_id,username,  firstname, lastname, address,created_at) => {
    return axios.put(`${API_BASE_URL}/ManageCustomer.php`, {
        user_id,
        username,

        firstname,
        lastname,
        address,
        created_at
    });
};
export const userLogin = (username, password) => {
    return axios.post(`${API_BASE_URL}/Login.php`, {
        username,
        password,
        role: 'user',
    });
};

export  const getCurrentUser = ()=>{
    return axios.get(`${API_BASE_URL}/FetchCurrentUser.php`)
}



export  const getALLProduct = ()=>{
    return axios.get(`${API_BASE_URL}/ProductCrud.php`)
}


export  const getALLCustomer = ()=>{
    return axios.get(`${API_BASE_URL}/ManageCustomer.php`)
}


export const DeleteProduct = (id) => {
    return axios.delete(`${API_BASE_URL}/ProductCrud.php`, {
        data: { id } // Pass the id as data in the request body
    });
}

export const AddtoCart= (user_id,product_id) => {
    return axios.post(`${API_BASE_URL}/ManageCart.php`, {
        user_id,
        product_id
    });
}


export const ViewCart = (user_id) => {
    return axios.get(`${API_BASE_URL}/ViewCart.php?user_id=${user_id}`);
};
export const DeleteCart = (id) => {
    return axios.delete(`${API_BASE_URL}/ManageCart.php`, {
        data: { id } // Pass the id as data in the request body
    });
}
export const updateCartItemQuantity = (cartId, quantity) => {
    return axios.put(`${API_BASE_URL}/ManageCart.php`, {
        cart_id: cartId,
        quantity: quantity
    });
};

export const AddProduct = (imageUrl, name, description, label, price) => {
    return axios.post(`${API_BASE_URL}/ProductCrud.php`, {
        imageUrl, name, description, label, price

    });
};
export const EditProduct = (product_id,imageUrl, name, description, label, price) => {
    return axios.put(`${API_BASE_URL}/ProductCrud.php`, {
        product_id, imageUrl, name, description, label, price

    });
};