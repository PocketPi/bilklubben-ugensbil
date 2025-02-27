"use client"

import { useState } from "react"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ImageLightboxProps {
    children: React.ReactNode
}

export function ImageLightbox({ children }: ImageLightboxProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="cursor-pointer">
                {children}
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-3xl">
                    {children}
                </DialogContent>
            </Dialog>
        </>
    )
}