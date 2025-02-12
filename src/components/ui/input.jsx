import React, { useState } from "react";
import { Eye, EyeOff, Mail, Phone, User, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const Input = ({ label = "", type, id, value, onChange, onBlur, error, placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full">
      {/* Label */}
      <label
        htmlFor={id}
        className={`${label === "" && "hidden"} block text-sm mb-2 font-medium text-labelColor-default`}
      >
        {label}{" "}
        {required && <span className="absolute text-sm text-errorColor-default pl-1 mt-1">*</span>}
      </label>

      <div className="relative">
        {/* Input Field */}
        <input
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          className={cn(
            "w-full rounded-lg border !pr-9 px-4 py-2 text-textColor-dark bg-background-default focus:ring-2 focus:ring-primary-default focus:outline-none transition-all duration-300 ease-in-out",
            error ? "border-errorColor-default" : "border-gray-300 hover:border-primary-default"
          )}
        />

        {/* Icon Inside Input */}
        <span className="absolute top-3 right-3 flex items-center text-labelColor-light">
          {id === "email" && <Mail size={20} />}
          {id === "telephone" && <Phone size={20} />}
          {id === "firstName" && <User size={20} />}
          {id === "lastName" && <User size={20} />}
          {id === "search" && <Search  size={20} />}
        </span>

        {/* Password Show/Hide Button */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-3 right-3 flex items-center text-labelColor-light transition-colors duration-300 ease-in-out hover:text-primary-default"
          >
            <span className="transition-transform duration-300 ease-in-out transform scale-100 hover:scale-110">
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
          </button>
        )}
      </div>

      {/* Error Message */}
      {error && <p className="text-sm text-errorColor-default mt-1">{error}</p>}
    </div>
  );
};

export default Input;