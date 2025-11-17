import {
    ClerkProvider,
    SignInButton,
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function SignInPage() {
    return (
        <ClerkProvider>
            <div className="min-h-screen flex items-center justify-center">
                <SignInButton 
                    forceRedirectUrl={"/"}
                    mode="modal"
                >
                    <Button size="lg" className="text-base">
                        Sign In
                    </Button>
                </SignInButton>
            </div>
        </ClerkProvider>
    )
}