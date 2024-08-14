import { Mail } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from '#app/_components/alert.tsx';
import { Button } from '#app/_components/button.tsx';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '#app/_components/card.tsx';
import { Input } from '#app/_components/input.tsx';
import { Label } from '#app/_components/label.tsx';
import { withLinguiPage } from '#libs/locales/withLingui.tsx';

export default withLinguiPage(function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle>Sign Up</CardTitle>
                    <CardDescription>
                        Create a new account to get started.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    placeholder="Enter your username"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder="Enter your password"
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirm-password">
                                    Confirm Password
                                </Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    placeholder="Confirm your password"
                                />
                            </div>
                        </div>
                        <Button className="w-full mt-4" type="submit">
                            <Mail className="mr-2 h-4 w-4" /> Sign up with Email
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <Alert variant="destructive" className="mb-4">
                        <AlertDescription>Test</AlertDescription>
                    </Alert>
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link
                            href="/sig-nin"
                            className="text-blue-600 hover:underline"
                        >
                            Sign in
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
});
