const BASE_PATH = "https://demo2.salesgovisits.com/";

const ENDPOINTS = {
    trends: BASE_PATH + "wapi/1/trends",
    visit_type_contribution: BASE_PATH + "wapi/1/visit_type_contribution",
    note_type_contribution: BASE_PATH + "wapi/1/note_type_contribution",
    user_wise_count: BASE_PATH + "wapi/1/visittrends",
    account_touch_base: BASE_PATH + "wapi/1/accounttouchbase",
    visit_map: BASE_PATH + "wapi/1/visits_map",
    my_data: BASE_PATH + "wapi/1/mydata",
    get_subordinates: BASE_PATH + "wapi/1/usersubordinates",
    get_activity: BASE_PATH + "wapi/1/myactivity",
    get_account: BASE_PATH + "wapi/1/manageaccount",
    login: BASE_PATH + "wapi/1/wlogin",
    update_visit: BASE_PATH + "wapi/1/web_visit",
    my_team_report: BASE_PATH + "wapi/1/myteam_report",
    my_team_account: BASE_PATH + "wapi/1/subordinate_accounts",
    next_visit: BASE_PATH + "wapi/1/web_next_visit"
}

export default ENDPOINTS;
