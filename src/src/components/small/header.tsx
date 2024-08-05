import Link from 'next/link'
import { Button } from '../ui/button'

export default function HeaderButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-1">
      <Button variant="outline" className="w-full sm:w-48" asChild>
        <Link href="/tag">Tag Search</Link>
      </Button>
      <Button variant="outline" className="w-full sm:w-48" asChild>
        <Link href="/about">About</Link>
      </Button>
      <Button variant="outline" className="w-full sm:w-48" asChild>
        <Link href="/contact">Contact</Link>
      </Button>
    </div>
  )
}
