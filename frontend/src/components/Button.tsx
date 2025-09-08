import { Button, CircularProgress, Typography } from "@mui/material"
import type { FC, ReactNode } from "react";

export interface BtnProps{
  id: string;
  label?: string;
  name: string;
  loading?: boolean;
  icon?: ReactNode;
  variant?: "contained" | "outlined" | "text";
  disabled?: boolean;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}

const Btn: FC<BtnProps> = (props) => {
  const {
    id,
    label,
    name,
    loading = false,
    icon,
    variant = "contained",
    disabled = false,
    onClick,
    type = "button",
  } = props;
  
  return (
    <>
      {label && (
        <Typography 
          variant="body2" 
          component="label" 
          htmlFor={id}
        >
          {label}
        </Typography>
      )}

      <Button
        id={id}
        type={type}
        name={name}
        aria-label={name}
        variant={variant}
        startIcon={!loading && icon}
        disabled={disabled || loading}
        onClick={onClick}
      >
        {loading ? 
          <CircularProgress size={20} color="inherit" /> 
        : name}
      </Button>
    </>
  );
};

export default Btn;