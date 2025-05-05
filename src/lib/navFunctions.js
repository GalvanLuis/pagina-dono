const fs = require('fs');

const readJSON = (path) => {
    let jsonText = fs.readFileSync(path);
    let jsonData = JSON.parse(jsonText);
    return jsonData;
};


const readNavbar = (path) => {
    let navbarData = readJSON(path);
    return navbarData;
};


const saveNavbar = async (path, navbar_data) => {
    return new Promise((resolve, reject) => {
        try{
            const jsonString = JSON.stringify(navbar_data, null, 4);
            fs.writeFile(path, jsonString);
            resolve(true);
        } catch (error) {
            reject(error);
        }
    });
};


const addNavbarItems = async (navbar_data, object_data) => {
    //const validItemsDupTask = sidebarValids.validateSidebarItemDuplication(navbar_data, object_data);
    //const validParamsTypeTask = sidebarValids.validateSidebarItemsParametersType(object_data);
    //await validItemsDupTask.catch((error) => {throw error});
    //await validParamsTypeTask.catch((error) => {throw error});

    for(let item in object_data){
        navbar_data[nav_items][item] = object_data[item];
    }
    return navbar_data;
};


const updateNavbarItems = async (navbar_data, object_data) => {
    //const validItemsExsTask = sidebarValids.validateSidebarItemExistence(navbar_data, object_data);
    //const validParamsTypeTask = sidebarValids.validateSidebarItemsParametersType(object_data); //check if default params are correct type

    //await validItemsExsTask.catch((error) => {throw error});
    //await validParamsTypeTask.catch((error) => {throw error});

    for(let item in object_data){
        navbar_data[item] = object_data[item];
    }
    return navbar_data;
};


module.exports = {
    readNavbar,
    saveNavbar,
    addNavbarItems,
    updateNavbarItems
};