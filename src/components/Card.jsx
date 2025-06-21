import React from "react";

const Card = ({
  children,
  className = "",
  hover = false,
  onClick,
  ...props
}) => {
  const baseClasses =
    "bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden";
  const hoverClasses = hover
    ? "hover:shadow-lg hover:scale-105 transition-all duration-200 cursor-pointer"
    : "";
  const classes = `${baseClasses} ${hoverClasses} ${className}`;

  return (
    <div className={classes} onClick={onClick} {...props}>
      {children}
    </div>
  );
};

export default Card;
