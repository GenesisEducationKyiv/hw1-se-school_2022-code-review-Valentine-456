const subscribeValidationSchema = {
    schema: {
        body: {
            type: 'object',
            required: ['email'],
            properties: {
                'email': {
                    type: "string",
                    nullable: false,
                    pattern: "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
                }
            }
        },
    }, attachValidation: true
}

interface ISubscribeBody {
    email: string
} 

export {
    subscribeValidationSchema,
    ISubscribeBody
}