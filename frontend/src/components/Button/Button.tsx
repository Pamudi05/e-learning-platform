interface ButtonProps {
  className?: string;
  onButtonClick?: () => void ;
  type?: "button" | "submit" | "reset";
  name?: string;
  color?: string;
  backgroundColor?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  borderRadius?: string;
  border?: string;
  fontWeight?: string;
  outline?: string;
  marginTop?: string;
  disabled?: boolean
}

const Button: React.FC<ButtonProps> = ({
  className,
  onButtonClick,
  type = "button",
  name,
  color = "white",
  backgroundColor = "#16a085",
  width ="300px" ,
  maxWidth= "94%",
  height = "35px",
  borderRadius = "10px",
  border = "none",
  fontWeight = "600",
  outline = "none",
  marginTop = "30px",
  disabled
}) => {
  return (
    <button
      className={className}
      type={type}
      onClick={onButtonClick}
      disabled={disabled}
      style={{
        color,
        backgroundColor,
        width,
        maxWidth,
        height,
        borderRadius,
        border,
        cursor: "pointer",
        fontWeight,
        outline,
        marginTop,
        
      }}
    >
      {name}
    </button>
  );
};

export default Button;
