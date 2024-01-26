export default {
  defaultPerPage: 30,
  getTailorAll: 'api/tailor-list/getTailorAll',
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

    // Supplier Transaction
    storeSupplierTransaction : 'api/supplier-transaction/store-supplier-transaction',

  // Supplier Transaction List
  searchSupplierTransaction : 'api/supplier-transaction-list/search-supplier-transaction',
  deleteSupplierTransaction : 'api/supplier-transaction-list/delete-supplier-transaction', 

  // ProductInList
  searchTailor: 'api/product-in-list/searchTailor',
  searchTailorByID: 'api/product-in-list/searchTailorByID',
  searchProductIn: 'api/product-in-list/search-product',
  getProductNames: 'api/product-list/get-product-names',
  getProductNameByID: 'api/product-list/get-product-sizes-by-name',

  // Customer
  getTownship:  'api/township/getTownship',
  storeTownship:  'api/township/storeTownship',

  // size
  getSizes:  'api/sizes/getsizes',

  // category
  getCategories:  'api/categories/getCategory',

  // Customer
  storeCustomer: 'api/customer/storeCustomer',
  getCustomerId:  'api/customer/getCustomerId',
  getCustomerList: 'api/customer/getCustomerList',
  getAllCustomerId: 'api/customer/getAllCustomerId',
  editCustomerData: 'api/customer/editCustomer',
  updateCustomer: 'api/customer/updateCustomer',
  deleteCustomer: 'api/customer/deleteCustomer',

  storeCustomerTranction: 'api/customer-transaction-register/save',
  searchCustomerTranction: 'api/customer-transaction-list/search',
  editCustomerTranction: 'api/customer-transaction-list/edit',
  updateCustomerTranction: 'api/customer-transaction-register/update',
  deleteCustomerTranction: 'api/customer-transaction-list/destroy',

  // Product list
  getProductAll: 'api/product-in-list/getProductAll',

  // Product
  createProduct: 'api/product/create',
  createProductSize: 'api/product/createProductSize',

  // Product In 
  storeProductIn: 'api/product-in/store',
  editProductIn: 'api/product-in/edit',
  updateProductIn: 'api/product-in/update',
  destroyProductIn: 'api/product-in/destroy',

  // Tailor Raw
  createTailorRawTransaction: 'api/tailor-raw/createTailorRawTransaction',
  searchTailorRaw: 'api/tailor-raw/search',
  storeTailorRaw: 'api/tailor-raw/store',
  editTailorRaw: 'api/tailor-raw/edit',
  updateTailorRaw: 'api/tailor-raw/update',
  destroyTailorRaw: 'api/tailor-raw/destroy',

};
