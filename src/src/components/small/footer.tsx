import Link from 'next/link'
import { Button } from '../ui/button'
import { ArrowBigUpIcon, HomeIcon } from 'lucide-react'

export default function FooterButtons() {
  return (
    <div className="flex sm:flex-row flex-col justify-center items-center mb-4">
      <Button variant="default" className="items-end w-48 gap-1" asChild>
        <Link href="/">
          <HomeIcon />
          Back to Home
        </Link>
      </Button>
      <Button variant="secondary" className="items-end w-48 gap-1" asChild>
        <Link href="#top" scroll={true} replace={true}>
          <ArrowBigUpIcon />
          Jump to the Top
        </Link>
      </Button>
    </div>
  )
}
