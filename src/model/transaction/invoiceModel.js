// HOW TO IMPORT ?
// const Convert = require('location/invoiceModel.js'); 
// OR
// import Convert from 'location/invoiceModel.js'
// HOW TO USE?
// FOR OBJECT
// const data = Convert.objectOfinvoiceModel(data)
// FOR ARRAY
// const data = Convert.listOfinvoiceModel(data)
const modelOfDatainvoiceModel = {
	id_pelanggan: '',
	id_mitra: null,
	tanggal_invoice: '',
	tanggal_batas_akhir: '',
	periode_bulan: 0,
	total_tagihan: 0,
	status: '',
	created_date: '',
	no_invoice: '',
	id_order: '',
	id: '',
	periode_tahun: 0,
	note: '',
	deleted: false
};
function listOfinvoiceModel(data = []) {
  var listData = [modelOfDatainvoiceModel];
  listData = [];
  try {
    data.map((val) => {
      var object = {
				id_pelanggan: val.id_pelanggan ?? null,
				id_mitra: val.id_mitra ?? null,
				tanggal_invoice: val.tanggal_invoice ?? null,
				tanggal_batas_akhir: val.tanggal_batas_akhir ?? null,
				periode_bulan: val.periode_bulan ?? null,
				total_tagihan: val.total_tagihan ?? null,
				status: val.status ?? null,
				created_date: val.created_date ?? null,
				no_invoice: val.no_invoice ?? null,
				id_order: val.id_order ?? null,
				id: val.id ?? null,
				periode_tahun: val.periode_tahun ?? null,
				note: val.note ?? null,
				deleted: val.deleted ?? null
      };
      listData.push(object);
    });
  } catch (error) {
    console.log(error.message);
  }
  return listData;
}
function objectOfinvoiceModel(data = null) {
  var objectData = modelOfDatainvoiceModel;
  if (data == null) {
    return null;
  }
  try {
		objectData.id_pelanggan = data.id_pelanggan ?? null;
		objectData.id_mitra = data.id_mitra ?? null;
		objectData.tanggal_invoice = data.tanggal_invoice ?? null;
		objectData.tanggal_batas_akhir = data.tanggal_batas_akhir ?? null;
		objectData.periode_bulan = data.periode_bulan ?? null;
		objectData.total_tagihan = data.total_tagihan ?? null;
		objectData.status = data.status ?? null;
		objectData.created_date = data.created_date ?? null;
		objectData.no_invoice = data.no_invoice ?? null;
		objectData.id_order = data.id_order ?? null;
		objectData.id = data.id ?? null;
		objectData.periode_tahun = data.periode_tahun ?? null;
		objectData.note = data.note ?? null;
		objectData.deleted = data.deleted ?? null;
  } catch (error) {
    console.log(error.message);
  }
  return objectData;
}
module.exports = {
  listOfinvoiceModel: listOfinvoiceModel,
  objectOfinvoiceModel: objectOfinvoiceModel,
};




  