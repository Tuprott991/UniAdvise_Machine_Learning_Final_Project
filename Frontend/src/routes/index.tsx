/**
 * File: routes/index.tsx
 * ------------------------
 * Đây là tệp cấu hình tất cả các tuyến đường (routes) trong ứng dụng React.
 * 
 * Mục tiêu:
 * - Sử dụng lazy loading để tối ưu hiệu suất và giảm kích thước file JS khi tải lần đầu.
 * - Phân tách các route thành public (không cần đăng nhập) và protected (cần đăng nhập).
 * - Bọc các tuyến bằng `ErrorBoundary` để xử lý lỗi tải component.
 * - Dùng `Suspense` để hiển thị spinner trong lúc chờ tải component.
 */

import { Routes, Route } from 'react-router-dom';
import React, { Suspense, ReactNode } from 'react';
import { ProtectedRoute } from '@components/ProtectedRoute'; // Component kiểm tra đăng nhập

// -------------------- Lazy Loaded Pages --------------------

/**
 * Trang chủ - hiển thị nội dung chính ban đầu cho người dùng.
 */
const Homepage = React.lazy(() =>
    import('@pages/Homepage').then(module => ({ default: module.Homepage }))
);

/**
 * Trang danh sách các trường đại học.
 */
const Universities = React.lazy(() =>
    import('@pages/Universities').then(module => ({ default: module.Universities }))
);

/**
 * Trang chi tiết thông tin cho một trường đại học cụ thể (dựa vào route param `:id`).
 */
const UniversityDetail = React.lazy(() =>
    import('@pages/UniversityDetail').then(module => ({ default: module.UniversityDetail }))
);

/**
 * Trang chatbot tư vấn - chỉ cho phép truy cập nếu người dùng đã đăng nhập.
 */
const Chatbot = React.lazy(() =>
    import('@pages/Chatbot').then(module => ({ default: module.Chatbot }))
);

/**
 * Trang roadmap học tập - gợi ý lộ trình học tập cho học sinh - cần xác thực.
 */
const RoadMap = React.lazy(() =>
    import('@pages/RoadMap').then(module => ({ default: module.RoadMap }))
);

/**
 * Trang giới thiệu về dự án/ứng dụng.
 */
const About = React.lazy(() =>
    import('@pages/About').then(module => ({ default: module.About }))
);

/**
 * Trang đăng nhập người dùng.
 */
const Login = React.lazy(() =>
    import('@pages/Login').then(module => ({ default: module.Login }))
);

/**
 * Trang đăng ký tài khoản mới.
 */
const Register = React.lazy(() =>
    import('@pages/Register').then(module => ({ default: module.Register }))
);

// -------------------- Spinner Trong Khi Chờ Tải Component --------------------

/**
 * Spinner hiển thị trong lúc component được lazy load.
 * 
 * @returns Giao diện loading dạng toàn trang.
 */
const LoadingSpinner = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div className="spinner"></div> {/* Có thể thay bằng spinner Chakra UI hoặc component riêng */}
    </div>
);

// -------------------- Error Boundary --------------------

/**
 * Props cho component ErrorBoundary - yêu cầu truyền children.
 */
interface ErrorBoundaryProps {
    children: ReactNode;
}

/**
 * State cho component ErrorBoundary để xác định có lỗi không.
 */
interface ErrorBoundaryState {
    hasError: boolean;
}

/**
 * Component giúp ngăn ứng dụng bị crash nếu có lỗi khi tải các component (ví dụ khi import bị fail).
 * Sử dụng cho tất cả các tuyến đường dùng lazy loading.
 */
class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = { hasError: false };

    /**
     * Khi xảy ra lỗi, chuyển sang state lỗi để render fallback UI.
     */
    static getDerivedStateFromError(): ErrorBoundaryState {
        return { hasError: true };
    }

    /**
     * Ghi lại lỗi và thông tin lỗi (có thể tích hợp sentry, log server, v.v.)
     * @param error - đối tượng lỗi
     * @param info - thông tin lỗi (component stack)
     */
    componentDidCatch(error: Error, info: React.ErrorInfo): void {
        console.error('Error loading component:', error, info);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return <div>Oops! Something went wrong while loading the page.</div>;
        }

        return this.props.children;
    }
}

// -------------------- Routes Chính --------------------

/**
 * Component định nghĩa các route trong ứng dụng.
 * - Bọc toàn bộ route trong `ErrorBoundary` để xử lý lỗi import.
 * - Sử dụng `Suspense` để hiển thị `LoadingSpinner` khi đang tải trang.
 * - Các tuyến được phân loại thành:
 *   - Public: Không yêu cầu đăng nhập.
 *   - Protected: Chỉ truy cập nếu đã xác thực (sử dụng <ProtectedRoute />).
 * 
 * @returns JSX cấu trúc định tuyến cho toàn bộ ứng dụng.
 */
export const AppRoutes = () => {
    return (
        <ErrorBoundary>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    {/* -------- Public Routes -------- */}
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/universities" element={<Universities />} />
                    <Route path="/university/:id" element={<UniversityDetail />} />

                    {/* -------- Protected Routes (cần đăng nhập) -------- */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="/chatbot" element={<Chatbot />} />
                        <Route path="/roadmap" element={<RoadMap />} />
                    </Route>
                </Routes>
            </Suspense>
        </ErrorBoundary>
    );
};
