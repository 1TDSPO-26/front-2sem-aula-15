import React from 'react'
import { Link } from 'react-router/internal/react-server-client'

export default function Menu() {
  return (
    <nav>
        <ul>
            <li>
                <a href="/">Home</a>
                <li><Link to="/produtos">Produtos</Link></li>
            </li>
        </ul>
    </nav>
  )
}
