'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'

const badge = ['Péssimo', 'Regular', 'Bom', 'Ótimo', 'Espetacular']

export function StarRating() {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  function handleRatingChange(newRating: number) {
    setRating(newRating)
  }

  function handleMouseEnter(star: number) {
    setHover(star)
  }

  function handleMouseLeave() {
    setHover(rating)
  }

  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={cn(
            'w-8 h-8 text-gray-300',
            star <= (hover || rating) ? 'text-yellow-300' : 'text-gray-300',
          )}
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 20"
          onClick={() => handleRatingChange(star)}
          onMouseEnter={() => handleMouseEnter(star)}
          onMouseLeave={() => handleMouseLeave()}
        >
          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
        </svg>
      ))}
      {(hover || rating) > 0 && (
        <div
          className={cn(
            'ml-1 rounded-md py-1 px-2',
            (hover || rating) === 1 && 'bg-rose-200 text-rose-600',
            (hover || rating) === 2 && 'bg-rose-100 text-rose-400',
            (hover || rating) === 3 && 'bg-gray-500 text-gray-100',
            (hover || rating) === 4 && 'bg-emerald-100 ',
            (hover || rating) === 5 && 'bg-emerald-200',
          )}
        >
          {badge[(hover || rating) - 1]}
        </div>
      )}
    </div>
  )
}
