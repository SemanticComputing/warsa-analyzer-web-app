import { handleFacetConstrainSelfAction } from '../general/facetsConstrainSelf'

export const INITIAL_STATE = {
  updatedFacet: null,
  facetUpdateID: 0,
  updatedFilter: null,
  facets: {
    prefLabel: {
      id: 'prefLabel',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: null,
      sortDirection: null,
      sortButton: false,
      spatialFilterButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'one',
      filterType: 'textFilter',
      textFilter: null,
      priority: 1
    },
    deathTimeTimespan: {
      id: 'deathTimeTimespan',
      // predicate: defined in backend
      distinctValueCount: 0,
      values: [],
      flatValues: [],
      sortBy: null,
      sortDirection: null,
      sortButton: false,
      spatialFilterButton: false,
      isFetching: false,
      searchField: false,
      containerClass: 'three',
      filterType: 'dateFilter',
      min: '1939-01-01',
      max: '1945-12-31',
      timespanFilter: null,
      type: 'date'
    }
  }
}

const casualtiesFacetsConstrainself = (state = INITIAL_STATE, action) => {
  if (action.facetClass === 'casualties') {
    return handleFacetConstrainSelfAction(state, action, INITIAL_STATE)
  } else return state
}

export default casualtiesFacetsConstrainself
