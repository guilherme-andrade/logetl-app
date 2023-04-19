"use client";

import { ErrorBoundary, ErrorBoundaryProps } from "react-error-boundary";

export const GlobalErrorHandler = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const fallbackRender: ErrorBoundaryProps["fallbackRender"] = ({ error }) => {
    console.log(error.name);

    return (
      <div>
        <pre>{error.message}</pre>
      </div>
    );
  };

  return (
    <ErrorBoundary fallbackRender={fallbackRender}>{children}</ErrorBoundary>
  );
};
