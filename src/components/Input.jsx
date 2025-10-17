import { useId } from "react";

function Input({
    label,
    type = "text",
    className = "",
    ref,
    ...props
}) {
    const id = useId()
    return (
        <div className="w-full">
            {label && <label
                className="inline-block mb-1 pl-1"  // Fixed: p-1-1 -> pl-1
                htmlFor={id} 
            >
                {label}
            </label>
            }
            <input 
                type={type} 
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none
                focus:bg-gray-50 duration-200 border border-gray-200 w-full 
                ${type === 'file' ? 'pt-2 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 file:cursor-pointer' : ''} 
                ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
}

export default Input;