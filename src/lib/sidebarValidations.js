const {DEFAULT_SIDEBAR_PARAMS} = require('../config');
const {
    DuplicateItemError,
    DuplicateItemParameterError,
    ItemNotFoundError,
    ItemParameterNotFound,
    InvalidTypeError
} = require('./errors');


/* Sidebar Validations */

const validateSidebarItemExistence = async (sidebar_data, object_data) => {
    return new Promise((resolve, reject) => {
        for(let item in object_data){
            if(!(item in sidebar_data)) reject(new ItemNotFoundError("item \"" + name_item + "\" does not exist")); 
        }
    });
};

const validateSidebarItemDuplication = async (sidebar_data, object_data) => {
    return new Promise((resolve, reject) => {
        for(let item in object_data){
            if(item in sidebar_data) reject(new DuplicateItemError("item \"" + item + "\" already exist"));
        }
    });
};

const validateSidebarItemsParametersType = async (object_data) => {
    return new Promise((resolve, reject) => {
        for(let item in object_data){
            /** validate if 'item' is same typeof DEFAULT_SIDEBAR_PARAMS */
            if(typeof item != DEFAULT_SIDEBAR_PARAMS.item) 
                reject(new InvalidTypeError("name of new item must be a \"" + DEFAULT_SIDEBAR_PARAMS.item + "\" not \"" + typeof item + "\""));
    
            for(let param in DEFAULT_SIDEBAR_PARAMS[item]){
                if(object_data[item][param] != typeof param)
                    reject(new InvalidTypeError(param + " of new item must be a \"" + typeof param + "\" not \"" + typeof object_data[item][param] + "\""));
            }
        }
    });
};

const validateSidebarItemsParametersExistence = async (sidebar_data, object_data) => {
    return new Promise((resolve, reject) => {
        for(let item in object_data){
            for(let param in object_data[item]){
                if(!(param in sidebar_data[item])) reject(new ItemParameterNotFound("item parameter \"" + param + "\" does not exist"));
            }
        }
    });
};

const validateSidebarItemsParametersDuplication = async (sidebar_data, object_data) => {
    return new Promise((resolve, reject) => {
        for(let item in object_data){
            for(let param in object_data[item]){
                if(param in sidebar_data[item]) reject(new DuplicateItemParameterError("item parameter \"" + param + "\" already exist"));
            }
        }
    });
};


module.exports = {
    validateSidebarItemExistence,
    validateSidebarItemDuplication,
    validateSidebarItemsParametersType,
    validateSidebarItemsParametersExistence,
    validateSidebarItemsParametersDuplication
};