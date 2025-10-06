// PlusIcon.tsx

// ✅ Correct Import: Assuming types.ts is in the same directory or available via path
import { iconsSize, type IconProps } from "."; 
// OR import { iconsSize, type IconProps } from "."; if using an index file

export const PlusIcon = (props: IconProps) => {
    
    // ✅ Safe Indexing: Since size is REQUIRED and strictly typed, this is safe.
    const sizeClass = iconsSize[props.size]; 

    // Combine size class with any custom classes
    const finalClassName = `${sizeClass} ${props.className || ''}`;

    return (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            strokeWidth="1.5" 
            // Use the optional color prop, defaulting to "currentColor"
            stroke={props.color || "currentColor"} 
            className={finalClassName} 
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
    );
};