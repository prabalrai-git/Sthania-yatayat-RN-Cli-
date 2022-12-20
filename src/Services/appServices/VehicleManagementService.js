import {
  CancelAssignedRouteOfVehicleByAdmin,
  GetActiveVehicleListByCompanyId,
  GetCompanyDetails,
  GetCounterDetails,
  GetReservationDetailsByDate,
  GetReservationDetailsByRIds,
  GetRouteDetailsByCompanyIds,
  GetRouteDetailsByDateWise,
  GetStaffDetailsByVehicleId,
  GetVehicleDetailsByVId,
  GetVehicleRouteDetailsByReceiptId,
  InsertUpdateDayWiseVehicleRoute,
  InsertUpdateReserveDetails,
} from '../constants/url';
import { generateUrlEncodedData } from '../utils/generateUrlEncodedData';
import { store, fetch } from '../utils/httpUtil';

export const GetActiveVehicleList = (data, successCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `${GetActiveVehicleListByCompanyId}?companyid=${data}`,
      );
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const GetActiveVehicleRoute = (data, successCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetRouteDetailsByCompanyIds}?companyid=${data}`);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const InsertUpdateDayWiseVehicleRoutes = (data, successCallback) => {
  return async dispatch => {
    let formData = generateUrlEncodedData(data);
    try {
      const response = await store(
        `${InsertUpdateDayWiseVehicleRoute}`,
        formData,
      );
      if (response?.status === 200) {
        // fghgfghjgfghj
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const GetVehicleDetailsByyVId = (data, successCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `${GetVehicleDetailsByVId}?vehicleId=${data}`,
      );
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const GetCompanyDetail = successCallback => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetCompanyDetails}`);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const GetStaffDetailsByVehicleIdd = (data, successCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `${GetStaffDetailsByVehicleId}?vehicleId=${data}`,
      );
      if (response?.status === 200) {
        successCallback(response?.data);
      } else successCallback([]);
    } catch (error) { }
  };
};

export const GetRouteDetailsByDateWisee = (data, successCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `${GetRouteDetailsByDateWise}?routeday=${data}`,
      );
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) { }
  };
};
export const GetVehicleRouteDetailsByyReceiptId = (data, successCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `${GetVehicleRouteDetailsByReceiptId}?receiptId=${data}`,
      );
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) { }
  };
};

export const CancelAssignedRouteOfVehicle = (data, successCallback) => {
  // console.log('cancel route', data);
  return async dispatch => {
    try {
      const response = await store(
        `${CancelAssignedRouteOfVehicleByAdmin}?vehicleid=${data.vehicleid}&receiptid=${data.receiptid}&remarks=${data.remarks}`,
      );
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const GetCounterDetail = successCallback => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetCounterDetails}`);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) { }
  };
};

// GetReservationDetailsByDate
export const GetReservationDetailsByDatee = (data, successCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(
        `${GetReservationDetailsByDate}?fromdate=${data.fromdate}&todate=${data.todate}`,
      );
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) { }
  };
};

// InsertUpdateReserveDetails

export const InsertUpdateReserveDetail = (data, successCallback) => {
  return async dispatch => {
    let formData = generateUrlEncodedData(data);
    try {
      const response = await store(`${InsertUpdateReserveDetails}`, formData);
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) { }
  };
};

export const GetReservationDetailsByRId = (data, successCallback) => {
  return async dispatch => {
    try {
      const response = await fetch(`${GetReservationDetailsByRIds}?rId=${data}`)
      if (response?.status === 200) {
        successCallback(response?.data);
      } else {
        successCallback([]);
      }
    } catch (error) {

    }
  }
}