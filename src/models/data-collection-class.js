'use strict';

/**
 * DataManger constructor 
 * @class
 * @constructor
 * @public
 */


class DataManager {
  constructor (model){
    this.model = model;
  }
  /**
       * read return the obj form the DB
       * @type {number}
       * @returns {Array}
       */
  read(id){
    if (id){
      return this.model.find({_id: id});
    } else {
        return this.model.find({});
    }

  }
  /**
       * create will sets the obj
       * @type {obj}
       * @returns {obj}
       */
  create (obj) {
    const doc = new this.model(obj);
    return doc.save();
  }
  /**
       * update obj 
       * @type {number}
       * @returns {obj}
       */
  update(id, obj){
    return this.model.findByIdAndUpdate(id, obj, {new: true});
  }
  /**
       * delete obj 
       * @type {number}
       * @returns {Array}
       */
  delete(id){
    return this.model.findByIdAndDelete(id);
  }
}
/**
 * @typedef {exports(model)} 
 */
module.exports = DataManager;