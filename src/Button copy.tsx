import React from 'react';

type ButtonProps = {
    disabled: boolean;
};

const Button: React.FC<ButtonProps> = ({ disabled }) => {
    return (
        <button disabled={disabled}>
            button
        </button>
    );
};

export default Button;
