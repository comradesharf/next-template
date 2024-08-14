'use client';

import { Mail } from 'lucide-react';
import { Button } from '#app/_components/button.tsx';
import { Input } from '#app/_components/input.tsx';
import { Label } from '#app/_components/label.tsx';

export function Component() {
    return (
        <form>
            <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="Enter your username" />
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
                    <Label htmlFor="confirm-password">Confirm Password</Label>
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
    );
}
