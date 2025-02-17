export const BASE_URL = 'http://dmcelroy-dev.dhcp.tripadvisor.com/ItineraryGateway2/tyto/v1'
export const AWS_LAMBDA_BASE_URL = 'https://7s5x600laa.execute-api.us-east-1.amazonaws.com/default'

export const GET_ITINERARY_API = BASE_URL + '/itinerary'
export const GET_ITEM_INFO_API = BASE_URL + '/info'

export const SEARCH_HOTELS_API = AWS_LAMBDA_BASE_URL + '/hotels';
export const SEARCH_RESTAURANTS_API = AWS_LAMBDA_BASE_URL + '/restaurants';
export const SEARCH_EXPERIENCES_API = AWS_LAMBDA_BASE_URL + '/attractionsTopPicks';

export const GET_GEO_LIST_API = AWS_LAMBDA_BASE_URL + '/geoList'
