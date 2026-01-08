interface TextFielddProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  type?: string;
  name?: string;
  width?: string;
  maxWidth?: string;
  height?: string;
  borderColor?: string;
  backgroundColor?: string;
  borderRadius?: string;
  border?: string;
  fontWeight?: number;
  fontFamily?: string;
  fontSize?: string;
  paddingLeft?: string;
  outline?: string;
}

const TextField: React.FC<TextFielddProps> = ({
  value,
  onChange,
  placeholder,
  className,
  type = "text",
  name,
  width = "300px",
  maxWidth ="90%",
  height = "35px",
  borderColor,
  backgroundColor,
  border = "2px solid #16a085",
  borderRadius = "8px",
  paddingLeft = "10px",
  outline = "none",
}) => {

  return (
      <input
        className={className}
        type={type}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        style={{
          width,
          maxWidth,
          height,
          borderRadius,
          paddingLeft,
          backgroundColor,
          borderColor,
          border,
          outline,
        }}
      />
  );
};

export default TextField;
