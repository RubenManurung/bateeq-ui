import {inject, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {Service} from './service';
 
@inject(Router, Service)
export class DataForm { 
    @bindable data = {};
    @bindable error = {}; 
    
    storageApiUri = require('../host').inventory + '/storages';
    variantApiUri = require('../host').core + '/articles/variants'; 
    
    constructor(router, service) { 
        this.router = router;
        this.service = service;  
    }
     
    attached() {     
    } 
    
    addItem() {           
        var item = {};
        item.articleVariantId = '';
        this.data.items.push(item); 
    } 
    
    removeItem(item) { 
        var itemIndex = this.data.items.indexOf(item);
        this.data.items.splice(itemIndex, 1);
    }
     search() {  
        this.service.getEFRFKPBRDocByCode(this.data.reference)
            .then(dataOut=>{ 
                var dataOutFirst = dataOut[0];
                this.data.sourceId = dataOutFirst.sourceId
                this.data.destinationId = dataOutFirst.destinationId
                this.data.items = [];   
                for(var obj of dataOutFirst.items) {  
                    var item = {};
                    item.articleVariantId = obj.articleVariantId;
                    item.quantityOut = obj.quantity;
                    item.quantity = obj.quantity;
                    item.remark = obj.remark;
                    this.data.items.push(item); 
                }   
        })
        .catch(e=> { 
            alert('Referensi Keluar tidak ditemukan');
        }) 
    } 
}