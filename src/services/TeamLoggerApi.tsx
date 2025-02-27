import axios from "axios";

const API_BASE_URL = "https://api2.teamlogger.com/api"; // Replace with your API URL

const API_KEY = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vaGlwZXJyLmNvbSIsInN1YiI6IjA0OGU0NjgzNzkwMzQ3OThhODBhMDRhODAzNmFiNzk5IiwiYXVkIjoic2VydmVyIn0.f7-y5w7gY4G5X_peXnQjqCzyEUz9RTtp7C6ILo0cozg"
interface UserReportPayload {
    startTime: string;
    endTime: string;
    accountId: string;
  }
export const fetchAllLogerUsers = async () => {
  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/integration/list_users`,
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  };
  return axios.request(config)
};

export const getUserReport = async (payload:UserReportPayload) => {

  let {startTime, endTime, accountId} = payload

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/companies/c114181f0e8e4eaf93df3a01f9597a30/reports_new2?startTime=${startTime}&endTime=${endTime}&suppressDetails=false&accountId=${accountId}&includeTimelineEntries=true`,
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  };
  return axios.request(config)
}



export const getUserProductivity = async (payload:UserReportPayload) => {

  let {startTime, endTime, accountId} = payload

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: `${API_BASE_URL}/companies/c114181f0e8e4eaf93df3a01f9597a30/app_web_reports?startTime=${startTime}&endTime=${endTime}&suppressDetails=false&accountId=${accountId}&includeTimelineEntries=true`,
    headers: {
      'Authorization': `Bearer ${API_KEY}`
    }
  };
  return axios.request(config)
}


