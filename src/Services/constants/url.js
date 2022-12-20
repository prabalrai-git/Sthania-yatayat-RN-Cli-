/**
 * @desc: api url
 */

//sthania yatayat
// const API_URL = `http://lunivacare.ddns.net/LunivaRouteAPI/`;

// pokhara yatayat
const API_URL = `http://lunivacare.ddns.net/LunivaRouteAPIUAT/`;

/**
 * @desc: api base url with route
 *
 */
export const BASE_URL = `${API_URL}LunivarouteManagementApi/`;

// Counter Service
/**
 * @desc: Insert Update Counter Details
 * @param: {
  "CId": 1,
  "CounterName": "sample string 2",
  "CounterLocation": "sample string 3",
  "EntryDate": "2022-06-13T11:17:04.4329176+05:45",
  "IsActive": true,
  "CompanyId": 6
  }
 */
export const InsertUpdateCounterDetails = 'InsertUpdateCounterDetails';

/**
 * @desc: get counter details
 */
export const GetCounterDetails = 'GetCounterDetails';
// Counter Service

//Vehicles Service
/**
 * @desc: InsertUpdateVehicleDetails 
 * @param: {
  "VId": 1,
  "VehicleNumber": "sample string 2",
  "VehicleType": 3,
  "CompanyId": 4,
  "EntryDate": "2022-06-13T11:54:34.5111413+05:45",
  "UserId": 6,
  "IsActive": true
  }
 */
export const InsertUpdateVehicleDetails = 'InsertUpdateVehicleDetails';

/**
 * @desc: Get Vehicle Details By VId
 * @param: ?vehicleId=0 (in url)
 */
export const GetVehicleDetailsByVId = 'GetVehicleDetailsByVId';
//Vehicles Service

/**
 * @desc: Get Vehicle Details by Vehicle id
 * @param: ?vehicleId=1
 */
export const InsertUpdateVehicleOwnerDetails =
  'InsertUpdateVehicleOwnerDetails';

/**
 * @desc: Get Vehicle Owner Details By Vehicle Id
 * @param: ?vehicleId=0 (in url)
 */
export const GetVehicleOwnerDetailsByVehicleId =
  'GetVehicleOwnerDetailsByVehicleId';
//Vehicle Owner Details

//Vehicle Staff Details
/**
 * @desc: Insert Update Vehicle Staff Details
 * @param: {
  "VsId": 1,
  "VehicleId": 2,
  "StaffName": "sample string 3",
  "StaffContactNumber": "sample string 4",
  "StaffTypeId": 5,
  "EntryDate": "2022-06-13T12:20:59.6294257+05:45",
  "UserId": 7,
  "IsActive": true,
  "CompanyId": 9,
  "Remarks": "sample string 10"
  }
 */
export const InsertUpdateVehicleStaffDetails =
  'InsertUpdateVehicleStaffDetails';

/**
 * @desc: Get Staff Details By VehicleId
 * @param: ?vehicleId=0 (in url)
 */
export const GetStaffDetailsByVehicleId = 'GetStaffDetailsByVehicleId';
//Vehicle Staff Details

//Route Details
/**
 * @desc: Insert Update Route Details
 * @param: {
  "DId": 1,
  "VehicleId": 2,
  "RouteId": 3,
  "EntryDate": "2022-06-13T12:26:21.8163383+05:45",
  "RouteDate": "2022-06-13T12:26:21.8163383+05:45",
  "CounterId": 6,
  "UserId": 7,
  "IsActive": true,
  "Remarks": "sample string 9",
  "CompanyId": 10,
  "ReceiptAmt": 11.0
  }
 */
export const InsertUpdateRouteDetails = 'InsertUpdateRouteDetails';

/**
 * @desc: get route details by datewise
 * @param:?routeday= //
 */
export const GetRouteDetailsByDateWise = 'GetRouteDetailsByDateWise';

/**
 * @desc: Get Vehiclewise Route Details By RouteId
 * @param: ?routeId=0 (in url)
 */
export const GetVehiclewiseRouteDetailsByRouteId =
  'GetVehiclewiseRouteDetailsByRouteId';
//Route Details

//User Details
/**
 * @desc: Insert Update User Details
 * @param: {
  "UId": 1,
  "UserFullName": "sample string 2",
  "UserName": "sample string 3",
  "UserPassword": "sample string 4",
  "UserContactNumber": "sample string 5",
  "UserEmail": "sample string 6",
  "RoleId": 7,
  "EntryDate": "2022-06-13T12:28:10.7791748+05:45",
  "UserId": 9,
  "IsActive": true,
  "CompanyId": 11
  }
 */
export const InsertUpdateUserDetails = 'InsertUpdateUserDetails';

/**
 * @desc: Get User Details
 */
export const GetUserDetails = 'GetUserDetails';
//User Details

//Misc Service
/**
 * @desc: Get Staff Type
 */
export const GetStaffType = 'GetStaffType';

/**
 * @desc: Get Role Details
 */
export const GetRoleDetails = 'GetRoleDetails';

/**
 * @desc: Get Company Details
 */
export const GetCompanyDetails = 'GetCompanyDetails';

/**
 * @desc: Get Datewise Collection Details
 * @param: ?fromdate={fromdate}&todate={todate} (in url)
 */
export const GetDatewiseCollectionDetails = 'GetDatewiseCollectionDetails';
//Misc Service

export const GetActiveVehicleListByCompanyId = `GetActiveVehicleListByCompanyId`;

/**
 * GetRouteDetailsByCompanyId?companyid={companyid}
 * @desc: Get Active Vehicle List By Company Id
 * @param: ?companyid={companyid}
 */


export const GetRouteDetailsByCompanyIds = 'GetRouteDetailsByCompanyId'

export const InsertUpdateDayWiseVehicleRoute = `InsertUpdateDayWiseVehicleRoute`;

/**
* @desc: Insert Update Daywise Vehicle Route
* @param: {
  "DId": 1,
  "VehicleId": 2,
  "RouteId": 3,
  "EntryDate": "2022-06-15T12:31:16.14082+05:45",
  "RouteDate": "2022-06-15T12:31:16.14082+05:45",
  "CounterId": 6,
  "UserId": 7,
  "IsActive": true,
  "Remarks": "sample string 9",
  "CompanyId": 10,
  "ReceiptAmt": 11.0,
  "NepaliDate": "sample string 12"
}
*/

export const GetVehicleRouteDetailsByReceiptId = `GetVehicleRouteDetailsByReceiptId`;

/**
 * @desc: Get Vehicle Route Details By Receipt Id
 * @param: ?receiptId={receiptId}
 */

export const CheckValidLogin = 'CheckValidLogin';

/**
 * @desc: Get valid login
 * @param: ?username={username}&password={password}
 */

export const CancelAssignedRouteOfVehicleByAdmin =
  'CancelAssignedRouteOfVehicleByAdmin';

/**
 * @desc: Cancel Assigned Route of vehicle by Admin
 * @param: ?vehicleid={vehicleid}&receiptid={receiptid}&remarks={remarks}
 */

// GetReservationDetailsByDate?fromdate={fromdate}&todate={todate}
export const GetReservationDetailsByDate = `GetReservationDetailsByDate`;

/**
 * @desc: Get reservation details by data
 * @param: ?fromdate={fromdate}&todate={todate}
 */

// InsertUpdateReserveDetails
export const InsertUpdateReserveDetails = `InsertUpdateReserveDetails`;

/**
* @desc: Insert Update Reserve Details
* @param: {
          "RId": 1,
          "VehicleId": 2,
          "ReserverLocation": "sample string 3",
          "ReservationDate": "2022-07-29T13:05:34.1919474+05:45",
          "ReserveNepaliDate": "sample string 5",
          "Charge": 6.0,
          "UserId": 7,
          "IsActive": true
        }
*/

export const GetReservationDetailsByRIds = `GetReservationDetailsByRId`;

// @desc: GetReservationDetailsByRId