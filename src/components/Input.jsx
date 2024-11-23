import React from 'react';

const Input = props => {
   const {
      className = '',
      placeholder,
      type = 'text',
      name,
      onChange = () => {},
      value = '',
      maxLength = null,
      children,
      disabled,
      title = '',
      onKeyDown = () => {},
   } = props;

   return (
      <label className={`block ${className}`}>
         {Boolean(title) && <span className="label-span">{title}</span>}
         <input
            type={type}
            name={name}
            maxLength={maxLength}
            value={value}
            onChange={onChange}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            autoCapitalize="off"
            autoCorrect="off"
            className="input"
         />
         {children}
      </label>
   );
};

export default Input;
