import { casualtiesConfig } from './perspective_configs/CasualtiesConfig'
import {
  casualtyPropertiesFacetResultsQuery,
  casualtyPropertiesInstancePage,
  deathsByMonthQuery,
  deathsByHisclassQuery,
  knowledgeGraphMetadataQuery
} from './sparql_queries/SparqlQueriesCasualties'

import { federatedSearchDatasets } from './sparql_queries/SparqlQueriesFederatedSearch'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { sitemapInstancePageQuery } from '../SparqlQueriesGeneral'
import { makeObjectList } from '../SparqlObjectMapper'
import {
  mapPlaces,
  mapLineChart,
  mapMultipleLineChart,
  linearScale,
  toBarChartRaceFormat,
  mapPieChart
} from '../Mappers'

export const backendSearchConfig = {
  casualties: casualtiesConfig,
  hisclass5: {
    perspectiveID: 'casualties', // use endpoint config from finds
    q: deathsByHisclassQuery,
    filterTarget: 'record',
    resultMapper: mapPieChart
  },
  deathsByMonth: {
    perspectiveID: 'casualties', // use endpoint config from finds
    q: deathsByMonthQuery,
    filterTarget: 'record',
    resultMapper: mapPieChart
  },
  jenaText: {
    perspectiveID: 'casualties',
    properties: fullTextSearchProperties
  },
  federatedSearch: {
    datasets: federatedSearchDatasets
  },
  sitemapConfig: {
    baseUrl: 'https://sampo-ui.demo.seco.cs.aalto.fi',
    langPrimary: 'en',
    langSecondary: 'fi',
    outputDir: './src/server/sitemap_generator',
    sitemapUrl: 'https://sampo-ui.demo.seco.cs.aalto.fi/sitemap',
    sitemapInstancePageQuery
  }
}
