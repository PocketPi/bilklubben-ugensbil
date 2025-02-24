import {
    ClerkProvider,
    SignInButton,
} from '@clerk/nextjs'

export default function SignInPage() {
    return (
        <ClerkProvider>
            <SignInButton forceRedirectUrl={"/"} />
        </ClerkProvider>
    )
}