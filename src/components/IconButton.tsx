import React, { ButtonHTMLAttributes, ReactElement } from 'react';
import styled from 'styled-components';

type ButtonElement = ButtonHTMLAttributes<HTMLButtonElement>;

type Props = {
  children: ReactElement;
} & Omit<ButtonElement, 'type' | 'aria-label' | 'children'> &
  Required<Pick<ButtonElement, 'aria-label'>>;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: inline-flex;
`;

export default function IconButton({ children, ...buttonProps }: Props) {
  return (
    <Button type="button" {...buttonProps}>
      {React.cloneElement(children, {
        'aria-hidden': true,
      })}
    </Button>
  );
}
