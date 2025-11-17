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
                <DialogContent className="max-w-none w-screen h-screen p-0 translate-x-[-50%] translate-y-[-50%] left-[50%] top-[50%] sm:rounded-none">
                    <div className="relative w-full h-full flex items-center justify-center bg-black/90">
                        <Image
                            src={imageUrl}
                            alt={alt}
                            fill
                            className="object-contain"
                            sizes="100vw"
                        />
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}