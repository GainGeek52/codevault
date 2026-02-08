import { useState, useCallback } from 'react';

interface FormErrors {
    [key: string]: string;
}

interface UseFormOptions<T> {
    initialValues: T;
    validate?: (values: T) => FormErrors;
    onSubmit: (values: T) => void | Promise<void>;
}

/**
 * useForm Hook
 * 
 * A custom hook for form handling with validation.
 * Follows the pattern used by popular form libraries.
 * 
 * @example
 * const { values, errors, handleChange, handleSubmit, isSubmitting } = useForm({
 *   initialValues: { email: '', password: '' },
 *   validate: (values) => {
 *     const errors = {};
 *     if (!values.email) errors.email = 'Required';
 *     return errors;
 *   },
 *   onSubmit: async (values) => {
 *     await api.login(values);
 *   },
 * });
 */
export function useForm<T extends Record<string, any>>({
    initialValues,
    validate,
    onSubmit,
}: UseFormOptions<T>) {
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name, value } = e.target;
            setValues((prev) => ({ ...prev, [name]: value }));
            // Clear error when user types
            if (errors[name]) {
                setErrors((prev) => ({ ...prev, [name]: '' }));
            }
        },
        [errors]
    );

    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const { name } = e.target;
            setTouched((prev) => ({ ...prev, [name]: true }));
        },
        []
    );

    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            // Validate
            const validationErrors = validate ? validate(values) : {};
            setErrors(validationErrors);

            if (Object.keys(validationErrors).length > 0) {
                return;
            }

            // Submit
            setIsSubmitting(true);
            try {
                await onSubmit(values);
            } finally {
                setIsSubmitting(false);
            }
        },
        [values, validate, onSubmit]
    );

    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
    }, [initialValues]);

    const setValue = useCallback((name: keyof T, value: any) => {
        setValues((prev) => ({ ...prev, [name]: value }));
    }, []);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
        setValue,
    };
}
