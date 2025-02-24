import {
    ClerkProvider,
    SignOutButton,
} from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <ClerkProvider>
            <SignOutButton />
        </ClerkProvider>
    )
}