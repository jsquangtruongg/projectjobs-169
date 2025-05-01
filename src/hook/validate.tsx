import { useState, useEffect } from "react";

interface Values {
  [key: string]: string | undefined;
}

interface ValidationRule {
  required?: boolean;
  pattern?: RegExp;
  minLength?: number;
}

type ValidationRules = Record<string, ValidationRule>;

const useValidation = (
  values: Values,
  validationRules: ValidationRules,
  triggerValidation: boolean
) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (!triggerValidation) return; // Chỉ chạy validate khi triggerValidation là true

    const validate = () => {
      const newErrors: Record<string, string> = {};

      for (const key in validationRules) {
        const value = values[key] || "";
        const rules = validationRules[key];

        if (rules.required && !value) {
          newErrors[key] = `${key} is required.`;
        } else if (value) {
          if (rules.pattern && !rules.pattern.test(value)) {
            newErrors[key] = `${key} is invalid.`;
          } else if (rules.minLength && value.length < rules.minLength) {
            newErrors[key] =
              `${key} must be at least ${rules.minLength} characters.`;
          }
        }
      }

      setErrors(newErrors);
      setIsValid(Object.keys(newErrors).length === 0);
    };

    validate();
  }, [values, validationRules, triggerValidation]);

  return { errors, isValid };
};

export default useValidation;
