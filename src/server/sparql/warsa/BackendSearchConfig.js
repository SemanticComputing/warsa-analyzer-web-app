import { casualtiesConfig } from './perspective_configs/CasualtiesConfig'
import {
  casualtyPropertiesFacetResultsQuery,
  casualtyPropertiesInstancePage,
  deathsByMonthQuery,
  deathsByHisclassQuery,
  deathsByMaritalStatusQuery,
  deathsByPerishingCategoryQuery,
  deathsByMotherTongueQuery,
  deathsByGenderQuery,
  deathsByNumberOfChildrenQuery,
  deathsByAgeQuery,
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
    perspectiveID: 'casualties',
    q: deathsByHisclassQuery,
    filterTarget: 'record',
    resultMapper: mapPieChart
  },
  deathsByMonth: {
    perspectiveID: 'casualties',
    q: deathsByMonthQuery,
    filterTarget: 'record',
    resultMapper: mapPieChart
  },
  deathsByPerishingCategory: {
    perspectiveID: 'casualties',
    q: deathsByPerishingCategoryQuery,
    filterTarget: 'record',
    resultMapper: mapPieChart
  },
  deathsByMaritalStatus: {
    perspectiveID: 'casualties',
    q: deathsByMaritalStatusQuery,
    filterTarget: 'record',
    resultMapper: mapPieChart
  },
  deathsByMotherTongue: {
    perspectiveID: 'casualties',
    q: deathsByMotherTongueQuery,
    filterTarget: 'record',
    resultMapper: mapPieChart
  },
  deathsByGender: {
    perspectiveID: 'casualties',
    q: deathsByGenderQuery,
    filterTarget: 'record',
    resultMapper: mapPieChart
  },
  deathsByNumberOfChildren: {
    perspectiveID: 'casualties',
    q: deathsByNumberOfChildrenQuery,
    filterTarget: 'record',
    resultMapper: mapLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  deathsByAge: {
    perspectiveID: 'casualties',
    q: deathsByAgeQuery,
    filterTarget: 'record',
    resultMapper: mapLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
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
