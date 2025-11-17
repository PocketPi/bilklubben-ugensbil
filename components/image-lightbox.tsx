"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface ImageLightboxProps {
    children: React.ReactNode
    imageUrl: string
    alt: string
}

export function ImageLightbox({ children, imageUrl, alt }: ImageLightboxProps) {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="cursor-pointer">
                {children}
            </div>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-5xl max-h-[90vh] p-0">
                    <div className="relative w-full h-[80vh] flex items-center justify-center bg-muted/50">
                        <Image
                            src={imageUrl}
                            alt={alt}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 80vw"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}