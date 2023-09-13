const Validate = {
    isBoolean(value) {
        if (typeof value !== 'boolean') {
            throw new Error(`Invalid value: ${value}
            Expected a boolean.`);
        }
        return true
    },
    isString(value) {
        if (typeof value !== 'string') {
            throw new Error(`Invalid value: ${value}
            Expected a string.`);
        }
        return true
    },
    matchesAllPatterns(value, ...patterns) {
        for (let pattern of patterns) {
            if (!pattern.test(value)) {
                throw new Error(`Invalid value: ${value}
            Expected to match ${pattern}.`);
            }
        }
        return true
    },
    matchesAnyPattern(value, ...patterns) {
        if (!patterns.any(pattern => pattern.test(value))) {
            throw new Error(`Invalid value: ${value}
            Expected to match ${pattern}.`);
        }
        return true
    },
    isArray(value) {
        if (!Array.isArray(value)) {
            throw new Error(`Invalid value: ${value}
            Expected an array.`);
        }
        return true
    },
    valuesAreIndices(value) {
        if (!value.every(item => Number.isInteger(item) && item >= 0)) {
            throw new Error(`Invalid values: ${value}
            Expected an array of non-negative integers.`);
        }
        return true
    },
    isObject(value) {
        if (typeof value !== 'object') {
            throw new Error(`Invalid value: ${value}
            Expected an object.`);
        }
        return true
    }
}


function validateAndNormalizeConfig(userConfig, defaultConfig, validationObject) {
    // Check for extra properties in userConfig
    for (const prop in userConfig) {
        if (!(prop in defaultConfig)) {
            throw new Error(`Invalid property "${prop}" in configuration object.`);
        }
    }
    // Create a new configuration object by merging userConfig with defaultConfig
    const mergedConfig = { ...defaultConfig, ...userConfig };

    function validateProperty(value, validators) {
        for (const validator of validators) {
            validator(prop, value);
        }
    }

    function validateProperties(userConfig, validationObject) {
        for (const [prop, value] of Object.entries(object1)) {
            const validators = validationObject[prop]
            if (typeof value === 'object' && validators) {
                validateProperties(value, validators);
            } else if (validators) {
                validateProperty(value, validators);
            }
        }
    }

    validateProperties(mergedConfig, validationObject);

    // Return the validated and normalized configuration object
    return mergedConfig;
}

// Validation object
const validationObject = {
    active: [Validate.isString],
    grow: [Validate.isString, Validate.matchesAnyPattern, /^\s*(up|down|left|right)\s*$/],
    width: [Validate.isString, Validate.matchesAnyPattern, /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/, /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/, /^\s*expand\s*$/, /^\s*fit\s*$/],
    height: [Validate.isString, Validate.matchesAnyPattern, /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/, /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/, /^\s*expand\s*$/, /^\s*fit\s*$/],
    padding: {
        sibling: [Validate.isString, Validate.matchesAnyPattern, /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/, /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/],
        parent: [Validate.isString, Validate.matchesAnyPattern, /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/, /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/],
    },
    allowIntersect: [Validate.isBoolean],
    pivot: {
        horizontal: [Validate.isString, Validate.matchesAnyPattern, /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/, /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/],
        vertical: [Validate.isString, Validate.matchesAnyPattern, /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/, /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/],
    },
    guideBehavior: {
        insert: {
            reverseDirection: [Validate.isBoolean],
            startOffset: [Validate.isString, Validate.matchesAnyPattern, /^\s*[-+]?\s*([1-9]\d*|0)\s*(px)?\s*$/, /^\s*((0|[1-9]|[1-9]\d)(.\d+)?|100(.0+))\s*\%\s*$/],
        },
        break: {
            before: [Validate.isBoolean],
            after: [Validate.isBoolean],
        },
        keepWith: {
            previous: [Validate.isBoolean],
            next: [Validate.isBoolean],
        },
        breakChildrenBeforeSelf: [Validate.isBoolean],
    },
};

// Example usage:
const userConfig = {
    active: true,
    grow: 'up',
    width: '50%',
    height: 'fit',
    padding: {
        sibling: '10px',
    },
    extraProperty: 'extraValue', // This should trigger an error
};

try {
    const validatedConfig = validateAndNormalizeConfig(userConfig, {}, validationObject);
    console.log(validatedConfig);
} catch (error) {
    console.error(error.message);
}
