import { Trans, t } from '@lingui/macro';
import { Mail } from 'lucide-react';
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
                    <CardTitle>
                        <Trans>Sign In</Trans>
                    </CardTitle>
                    <CardDescription>
                        <Trans>Choose your preferred sign-in method.</Trans>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="username">
                                    <Trans>Username</Trans>
                                </Label>
                                <Input
                                    id="username"
                                    placeholder={t`Enter your username`}
                                />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="password">
                                    <Trans>Password</Trans>
                                </Label>
                                <Input
                                    id="password"
                                    type="password"
                                    placeholder={t`Enter your password`}
                                />
                            </div>
                        </div>
                        <Button className="w-full mt-4" type="submit">
                            <Mail className="mr-2 h-4 w-4" />
                            <Trans>Sign in with Email</Trans>
                        </Button>
                    </form>
                </CardContent>
                <CardFooter className="flex flex-col">
                    <Alert variant="destructive" className="mt-4">
                        <AlertDescription>"</AlertDescription>
                    </Alert>
                </CardFooter>
            </Card>
        </div>
    );
});
