export default class Scenario {
    constructor(components, definition, sems) {
        this.components = components;
        this.definition = definition;
        this.sems_ = sems;
    }
    
    getByName(componentName) {
        let id = parseInt(this.components["ID_" + componentName]);
        let configurations = this.definition[componentName];
        for (let config of configurations) {
            if (config["ID_" + componentName] === id) {
                return config;
            }
        }
        return null;
    }

    get Building() {
        return this.getByName("Building");
    }

    get Boiler() {
        return this.getByName("Boiler");
    }

    get Battery() {
        return this.getByName("Battery");
    }

    get PV() {
        return this.getByName("PV");
    }

    get HotWaterTank() {
        return this.getByName("HotWaterTank");
    }

    get sems() {
        return this.sems_;
    }
}