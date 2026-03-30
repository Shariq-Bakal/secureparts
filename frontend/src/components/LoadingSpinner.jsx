// components/LoadingSpinner.jsx
import React from 'react';

const LoadingSpinner = ({ message = "LOADING", timer = null }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px]">
      {/* Spinner with optional timer inside */}
      <div className="relative">
        <svg className="w-24 h-24 animate-spin text-blue-600" viewBox="0 0 64 64" fill="none">
          <path
            d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
            stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"
          />
          <path
            d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
            stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" 
            className="text-gray-300"
          />
        </svg>
        
        {/* Show timer inside spinner if provided */}
        {timer !== null && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{timer}</div>
              <div className="text-xs text-gray-500">sec</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Loading message */}
      <div className="mt-6 text-center">
        <div className="text-lg font-semibold text-gray-700 animate-pulse">
          {message}
        </div>
        <div className="text-sm text-gray-500 mt-2">
          Please wait while we fetch your data...
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;