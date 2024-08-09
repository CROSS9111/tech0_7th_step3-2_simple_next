"use client"
import React from 'react'

async function getProductCode() {
    const product_code = 45678;
    // console.log(product_code)
    const response = await fetch("http://127.0.0.1:5000/store", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product_code), 
    });
    const result = response.json();
    return result;
}


export default function Home() {
    const res = getProductCode();
    console.log(res)
}
