/**
 * Created by fanatik on 4/25/17.
 */

var fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/teldas');

var initSchema = mongoose.Schema({
    empty: String,
    title: String,
    wo_id: String,
    con_type: String,
    sub_nr1: String,
    sub_nr2: String,
    sub_nr3: String,
    sub_nr4: String,
    sub_nr5: String,
    sub_nr6: String,
    sub_nr7: String,
    sub_nr8: String,
    sub_nr9: String,
    sub_nr10: String,
    family_name: String,
    forename: String,
    company_name: String,
    street: String,
    street_nr: String,
    city: String,
    post_co: String,
    po_box: String,
    poa_id: String,
    tsp_int_reference: String,
    recip_id: String,
    donor_id: String,
    acti_date: String,
    acti_time: String,
    wish_date: String,
    wish_time: String,
    reject: String,
    reject_com: String,
    poa_type: String,
    poa_date: String,
    partial_porting: String,
    comment: String,
    subscriber_language_id: String,
    recipient_brand_name: String,
    port_priority: String
});

var init = mongoose.model('init', initSchema);

var init1 = new init({
    "title": "INIT",
    "wo_id": "",
    "con_type": "001",
    "sub_nr1": "0219990011",
    "sub_nr2": "",
    "sub_nr3": "",
    "sub_nr4": "",
    "sub_nr5": "",
    "sub_nr6": "",
    "sub_nr7": "",
    "sub_nr8": "",
    "sub_nr9": "",
    "sub_nr10": "",
    "family_name": "Coel",
    "forename": "Oguz",
    "company_name": "",
    "street": "Sonnenbergstrasse",
    "street_nr": 9,
    "city": "Birsfelden",
    "post_co": "4127",
    "po_box": "",
    "poa_id": "",
    "tsp_int_reference": "ocoel",
    "recip_id": "",
    "donor_id": "99900",
    "acti_date": "",
    "acti_time": "",
    "wish_date": "20170607",
    "wish_time": "1000",
    "reject": "",
    "reject_com": "",
    "poa_type": "001",
    "poa_date": "20170215",
    "partial_porting": "N",
    "comment": "",
    "subscriber_language_id": "",
    "recipient_brand_name": "",
    "port_priority": ""

});


init1.save(function (err) {
    if(err) return console.error(err);

});

if(!initSchema.options.toObject) { initSchema.options.toObject = {}; }
initSchema.options.toObject.transform = function (doc, ret) {
    delete ret._id;
    return ret;
};

var initObject = init1.toObject();


var headerSchema = mongoose.Schema({
    title: String,
    tsp_id: String,
    filename: String,
    records: String
});

var header = mongoose.model('header', headerSchema);

var header1 = new header({
    "title": "HEADER",
    "tsp_id": "98078",
    "filename": "98078_000_20170410000001.upl",
    "records": "1"
});

header1.save(function (err) {
    if(err) return console.error(err);
});

if(!headerSchema.options.toObject) headerSchema.options.toObject = {};
headerSchema.options.toObject.transform = function (doc, ret) {
    delete ret._id;
    return ret;
};

var headerObject = header1.toObject();

var headerArray = [];
var initArray = [];

for(var i in headerObject){
    headerArray.push(headerObject[i]);
};

for(var i in initObject){
    initArray.push(initObject[i]);
};

var string = "";

for(var i = 0; i < headerArray.length; i++){
    string += (headerArray[i] + '\t');
};

string += '\n';

for(var i = 0; i < initArray.length; i++){
    string += (initArray[i] + '\t');
};

var queuePath = "../queue/" + header1.filename;
fs.writeFileSync(queuePath, string);




