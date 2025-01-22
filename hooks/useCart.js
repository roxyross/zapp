'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useCart = create(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, quantity = 1, color) => {
        set(state => {
          const existing = state.items.find(
            item => item.id === product.id && item.color === color
          )
          
          if (existing) {
            return {
              items: state.items.map(item =>
                item.id === product.id && item.color === color
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            }
          }
          
          return {
            items: [...state.items, { ...product, quantity, color }]
          }
        })
      },
      removeFromCart: (productId, color) => {
        set(state => ({
          items: state.items.filter(
            item => !(item.id === productId && item.color === color)
          )
        }))
      },
      // ... more cart methods
    }),
    {
      name: 'cart-storage'
    }
  )
)
