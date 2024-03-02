import {
    Jomhuria,
    Jomolhari
} from 'next/font/google'

// If loading a variable font, you don't need to specify the font weight
export const jomhuria = Jomhuria({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
})

export const jomolhari = Jomolhari({
    subsets: ['latin'],
    display: 'swap',
    weight: '400'
})