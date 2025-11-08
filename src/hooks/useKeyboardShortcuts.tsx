import { useEffect } from "react";

interface KeyboardShortcut {
  key: string;
  ctrlKey?: boolean;
  metaKey?: boolean;
  shiftKey?: boolean;
  handler: () => void;
  description?: string;
}

export function useKeyboardShortcuts(shortcuts: KeyboardShortcut[], enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrlKey === undefined || shortcut.ctrlKey === e.ctrlKey;
        const metaMatch = shortcut.metaKey === undefined || shortcut.metaKey === e.metaKey;
        const shiftMatch = shortcut.shiftKey === undefined || shortcut.shiftKey === e.shiftKey;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && metaMatch && shiftMatch && keyMatch) {
          e.preventDefault();
          shortcut.handler();
          return;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [shortcuts, enabled]);
}

export const commonShortcuts = {
  commandPalette: (handler: () => void) => ({
    key: "k",
    ctrlKey: true,
    metaKey: true,
    handler,
    description: "Open command palette"
  }),
  search: (handler: () => void) => ({
    key: "/",
    handler,
    description: "Focus search"
  }),
  escape: (handler: () => void) => ({
    key: "Escape",
    handler,
    description: "Close modal/panel"
  }),
  edit: (handler: () => void) => ({
    key: "e",
    handler,
    description: "Edit selected item"
  }),
  comment: (handler: () => void) => ({
    key: "c",
    handler,
    description: "Add comment"
  }),
  newItem: (handler: () => void) => ({
    key: "n",
    handler,
    description: "Create new item"
  }),
  arrowUp: (handler: () => void) => ({
    key: "ArrowUp",
    handler,
    description: "Navigate up"
  }),
  arrowDown: (handler: () => void) => ({
    key: "ArrowDown",
    handler,
    description: "Navigate down"
  }),
  enter: (handler: () => void) => ({
    key: "Enter",
    handler,
    description: "Open selected item"
  })
};
