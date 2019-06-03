import Maintenance from "../model";

Maintenance.extend({
  meteorMethods:{
    async create(documentObject){
      const document = new Maintenance(documentObject);

      await document.save()
    },

    async delete(id){
      await Maintenance.remove(id)
    }
  }
});