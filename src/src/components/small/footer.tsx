import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowBigUpIcon, HomeIcon } from 'lucide-react'

export default function FooterButtons() {
  return (
    <div className="flex flex-row justify-center items-center mb-4">
      <Link href="/">
        <Button variant="default" className="items-end w-48 gap-1">
          <HomeIcon />
          Back to Home
        </Button>
      </Link>
      <Link href="#top" scroll={true} replace={true}>
        <Button variant="secondary" className="items-end w-48 gap-1">
          <ArrowBigUpIcon />
          Jump to the Top
        </Button>
      </Link>
    </div>
  )
}
