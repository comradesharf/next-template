"use client";

import { Slot } from "@radix-ui/react-slot";
import { AnimatePresence, type AnimatePresenceProps } from "framer-motion";
import { type PropsWithChildren, createContext, use, useState } from "react";
import { useStore } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createStore } from "zustand/vanilla";

interface Store {
    state: boolean;
    toggleVisibility: () => void;
}

export interface ControlledViewStore extends ReturnType<typeof useStateStore> {}

function useStateStore(initialState: boolean) {
    const [store] = useState(() =>
        createStore<Store>()(
            immer((set, get) => ({
                state: initialState,
                toggleVisibility: () =>
                    set((draft) => {
                        draft.state = !get().state;
                    }),
            })),
        ),
    );
    return store;
}

const Context = createContext<ControlledViewStore>(null as any);

export interface ControlledViewProps extends PropsWithChildren {
    defaultView?: boolean;
}

export function ControlledView({
    children,
    defaultView = true,
}: ControlledViewProps) {
    const store = useStateStore(defaultView);
    return <Context value={store}>{children}</Context>;
}

export interface ControlledViewTriggerProps extends PropsWithChildren {}

export function ControlledViewTrigger(props: ControlledViewTriggerProps) {
    const { toggleVisibility, state } = useStore(use(Context));
    return (
        <Slot
            {...props}
            defaultChecked={state}
            onClick={() => toggleVisibility()}
        />
    );
}

export interface ControlledViewContainerProps
    extends PropsWithChildren,
        AnimatePresenceProps {}

export function ControlledViewContainer({
    children,
    ...props
}: ControlledViewContainerProps) {
    const state = useStore(use(Context), (state) => state.state);
    return (
        <AnimatePresence {...props}>{state ? children : null}</AnimatePresence>
    );
}
