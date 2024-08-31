'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/src/components/ui/dialog'
import { useCallback } from 'react'

export default function Modal({ imageSrc }: { imageSrc: string }) {
  const onClose = useCallback((open: boolean) => {
    if (!open) {
      history.back()
    }
  }, [])
  return (
    <Dialog defaultOpen onOpenChange={onClose}>
      <DialogContent>
        <DialogTitle></DialogTitle>
        <DialogDescription></DialogDescription>
        {imageSrc}
      </DialogContent>
    </Dialog>
  )
}
