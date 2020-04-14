import React, { useState } from 'react';
import api from '../../services/api'

export default function Login({ history }) {
    const [email, setEmail] = useState('velishma@hotmail.com')

    async function handleSubmit(e) {
        e.preventDefault()

        const res = await api.post('/sessions', { email })
        const { _id } = res.data

        localStorage.setItem('user', _id)
        if (_id) {
            history.push('/dashboard')
        }
    }

    return (
        <>
            <p>Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong></p>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">E-MAIL *</label>
                <input type="email" name="email" id="email" placeholder="Seu melhor e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)} />

                <button className="btn" type="submit">Entrar</button>
            </form>
        </>
    )
}