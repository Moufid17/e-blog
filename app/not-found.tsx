import Link from 'next/link'
import { headers } from 'next/headers'
 
export default function NotFound() {
    const headersList = headers()
    const domain = headersList.get('host')
    
    return (
        <div>
        <h2>Not Found : {domain}</h2>
        <p>Could not find requested resource</p>
        <Link href="/">Return Home</Link>
        </div>
    )
}