import classNames from 'classnames';
import './Button.css';

export type ButtonVariant = 'primary' | 'secondary';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

export const Button = ({ 
  variant = 'primary', 
  children, 
  className,
  ...props 
}: ButtonProps) => {
  return (
    <button
      className={classNames('btn', `btn--${variant}`, className)}
      {...props}
    >
      {children}
    </button>
  );
};

