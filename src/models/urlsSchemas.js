import Joi from "joi";

const urlSchema = Joi.object({
    url: Joi.string().uri().pattern(new RegExp('^(ht|f)tp(s?)\:\/\/[0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*(:(0-9)*)*(\/?)([a-zA-Z0-9\-\.\?\,\'\/\\\+&amp;%\$#_]*)?$')).required()
});

export {urlSchema};