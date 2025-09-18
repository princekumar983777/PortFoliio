"use client";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

interface DynamicSectionProps {
  component: ComponentType<any>;
  fallback?: React.ReactNode;
}

export default function DynamicSection({ component, fallback }: DynamicSectionProps) {
  const DynamicComponent = dynamic(() => Promise.resolve(component), {
    loading: () => fallback || <div className="animate-pulse bg-gray-200 dark:bg-gray-700 h-32 rounded"></div>,
    ssr: false
  });

  return <DynamicComponent />;
}
