const {body} = require("express-validator")

const userCreateValidation = () => {
    return [
    body("name")//verifica se o campo "name" foi preenchido e posui mais de 3 caracteres, caso contrario, exiba a mensagem
        .isString()
        .withMessage("O nome é obrigatório.") 
        .isLength({min: 3})
        .withMessage("O nome precisa ter no minimo 3 caracteres."),
    body("email")//verifica se o campo "email" foi preenchido e se é um email valido
        .isString()
        .withMessage("O email é obrigatório.")
        .isEmail()
        .withMessage("Insira um email válido."),
    body("password")//verifica se o campo "senha" foi preenchido e se possui mais de 5 caracteres, caso contraio, exiba a mensagem
        .isString()
        .withMessage("A senha é obrigatória.")
        .isLength({min: 5})
        .withMessage("A senha precisa ter no minimo 5 caracteres."),
    body("confirmpassword")
        .isString()
        .withMessage("A confirmação de senha é obrigatória.")
        .custom((value, {req}) => {//verifica se as senhas são iguais
            if(value != req.body.password){//se as senhas não forem iguais...
                throw new Error("As senhas não são iguais.")
            }
            return true //caso caia no resultado esperado
        } )
    ]
}
    
    module.exports = {
    userCreateValidation,
}