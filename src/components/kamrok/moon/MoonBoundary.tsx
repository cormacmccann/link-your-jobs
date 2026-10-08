import { Component, ReactNode } from "react";

interface Props {
  fallback: ReactNode;
  children: ReactNode;
  label?: string;
}
interface State {
  hasError: boolean;
}

/**
 * Error boundary for the 3D moon. A WebGL/asset failure inside the R3F canvases
 * (e.g. lost context on mobile, a GLB that won't load) throws during render;
 * without a boundary that unmounts the entire React app to a blank screen.
 * This catches it and shows a graceful fallback instead.
 */
export default class MoonBoundary extends Component<Props, State> {
  override state: State = { hasError: false };

  static override getDerivedStateFromError(): State {
    return { hasError: true };
  }

  override componentDidCatch(error: unknown) {
    console.warn(`MoonBoundary${this.props.label ? ` (${this.props.label})` : ""} caught:`, error);
  }

  override render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
