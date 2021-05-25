import React from "react";
import { Form, Col } from "react-bootstrap";

// SELECT INPUT

export const SelectorInput = ({
  feildProps,
  options,
  name,
  label,
  req,
  value,
}) => {
  const { handleChange, handleBlur, touched, errors } = feildProps;
  return (
    <div>
      <Form.Group as={Col} sm={12} md={12} lg={12}>
        <Form.Label className={`label ${req && "req"}`}>{label}</Form.Label>
        <Form.Control
          as="select"
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched[name] && errors[name]}
          value={value}
        >
          {options.map((curr, index) => {
            return (
              <option key={index} value={curr.value}>
                {curr.key}
              </option>
            );
          })}
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {errors[name]}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

// TEXT INPUT

export const TextInput = ({
  feildProps,
  name,
  label,
  req,
  placeholder,
  value,
  type,
}) => {
  const { handleChange, handleBlur, touched, errors } = feildProps;
  return (
    <div>
      <Form.Group as={Col} sm={12} md={12} lg={12}>
        <Form.Label className={`label ${req && "req"}`}>{label}</Form.Label>
        <Form.Control
          placeholder={placeholder}
          type={type}
          name={name}
          onChange={handleChange}
          onBlur={handleBlur}
          isInvalid={touched[name] && errors[name]}
          value={value}
        />
        <Form.Control.Feedback type="invalid">
          {errors[name]}
        </Form.Control.Feedback>
      </Form.Group>
    </div>
  );
};

TextInput.defaultProps = {
  type: "text",
  req: true,
};
