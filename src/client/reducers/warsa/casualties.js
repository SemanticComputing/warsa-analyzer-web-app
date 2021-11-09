import { handleDataFetchingAction } from '../general/results'

export const INITIAL_STATE = {
  results: null,
  resultUpdateID: 0,
  resultsSparqlQuery: null,
  paginatedResults: [],
  paginatedResultsSparqlQuery: null,
  resultCount: 0,
  page: -1,
  pagesize: 50,
  sortBy: null,
  sortDirection: null,
  fetching: false,
  fetchingResultCount: false,
  fetchingInstanceAnalysisData: false,
  facetedSearchHeaderExpanded: false,
  instancePageHeaderExpanded: false,
  instanceTableData: null,
  instanceTableExternalData: null,
  instanceAnalysisData: null,
  instanceAnalysisDataUpdateID: 0,
  instanceSparqlQuery: null,
  maps: {
    casualtiesByMunicipality: {
      center: [65.184809, 27.314050],
      zoom: 4
    }
  },
  properties: [
    {
      id: 'uri',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      onlyOnInstancePage: true
    },
    {
      id: 'prefLabel',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'rank',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'deathTimeTimespan',
      valueType: 'object',
      makeLink: false,
      externalLink: false,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'municipalityOfDomicile',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'municipalityOfDeath',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'occupation',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'perishingCategory',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'motherTongue',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'unit',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'gender',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    },
    {
      id: 'maritalStatus',
      valueType: 'object',
      makeLink: true,
      externalLink: true,
      sortValues: true,
      numberedList: false,
      minWidth: 250
    }
  ]
}

const resultClasses = new Set([
  'casualties',
  'hisclass5',
  'deathsByMonth',
  'deathsByMaritalStatus',
  'deathsByGender',
  'deathsByPerishingCategory',
  'deathsByMotherTongue',
  'deahsByGender',
  'deathsByNumberOfChildren',
  'deathsByAge',
  'deathsByMunicipality',
  'deathsByProvinceOfDomicile',
  'deathsByLineMonth',
  'deathsByProvinceOfDomicileRatio',
  'deathsByOfficerRatio',
  'deathsByRatioToAll',
  'deathsByRatioFromOfficers',
  'ageAverage',
  'deathsByRank',
  'deathsByPopulation'
])

const casualties = (state = INITIAL_STATE, action) => {
  if (resultClasses.has(action.resultClass)) {
    return handleDataFetchingAction(state, action, INITIAL_STATE)
  } else return state
}

export default casualties
