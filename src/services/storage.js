class Storage {
    constructor(storageLocation) {
        this._storage = storageLocation;
    };

    get(item) {
        if (!arguments.length) {
            throw new Error('You have to indicate the key you want to recover');
        };
        
        return JSON.parse(this._storage.getItem(item)) || [];
    };

    set(key, value) {
        if(arguments.length < 2) {
            throw new Error('An argument is missing');
        };

        this._storage.setItem(key, JSON.stringify(value));
    };
    
    clear(){
        this._storage.clear();
    };
    
    setProperty(key, value, propertyName){
        const item = this.get(key);
        const newItem = {...item, [propertyName]: value};
        this.set(key, newItem);
    };
};

const storage = new Storage(localStorage);

export default storage;