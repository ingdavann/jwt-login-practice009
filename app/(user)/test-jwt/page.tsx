'use client'
import React, { useState } from 'react'

export default function TestJWT() {
    const [accessToken, setAccessToken] = useState("");
    const [user, setUser] = useState(null);

    // handle login
    const handleLogin = async () => { 
        const email = "sangsokea109@gmail.com";
        const password = "admin@1234";

        fetch(process.env.NEXT_PUBLIC_API_URL + "/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        }).then(response => response.json()).then(data => {
            console.log("Data in JWT test: ", data);
            if (data.accessToken) {
                setAccessToken(data.accessToken);
                setUser(data.user);
            }
        }).catch(error => {
            console.log(error);
        });

    }
    

    // handle patial update
    const handlePartialUpdate = async () => { 
        const body = {
            name: "Update product by ID",
        }
        
        fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/api/products/${499}/`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify(body),
        }).then(response => response.json()).then((data) => {
            console.log("Data from patial update: ", data);
        }).catch((error) => {
            console.log(error);
        });
    }

      

    return (
        <main className='h-screen grid place-content-center'>
            <h1 className='text-4xl'>Test Handle Login</h1> 
            <button onClick={handleLogin} className='p-3 bg-blue-600 rounded-xl my-2 text-slate-50'>Login</button>
            <button onClick={handlePartialUpdate} className='p-3 bg-green-600 rounded-xl my-2 text-slate-50'>Patial Update</button>
        </main>
    )
}
