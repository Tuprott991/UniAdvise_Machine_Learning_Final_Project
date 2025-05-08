// routes/index.tsx

import { Routes, Route } from 'react-router-dom';
import React, { Suspense, ReactNode } from 'react';
import { ProtectedRoute } from '@components/ProtectedRoute';

// Lazy load the pages
const Homepage = React.lazy(() =>
    import('@pages/Homepage').then(module => ({ default: module.Homepage }))
);
const Universities = React.lazy(() =>
    import('@pages/Universities').then(module => ({ default: module.Universities }))
);
const UniversityDetail = React.lazy(() =>
    import('@pages/UniversityDetail').then(module => ({ default: module.UniversityDetail }))
);
const Chatbot = React.lazy(() =>
    import('@pages/Chatbot').then(module => ({ default: module.Chatbot }))
);
const About = React.lazy(() =>
    import('@pages/About').then(module => ({ default: module.About }))
);
const Login = React.lazy(() =>
    import('@pages/Login').then(module => ({ default: module.Login }))
);
const Register = React.lazy(() =>
    import('@pages/Register').then(module => ({ default: module.Register }))
);

// Custom Loading Spinner component
const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner"></div> {/* Your custom spinner component */}
    </div>
);

// Error Boundary component to handle any loading errors
interface ErrorBoundaryProps {
    children: ReactNode; // This tells TypeScript that this component will receive children
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error: Error, info: React.ErrorInfo) {
        console.error('Error loading component:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div>Oops! Something went wrong while loading the page.</div>;
        }

        return this.props.children;
    }
}

/**
 * Define routes for the application with lazy loading for better performance.
 * - Public routes (accessible to all users)
 * - Protected routes (only accessible to authenticated users)
 */
export const AppRoutes = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    {/* Public routes accessible by everyone */}
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/universities" element={<Universities />} />
                    <Route path="/university/:id" element={<UniversityDetail />} />

                    {/* Protected routes requiring authentication */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/chatbot" element={<Chatbot />} />
                    </Route>
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};
