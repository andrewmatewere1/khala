import { Component } from "react";

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError() {
        return { hasError: true };
    }
    componentDidCatch(error) {
        console.error("App error boundary caught:", error);
    }
    render() {
        if (this.state.hasError) {
            return (
                <div className="flex min-h-screen items-center justify-center bg-paper px-6 text-center">
                    <div>
                        <h1 className="font-display text-2xl font-bold text-forest">Something went wrong</h1>
                        <p className="mt-2 text-muted">Please refresh the page to continue.</p>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
