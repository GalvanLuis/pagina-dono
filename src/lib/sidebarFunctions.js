const fs = require('fs');
const sidebarValids = require('./sidebarValidations');

/* JSON functions */

const readJSON = (path) => {
    let jsonText = fs.readFileSync(path);
    let jsonData = JSON.parse(jsonText);
    return jsonData;
};



/* Sidebar Functions */

/**
 * 
 * @param {string} path path of JSON file
 * @param {object} current_tab actual item to select
 * @returns sidebar object
 */
const readSidebar = (path, current_tab) => {
    let sidebarData = readJSON(path);
    for(let item in sidebarData){
        if(sidebarData.hasOwnProperty(item) && item == current_tab){
            sidebarData[item].active = "active";
        }
    }
    return sidebarData;
};

/**
 * Write in 'path' the JSON sidebar ('sidebar_data').
 * @param {string} path path of JSON file
 * @param {object} sidebar_data JSON sidebar
 * @returns null
 */
const saveSidebar = async (path, sidebar_data) => {
    return new Promise((resolve, reject) => {
        try{
            const jsonString = JSON.stringify(sidebar_data, null, 4);
            fs.writeFile(path, jsonString);
            resolve();
        } catch (error) {
            reject(error);
        }
    });
};

/**
 * Add new items to sidebar but does not write it in JSON file.
 * @param {object} sidebar_data JSON sidebar
 * @param {object} object_data {item1: {param1: data, param2: data, ...}, item2: {param1: data, param2: data, ...}}
 * @returns sidebar_data object
 */
const addSidebarItems = async (sidebar_data, object_data) => {
    const validItemsDupTask = sidebarValids.validateSidebarItemDuplication(sidebar_data, object_data);
    const validParamsTypeTask = sidebarValids.validateSidebarItemsParametersType(object_data);
    await validItemsDupTask.catch((error) => {throw error});
    await validParamsTypeTask.catch((error) => {throw error});

    for(let item in object_data){
        sidebar_data[item] = object_data[item];
    }
    return sidebar_data;
};

/**
 * Replace all params of items but does not write it in JSON file
 * @param {object} sidebar_data JSON sidebar
 * @param {object} object_data {item1: {param1: data, param2: data, ...}, item2: {param1: data, param2: data, ...}}
 * @returns sidebar_data object
 */
const updateSidebarItems = async (sidebar_data, object_data) => {
    const validItemsExsTask = sidebarValids.validateSidebarItemExistence(sidebar_data, object_data);
    const validParamsTypeTask = sidebarValids.validateSidebarItemsParametersType(object_data); //check if default params are correct type

    await validItemsExsTask.catch((error) => {throw error});
    await validParamsTypeTask.catch((error) => {throw error});

    for(let item in object_data){
        sidebar_data[item] = object_data[item];
    }
    return sidebar_data;
};

/**
 * Add new parameters of items to sidebar but does not write it in JSON file.
 * @param {object} sidebar_data JSON sidebar
 * @param {object} object_data {item1: {param1: data, param2: data, ...}, item2: {param1: data, param2: data, ...}}
 * @returns sidebar_data object
 */
const addSidebarItemsParameters = async (sidebar_data, object_data) => {
    const validItemsExsTask = sidebarValids.validateSidebarItemExistence(sidebar_data, object_data);
    const validParamsDupTask = sidebarValids.validateSidebarItemsParametersDuplication(sidebar_data, object_data);
    //const validParamsTypeTask = validateSidebarItemsParametersType(object_data);
    await validItemsExsTask.catch((error) => {throw error});
    await validParamsDupTask.catch((error) => {throw error});
    //await validParamsTypeTask.catch((error) => {throw error});

    for(let item in object_data){
        for(let param in object_data[item]){
            sidebar_data[item][param] = object_data[item][param];
        }
    }
    return sidebar_data;
};

/**
 * Update a existence params of items but does not write it in JSON file
 * @param {object} sidebar_data JSON sidebar
 * @param {object} object_data {item1: {param1: data, param2: data, ...}, item2: {param1: data, param2: data, ...}}
 * @returns sidebar_data object
 */
const updateSidebarItemsParameters = async (sidebar_data, object_data) => {
    const validItemsExsTask = sidebarValids.validateSidebarItemExistence(sidebar_data, object_data);
    const validParamsExsTask = sidebarValids.validateSidebarItemsParametersExistence(object_data);
    const validParamsTypeTask = sidebarValids.validateSidebarItemsParametersType(object_data); //check if default params are correct type

    await validItemsExsTask.catch((error) => {throw error});
    await validParamsExsTask.catch((error) => {throw error});
    await validParamsTypeTask.catch((error) => {throw error});

    for(let item in object_data){
        for(let param in object_data){
            sidebar_data[item][param] = object_data[item][param];
        }
        sidebar_data[item] = object_data[item];
    }

    return sidebar_data;
};


module.exports = {
    readJSON,
    readSidebar,
    saveSidebar,
    addSidebarItems,
    updateSidebarItems,
    addSidebarItemsParameters,
    updateSidebarItemsParameters
};