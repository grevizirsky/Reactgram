const {validationResult} = require("express-validator")

const validate = (req, res, next) => {
    const errors = validationResult(req)//toda req que tiver middleware de validacao vai retornar possivei erros

    if(errors.isEmpty()) {
        return next()
    }

    const extractedErrors = []

    errors.array().map((err) => extractedErrors.push(err.msg))//coloca a mensagem dos erros na array extractedErrors

    return res.status(422).json({
        errors: extractedErrors
    })//retorna um array de objeto com as mensagens dos erros
}

module.exports = validade