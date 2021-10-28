import React from 'react'
import PropTypes from 'prop-types'
import intl from 'react-intl-universal'
import { Route, Redirect } from 'react-router-dom'
import PerspectiveTabs from '../../main_layout/PerspectiveTabs'
import ResultTable from '../../facet_results/ResultTable'
// import LeafletMap from '../../facet_results/LeafletMap'
import Deck from '../../facet_results/Deck'
import ApexChart from '../../facet_results/ApexChart'
// import Network from '../../facet_results/Network'
// import Export from '../../facet_results/Export'
import {
  MAPBOX_ACCESS_TOKEN,
  MAPBOX_STYLE
} from '../../../configs/warsa/GeneralConfig'
import {
  createSingleLineChartData
  // createMultipleLineChartData
} from '../../../configs/warsa/ApexCharts/LineChartConfig'
import { createApexPieChartData } from '../../../configs/warsa/ApexCharts/PieChartConfig'
import { createApexBarChartData } from '../../../configs/warsa/ApexCharts/BarChartConfig'
// import { coseLayout, cytoscapeStyle, preprocess } from '../../../configs/warsa/Cytoscape.js/NetworkConfig'
// import { layerConfigs, createPopUpContentMMM } from '../../../configs/warsa/Leaflet/LeafletConfig'

const Casualties = props => {
  const { rootUrl, perspective /* screenSize */ } = props
  // const layerControlExpanded = screenSize === 'md' ||
  //   screenSize === 'lg' ||
  //   screenSize === 'xl'
  return (
    <>
      <PerspectiveTabs
        routeProps={props.routeProps}
        tabs={props.perspective.tabs}
        screenSize={props.screenSize}
        layoutConfig={props.layoutConfig}
      />
      <Route
        exact path={`${rootUrl}/${perspective.id}/faceted-search`}
        render={() => <Redirect to={`${rootUrl}/${perspective.id}/faceted-search/table`} />}
      />
      <Route
        path={[`${props.rootUrl}/${perspective.id}/faceted-search/table`, '/iframe.html']}
        render={routeProps =>
          <ResultTable
            data={props.perspectiveState}
            facetUpdateID={props.facetState.facetUpdateID}
            resultClass='casualties'
            facetClass='casualties'
            fetchPaginatedResults={props.fetchPaginatedResults}
            updatePage={props.updatePage}
            updateRowsPerPage={props.updateRowsPerPage}
            sortResults={props.sortResults}
            routeProps={routeProps}
            rootUrl={rootUrl}
            layoutConfig={props.layoutConfig}
          />}
      />
      <Route
        path={`${rootUrl}/${perspective.id}/faceted-search/pie_chart`}
        render={() =>
          <ApexChart
            pageType='facetResults'
            rawData={props.perspectiveState.results}
            rawDataUpdateID={props.perspectiveState.resultUpdateID}
            facetUpdateID={props.facetState.facetUpdateID}
            fetching={props.perspectiveState.fetching}
            fetchData={props.fetchResults}
            createChartData={createApexPieChartData}
            dropdownForChartTypes
            chartTypes={[
              { id: 'pie', createChartData: createApexPieChartData },
              { id: 'bar', createChartData: createApexBarChartData }
            ]}
            yaxisTitle='Number of casualties'
            resultClass='deathsByPerishingCategory'
            facetClass='casualties'
            dropdownForResultClasses
            facetResultsType={intl.get(`perspectives.${perspective.id}.facetResultsType`)}
            resultClasses={['deathsByPerishingCategory', 'deathsByMaritalStatus', 'deathsByGender', 'deathsByMotherTongue', 'hisclass5', 'deathsByMonth']}
            layoutConfig={props.layoutConfig}
            doNotRenderOnMount
          />}
      />
      <Route
        path={`${rootUrl}/${perspective.id}/faceted-search/line_chart`}
        render={() =>
          <ApexChart
            pageType='facetResults'
            rawData={props.perspectiveState.results}
            rawDataUpdateID={props.perspectiveState.resultUpdateID}
            facetUpdateID={props.facetState.facetUpdateID}
            fetching={props.perspectiveState.fetching}
            fetchData={props.fetchResults}
            createChartData={createSingleLineChartData}
            title=''
            xaxisTitle=''
            xaxisType='category'
            xaxisTickAmount={30}
            yaxisTitle={intl.get('apexCharts.numberOfCasualties')}
            seriesTitle={intl.get('apexCharts.numberOfCasualties')}
            stroke={{ width: 2 }}
            resultClass='deathsByNumberOfChildren'
            facetClass='casualties'
            dropdownForResultClasses
            perspectiveStateType={intl.get(`perspectives.${perspective.id}.perspectiveStateType`)}
            resultClasses={['deathsByAge', 'deathsByNumberOfChildren']}
            doNotRenderOnMount
            screenSize={props.screenSize}
            layoutConfig={props.layoutConfig}
          />}
      />
      <Route
        path={`${rootUrl}/${perspective.id}/faceted-search/choropleth_map`}
        render={() =>
          <Deck
            center={props.perspectiveState.maps.casualtiesByMunicipality.center}
            zoom={props.perspectiveState.maps.casualtiesByMunicipality.zoom}
            results={props.perspectiveState.results}
            facetUpdateID={props.facetState.facetUpdateID}
            instanceAnalysisData={props.perspectiveState.instanceAnalysisData}
            instanceAnalysisDataUpdateID={props.perspectiveState.instanceAnalysisDataUpdateID}
            resultClass='deathsByMunicipality'
            facetClass='casualties'
            fetchResults={props.fetchResults}
            fetchInstanceAnalysis={props.fetchInstanceAnalysis}
            fetching={props.perspectiveState.fetching}
            fetchingInstanceAnalysisData={props.perspectiveState.fetchingInstanceAnalysisData}
            layerType='polygonLayer'
            mapBoxAccessToken={MAPBOX_ACCESS_TOKEN}
            mapBoxStyle={MAPBOX_STYLE}
            layoutConfig={props.layoutConfig}
          />}
      />
    </>
  )
}

Casualties.propTypes = {
  /**
   * Faceted search configs and results of this perspective.
   */
  perspectiveState: PropTypes.object.isRequired,
  /**
    * Facet configs and values.
    */
  facetState: PropTypes.object.isRequired,
  /**
    * Facet values where facets constrain themselves, used for statistics.
    */
  facetConstrainSelfState: PropTypes.object.isRequired,
  /**
    * Leaflet map config and external layers.
    */
  leafletMapState: PropTypes.object.isRequired,
  /**
    * Redux action for fetching paginated results.
    */
  fetchPaginatedResults: PropTypes.func.isRequired,
  /**
    * Redux action for fetching all results.
    */
  fetchResults: PropTypes.func.isRequired,
  /**
    * Redux action for fetching facet values for statistics.
    */
  fetchFacetConstrainSelf: PropTypes.func.isRequired,
  /**
    * Redux action for loading external GeoJSON layers.
    */
  fetchGeoJSONLayers: PropTypes.func.isRequired,
  /**
    * Redux action for loading external GeoJSON layers via backend.
    */
  fetchGeoJSONLayersBackend: PropTypes.func.isRequired,
  /**
    * Redux action for clearing external GeoJSON layers.
    */
  clearGeoJSONLayers: PropTypes.func.isRequired,
  /**
    * Redux action for fetching information about a single entity.
    */
  fetchByURI: PropTypes.func.isRequired,
  /**
    * Redux action for updating the page of paginated results.
    */
  updatePage: PropTypes.func.isRequired,
  /**
    * Redux action for updating the rows per page of paginated results.
    */
  updateRowsPerPage: PropTypes.func.isRequired,
  /**
    * Redux action for sorting the paginated results.
    */
  sortResults: PropTypes.func.isRequired,
  /**
    * Redux action for updating the active selection or config of a facet.
    */
  showError: PropTypes.func.isRequired,
  /**
    * Redux action for showing an error
    */
  updateFacetOption: PropTypes.func.isRequired,
  /**
    * Routing information from React Router.
    */
  routeProps: PropTypes.object.isRequired,
  /**
    * Perspective config.
    */
  perspective: PropTypes.object.isRequired,
  /**
    * State of the animation, used by TemporalMap.
    */
  animationValue: PropTypes.array.isRequired,
  /**
    * Redux action for animating TemporalMap.
    */
  animateMap: PropTypes.func.isRequired,
  /**
    * Current screen size.
    */
  screenSize: PropTypes.string.isRequired,
  /**
    * Root url of the application.
    */
  rootUrl: PropTypes.string.isRequired,
  layoutConfig: PropTypes.object.isRequired
}

export default Casualties
