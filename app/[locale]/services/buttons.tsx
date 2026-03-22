'use client';

import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import {cn} from "../../../utils/cn"

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        {...props}
        className={cn(
          'px-4 py-2 rounded-lg font-medium transition-colors duration-200',
          className
        )}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

