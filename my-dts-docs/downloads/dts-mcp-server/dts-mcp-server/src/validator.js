/**
 * Validate API call parameters against documented method signatures.
 */

function validateParams(methodDoc, providedParams) {
    const errors = [];
    const warnings = [];

    if (!methodDoc || !methodDoc.params || methodDoc.params.length === 0) {
        return { valid: true, errors: [], warnings: [] };
    }

    // Check required top-level params
    for (const p of methodDoc.params) {
        if (p.required && p.name !== 'fn') {
            if (providedParams[p.name] === undefined || providedParams[p.name] === null) {
                errors.push(`Missing required parameter: "${p.name}" (${p.type})`);
            }
        }
    }

    // Check nested properties for data/object params
    const dataParam = methodDoc.params.find(p => p.name === 'data');
    if (dataParam && dataParam.properties && dataParam.properties.length > 0) {
        const data = providedParams.data;
        if (data) {
            const items = Array.isArray(data) ? data : [data];
            for (let i = 0; i < items.length; i++) {
                const item = items[i];
                const prefix = Array.isArray(data) ? `data[${i}].` : 'data.';
                for (const prop of dataParam.properties) {
                    if (prop.required && (item[prop.name] === undefined || item[prop.name] === null)) {
                        errors.push(
                            `Missing required property: "${prefix}${prop.name}" (${prop.type}) — ${prop.description}`
                        );
                    }
                }
            }
        }
    }

    return { valid: errors.length === 0, errors, warnings };
}

function getRequiredParams(methodDoc) {
    const required = [];
    for (const p of methodDoc.params) {
        if (p.name === 'fn') continue;
        if (p.required) {
            if (p.properties && p.properties.length > 0) {
                const reqProps = p.properties
                    .filter(pp => pp.required)
                    .map(pp => ({ name: pp.name, type: pp.type, description: pp.description }));
                required.push({
                    name: p.name,
                    type: p.type,
                    description: p.description,
                    requiredProperties: reqProps,
                    isComplex: true,
                });
            } else {
                required.push({ name: p.name, type: p.type, description: p.description });
            }
        }
    }
    return required;
}

function getSmartDefaults(methodDoc, _context = {}) {
    const defaults = {};
    const dataParam = methodDoc.params.find(p => p.name === 'data');
    if (dataParam && dataParam.properties) {
        const dataDefaults = {};
        for (const prop of dataParam.properties) {
            if (!prop.required && prop.default) {
                dataDefaults[prop.name] = parseDefaultValue(prop.default, prop.type);
            }
        }
        if (Object.keys(dataDefaults).length > 0) {
            defaults.data = dataDefaults;
        }
    }
    return defaults;
}

function parseDefaultValue(raw, type) {
    // Clean Chinese suffixes from default values
    const clean = raw.replace(/[。，].*$/, '').trim();
    if (clean === 'true') return true;
    if (clean === 'false') return false;
    if (/^-?\d+(\.\d+)?$/.test(clean)) return Number(clean);
    // Try JSON parse for arrays/objects
    if (/^\[.*\]$/.test(clean) || /^\{.*\}$/.test(clean)) {
        try { return JSON.parse(clean); } catch (_) { /* fall through */ }
    }
    // Color enumeration values — return as-is
    if (/Color\./.test(clean)) return clean;
    return clean;
}

module.exports = { validateParams, getRequiredParams, getSmartDefaults };
