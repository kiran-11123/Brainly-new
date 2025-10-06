


interface ButtonProps {

  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: () => void;


}


export const Button = (props: ButtonProps) => {

  const { variant, size, text, startIcon, endIcon, onClick } = props;

  //Tailwind classes for Variant

  const VariantClass: Record<string, string> = {

    primary: "bg-blue-600 text-white hover:bg-700",
    secondary: "bg-blue-200 text-gray-800 hover:bg-gray-300"

  }

  const sizeClasses: Record<string, string> = {

    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"

  }


  return (


    <button type="button" onClick={onClick} className={`inline-flex items-center gap-2 rounded-md shadow-xl font-medium transition-colors duration-200 ${VariantClass[variant]} ${sizeClasses[size]}`}>

      {startIcon && <span>{startIcon}</span>}
      {text}
      {endIcon && <span>{endIcon}</span>}
    </button>



  )
}




