export interface IFormInput {
  onChange: (...event: any[]) => void;
  onBlur?: () => void;
  value: string | number | undefined;
  name: string;
  placeholder?: string;
  label?: string;
  type?: "text" | "number" | "password";
  maxlength?: number;
  error?: { type: string; message?: string } | string;
  className?: string;
  ref?: any;
  disabled?: boolean;
}
