import React from "react";

interface SkeletonLoaderProps {
  variant?: "card" | "text" | "avatar" | "image" | "list" | "grid";
  count?: number;
  height?: string;
  width?: string;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  variant = "card",
  count = 1,
  height,
  width,
  className = "",
}) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 bg-[length:200%_100%] rounded-lg";

  const renderSkeleton = () => {
    switch (variant) {
      case "card":
        return (
          <div className={`${baseClasses} p-6 space-y-4 ${className}`} style={{ height: height || "300px", width }}>
            <div className="h-6 bg-gray-700 rounded w-3/4"></div>
            <div className="h-4 bg-gray-700 rounded w-full"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-700 rounded w-4/6"></div>
          </div>
        );

      case "text":
        return (
          <div className={`${baseClasses} ${className}`} style={{ height: height || "20px", width: width || "100%" }}></div>
        );

      case "avatar":
        return (
          <div className={`${baseClasses} rounded-full ${className}`} style={{ height: height || "80px", width: width || "80px" }}></div>
        );

      case "image":
        return (
          <div className={`${baseClasses} ${className}`} style={{ height: height || "200px", width: width || "100%" }}></div>
        );

      case "list":
        return (
          <div className={`space-y-3 ${className}`}>
            {Array.from({ length: count }).map((_, idx) => (
              <div key={idx} className="flex items-center space-x-4">
                <div className={`${baseClasses} rounded-full`} style={{ height: "40px", width: "40px" }}></div>
                <div className="flex-1 space-y-2">
                  <div className={`${baseClasses}`} style={{ height: "16px", width: "60%" }}></div>
                  <div className={`${baseClasses}`} style={{ height: "14px", width: "40%" }}></div>
                </div>
              </div>
            ))}
          </div>
        );

      case "grid":
        return (
          <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
            {Array.from({ length: count }).map((_, idx) => (
              <div key={idx} className={`${baseClasses} p-6 space-y-4`} style={{ height: height || "300px" }}>
                <div className="h-40 bg-gray-700 rounded"></div>
                <div className="h-6 bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (count > 1 && variant !== "list" && variant !== "grid") {
    return (
      <>
        {Array.from({ length: count }).map((_, idx) => (
          <React.Fragment key={idx}>{renderSkeleton()}</React.Fragment>
        ))}
      </>
    );
  }

  return <>{renderSkeleton()}</>;
};

// Specialized skeleton components for specific use cases
export const ProjectCardSkeleton = () => (
  <div className="bg-tertiary p-5 rounded-2xl w-full animate-pulse">
    <div className="relative w-full h-[230px] bg-gray-700 rounded-2xl mb-5"></div>
    <div className="space-y-3">
      <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="flex flex-wrap gap-2 mt-4">
        <div className="h-6 w-16 bg-gray-700 rounded-full"></div>
        <div className="h-6 w-20 bg-gray-700 rounded-full"></div>
        <div className="h-6 w-24 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  </div>
);

export const ExperienceCardSkeleton = () => (
  <div className="animate-pulse">
    <div className="flex items-center gap-5 mb-5">
      <div className="w-16 h-16 rounded-full bg-gray-700"></div>
      <div className="flex-1 space-y-2">
        <div className="h-6 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
  </div>
);

export const TechBallSkeleton = () => (
  <div className="w-28 h-28 animate-pulse">
    <div className="w-full h-full rounded-full bg-gray-700"></div>
  </div>
);

export const TestimonialCardSkeleton = () => (
  <div className="bg-black-200 p-10 rounded-3xl animate-pulse">
    <div className="h-6 bg-gray-700 rounded w-12 mb-4"></div>
    <div className="space-y-2 mb-7">
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="h-4 bg-gray-700 rounded w-4/6"></div>
    </div>
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full bg-gray-700"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
        <div className="h-3 bg-gray-700 rounded w-1/2"></div>
      </div>
    </div>
  </div>
);

export const DiagramCardSkeleton = () => (
  <div className="bg-tertiary p-5 rounded-2xl animate-pulse">
    <div className="relative w-full h-[230px] bg-gray-700 rounded-2xl mb-5"></div>
    <div className="space-y-3">
      <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
    </div>
  </div>
);

// Admin Panel Skeleton Loaders
export const AdminCardSkeleton = () => (
  <div className="bg-[#1d1836] rounded-2xl p-6 border border-[#915EFF]/20 animate-pulse">
    <div className="w-full h-48 rounded-xl bg-gray-700 mb-4"></div>
    <div className="space-y-3">
      <div className="h-6 bg-gray-700 rounded w-3/4"></div>
      <div className="h-4 bg-gray-700 rounded w-full"></div>
      <div className="h-4 bg-gray-700 rounded w-5/6"></div>
      <div className="flex gap-3 mt-4">
        <div className="h-10 bg-gray-700 rounded-xl flex-1"></div>
        <div className="h-10 bg-gray-700 rounded-xl flex-1"></div>
      </div>
    </div>
  </div>
);

export const AdminListSkeleton = () => (
  <div className="bg-[#1d1836] rounded-2xl p-6 border border-[#915EFF]/20 animate-pulse">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-16 h-16 rounded-xl bg-gray-700"></div>
      <div className="flex-1 space-y-2">
        <div className="h-5 bg-gray-700 rounded w-1/2"></div>
        <div className="h-4 bg-gray-700 rounded w-1/3"></div>
      </div>
    </div>
    <div className="flex gap-3">
      <div className="h-10 bg-gray-700 rounded-xl flex-1"></div>
      <div className="h-10 bg-gray-700 rounded-xl flex-1"></div>
    </div>
  </div>
);
