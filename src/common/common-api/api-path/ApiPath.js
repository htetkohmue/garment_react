export default {
  defaultPerPage: 30,
  getTailorData: 'api/tailor-list/search-tailor',
  deleteTailorData: 'api/tailor-list/delete-tailor',
  storeTailorData: 'api/tailor-register/register-tailor',
  editTailorData: 'api/tailor-register/edit-tailor',
  updateTailorData: 'api/tailor-register/update-tailor',

  // Raws
  storeRaws: 'api/raws/raw-register',
  searchRaws: 'api/raws/raw-search',
  DeleteRaws: 'api/raws/raw-delete',
  EditRaws: `api/raws/raw-edit`,
  UpdateRaws: `api/raws/raw-update`,

  storeSupplierData: 'api/supplier/create',
  getSupplierData: 'api/supplier/retrieve',
  editSupplierData: 'api/supplier/update',
  removeSupplierData: 'api/supplier/delete',

  // Supplier Transaction List
  searchSupplierTransaction : 'api/supplier-transaction-list/search-supplier-transaction',

  // ProductInList
  searchTailor: 'api/product-in-list/searchTailor',
  searchTailorByID: 'api/product-in-list/searchTailorByID',
  searchProductIn: 'api/product-in-list/search-product',

  // Customer
  getTownship:  'api/township/getTownship',
  storeTownship:  'api/township/storeTownship',

  // Customer
  storeCustomer: 'api/customer/storeCustomer',
  getCustomerId:  'api/customer/getCustomerId',
  getCustomerList: 'api/customer/getCustomerList',
  getAllCustomerId: 'api/customer/getAllCustomerId',
  editCustomerData: 'api/customer/editCustomer',
  deleteCustomer: 'api/customer/deleteCustomer',

};
