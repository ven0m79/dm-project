import { Roboto } from 'next/font/google'
 
const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
})
 
export default function MyApp({ Component, pageProps }) {
  return (
    <main className={`${roboto.variable} font-sans`}>
      <Component {...pageProps} />
    </main>
  )
}