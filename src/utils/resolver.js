import React, { useCallback } from 'react';
import * as yup from "yup";

const useYupValidationResolver = validationSchema =>
useCallback(
    async data => {
        try {
            const values = await validationSchema.validate(data, {
                abortEarly: false
            });

            return {
                values,
                errors: {}
            };
        } catch (errors) {
            return {
                values: {},
                errors: errors.inner.reduce(
                (allErrors, currentError) => ({
                    ...allErrors,
                    [currentError.path]: {
                    type: currentError.type ?? "validation",
                    message: currentError.message
                    }
                }),
                {}
                )
            };
        }
    },
    [validationSchema]
);

const useValidationSchema = (objectSchema = {}) => {
    let schema = yup.object(objectSchema);
    return useYupValidationResolver(schema);
}

export default useValidationSchema;