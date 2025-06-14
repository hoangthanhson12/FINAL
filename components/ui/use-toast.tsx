import * as React from "react";
import { toast as hotToast } from "react-hot-toast";

export const toast = ({ title, description, duration = 3000 }: { title: string; description: string; duration?: number }) => {
  hotToast.custom((t) => (
    <div
      className={`max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5 ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 pt-0.5">
            <span className="text-orange-500 font-bold">🔔</span>
          </div>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-gray-900">{title}</p>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
          </div>
        </div>
      </div>
      <div className="flex border-l border-gray-200">
        <button
          onClick={() => hotToast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-orange-600 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Close
        </button>
      </div>
    </div>
  ), { duration });
};