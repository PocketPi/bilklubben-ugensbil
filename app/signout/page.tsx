import {
    SignOutButton,
} from '@clerk/nextjs'
import { Button } from '@/components/ui/button'

export default function SignOutPage() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <SignOutButton 
                redirectUrl={"/"}
            >
                <Button size="lg" className="text-base">
                    Sign Out
                </Button>
            </SignOutButton>
        </div>
    )
}