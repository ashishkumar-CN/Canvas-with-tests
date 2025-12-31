import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null
    };

    public static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-background p-4 text-center">
                    <div className="max-w-md w-full p-8 bg-card border border-border rounded-xl shadow-2xl">
                        <h1 className="text-2xl font-bold text-destructive mb-4">Something went wrong.</h1>
                        <p className="text-muted-foreground mb-6">
                            The application encountered an unexpected error.
                        </p>
                        <div className="p-4 bg-muted/50 rounded-lg text-left mb-6 overflow-auto max-h-40">
                            <code className="text-xs text-destructive">{this.state.error?.toString()}</code>
                        </div>
                        <button
                            onClick={() => window.location.reload()}
                            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-bold hover:bg-accent transition-colors"
                        >
                            Reload Page
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
