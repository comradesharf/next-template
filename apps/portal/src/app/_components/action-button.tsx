import { Trans } from '@lingui/macro';
import { Loader2 } from 'lucide-react';
import { forwardRef } from 'react';
import { Button, type ButtonProps } from '#app/_components/button.tsx';

export interface ActionButtonProps extends ButtonProps {
    placeholder?: string;
    loading?: boolean;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
    ({ children, placeholder, loading, ...props }, ref) => {
        return (
            <Button {...props} ref={ref}>
                {loading ? (
                    <>
                        <Loader2 className="animate-spin mr-2" />
                        <Trans>Loading...</Trans>
                    </>
                ) : (
                    children
                )}
            </Button>
        );
    },
);
