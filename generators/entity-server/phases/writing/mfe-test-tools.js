const casual = require('casual');

function getFieldType({ fieldType, fieldIsEnum, fieldTypeBlobContent }) {
    if (
        ['String', 'Integer', 'Long', 'Float', 'Double', 'BigDecimal', 'LocalDate', 'Instant', 'ZonedDateTime', 'Boolean'].includes(
            fieldType
        )
    ) {
        return fieldType;
    }

    // Eunmerations
    if (fieldIsEnum) {
        return 'Enum';
    }

    // Blobs
    if (fieldType === 'byte[]' && fieldTypeBlobContent) {
        if (fieldTypeBlobContent === 'image') {
            return 'ImageBlob';
        }
        if (fieldTypeBlobContent === 'any') {
            return 'BinaryFileBlob';
        }
        if (fieldTypeBlobContent === 'text') {
            return 'TextBlob';
        }
    }

    // default
    return fieldType;
}


function getGeneratedValue(fieldType, { fieldValues }) {
    switch (fieldType) {
        case 'String':
            return casual.text;
        case 'Integer':
            return casual.integer();
        case 'Long':
            return casual.integer();
        case 'Float':
            return casual.random;
        case 'Double':
            return casual.double();
        case 'BigDecimal':
            return casual.integer();
        case 'LocalDate':
            return casual.date('YYYY-MM-DD');
        case 'Instant':
        case 'ZonedDateTime':
            return casual.moment.format();
        case 'Boolean':
            return casual.coin_flip;
        case 'Enum': {
            const enumValues = fieldValues.split(',');
            return enumValues[Math.floor(Math.random() * enumValues.length)];
        }
        case 'ImageBlob':
        case 'BinaryFileBlob':
        case 'TextBlob':
            return 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+A8AAQUBAScY42YAAAAASUVORK5CYII=';
        default:
            return casual.text;
    }
}

function getMockData(fields, count) {
    return Array.from(
        {length: count},
        (value, index) => {
            return fields.reduce(
                (acc, field) => {
                    const fieldType = getFieldType(field);
                    const fieldValue = getGeneratedValue(fieldType, field);
                    return { ...acc, [field.fieldName]: fieldValue };
                },
                { id: index }
            );
        }
    );
}

module.exports = {
    getMockData,
};
