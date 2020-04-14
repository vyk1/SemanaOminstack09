// usememo -> observa valor da var e gera novo
// gerar preview 
import React, { useState, useMemo } from 'react'
import api from '../../services/api'

import './styles.css'

import camera from '../../assets/camera.svg'

export default function New({ history }) {
    const [thumbnail, setThumbnail] = useState(null)
    const [company, setCompany] = useState('')
    const [techs, setTechs] = useState('')
    const [price, setPrice] = useState('')

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null
    }, [thumbnail])

    async function handleSubmit(e) {
        e.preventDefault()
        const data = new FormData()
        const user_id = localStorage.getItem('user')

        data.append('thumbnail', thumbnail)
        data.append('company', company)
        data.append('techs', techs)
        data.append('price', price)

        // const res = 
        await api.post('/spots', data, {
            headers: { user_id }
        })

        history.push('/dashboard')
    }
    return (
        <>
            <form onSubmit={handleSubmit}>
                <label
                    id="thumbnail"
                    className={thumbnail ? 'has-thumbnail' : ''}
                    style={{ backgroundImage: `url(${preview})` }}
                >
                    <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
                    <img src={camera} alt="Selecione a imagem" />
                </label>
                <label htmlFor="company">EMPRESA *</label>
                <input type="text" name="company" id="company" placeholder="Sua Companhia"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                />
                <label htmlFor="techs">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
                <input type="text" name="techs" id="techs" placeholder="Quais Tecnologias Usam"
                    value={techs}
                    onChange={e => setTechs(e.target.value)}
                />
                <label htmlFor="price">VALOR DA DIÁRIA <span>(em branco para GRATUITO)</span></label>
                <input type="text" name="price" id="price" placeholder=""
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                />
                <button className="btn" type="submit">Cadastrar</button>
            </form>
        </>
    )
}