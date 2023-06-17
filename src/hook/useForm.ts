import { ChangeEvent, FormEvent, useState } from 'react';

interface Validation {
  required?: {
    value: boolean;
    message: string;
  };
  pattern?: {
    value: string;
    message: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message: string;
  };
}

type ErrorRecord<T> = Partial<Record<keyof T, string>>;

type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: (data : T) => void;
}) => {
  const [data, setData] = useState<T>((options?.initialValues || {}) as T)
  const [errors, setErrors] = useState<ErrorRecord<T>>({})
  const [isDisabled, setIsDisabled] = useState<boolean>(false)

  const handleChange = <S extends unknown>(
    key: keyof T,
    sanitizeFn?: (value: string) => S
  ) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value

    const validations = options?.validations

    if (validations) {
      let valid = true
      const value = e.target.value
      const newErrors: ErrorRecord<T> = {}
      const validation = validations[key]

      const pattern = validation?.pattern
      if (pattern?.value && !RegExp(pattern.value).test(value)) {
        valid = false
        newErrors[key] = pattern.message
      }

      const custom = validation?.custom
      if (custom?.isValid && !custom.isValid(value)) {
        valid = false
        newErrors[key] = custom.message
      }

      if (validation?.required?.value && !value) {
        valid = false;
        newErrors[key] = validation?.required?.message;
      }

      if (!valid) {
        setErrors(newErrors)
        setIsDisabled(true)
      } else {
        setErrors({})
        setIsDisabled(false)
      }
    }

    setData({
      ...data,
      [key]: value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (options?.onSubmit) {
      options.onSubmit(data)
    }
  }

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
    isDisabled
  }
}