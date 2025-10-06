// types.ts (or index.ts)

// 1. Define the props interface
export interface IconProps {
    // The size property is required and strictly typed to be one of these strings
    size: "sm" | "md" | "lg";
    // Adding optional properties for better reusability
    color?: string;
    className?: string;
}

// 2. Define the size map with strict typing
export const iconsSize: Record<IconProps['size'], string> = {
    sm: "size-2",
    md: "size-4",
    lg: "size-6"
};