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
    }
  }
}

const municipalitiesFacetsConstrainself = (state = INITIAL_STATE, action) => {
  if (action.facetClass === 'municipalities') {
    return handleFacetConstrainSelfAction(state, action, INITIAL_STATE)
  } else return state
}

export default municipalitiesFacetsConstrainself
