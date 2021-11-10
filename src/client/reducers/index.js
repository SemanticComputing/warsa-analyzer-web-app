import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
// general reducers:
import error from './general/error'
import options from './general/options'
import animation from './general/animation'
import leafletMap from './general/leafletMap'
// portal spefic reducers:
import fullTextSearch from './sampo/fullTextSearch'
import clientSideFacetedSearch from './sampo/clientSideFacetedSearch'
import casualties from './warsa/casualties'
import casualtiesFacets from './warsa/casualtiesFacets'
import casualtiesFacetsConstrainSelf from './warsa/casualtiesFacetsConstrainSelf'
import municipalities from './warsa/municipalities'
import municipalitiesFacets from './warsa/municipalitiesFacets'
import municipalitiesFacetsConstrainSelf from './warsa/municipalitiesFacetsConstrainSelf'

const reducer = combineReducers({
  casualties,
  casualtiesFacets,
  casualtiesFacetsConstrainSelf,
  municipalities,
  municipalitiesFacets,
  municipalitiesFacetsConstrainSelf,
  leafletMap,
  animation,
  options,
  error,
  clientSideFacetedSearch,
  fullTextSearch,
  toastr: toastrReducer
})

export default reducer
