import React, { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children?: ReactNode
  fallback?: ReactNode
}
interface ErrorBoundaryState {
  hasError?: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);

    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log({ error, errorInfo });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          flexDirection: 'column',
        }}
        >
          <h1>Something went wrong.</h1>
          <p>Please contact the administrator.</p>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
