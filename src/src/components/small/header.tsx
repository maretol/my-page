import Link from 'next/link'
import { Button } from '../ui/button'

export default function HeaderButtons() {
  return (
    <div className="flex flex-row gap-1">
      <Link href="/tag">
        <Button variant="outline" className="w-48">
          Tag Search
        </Button>
      </Link>
      <Link href="/about">
        <Button variant="outline" className="w-48">
          About
        </Button>
      </Link>
      <Link href="/contact">
        <Button variant="outline" className="w-48">
          Contact
        </Button>
      </Link>
    </div>
  )
}
