import { casualtiesConfig } from './perspective_configs/CasualtiesConfig'
import {
  deathsByMonthQuery,
  deathsByHisclassQuery,
  deathsByMaritalStatusQuery,
  deathsByPerishingCategoryQuery,
  deathsByMotherTongueQuery,
  deathsByGenderQuery,
  deathsByNumberOfChildrenQuery,
  deathsByAgeQuery,
  deathsByMunicipalityQuery
  // knowledgeGraphMetadataQuery
} from './sparql_queries/SparqlQueriesCasualties'

import { federatedSearchDatasets } from './sparql_queries/SparqlQueriesFederatedSearch'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { sitemapInstancePageQuery } from '../SparqlQueriesGeneral'
import { makeObjectList } from '../SparqlObjectMapper'
import {
  // mapPlaces,
  mapLineChart,
  // mapMultipleLineChart,
  // linearScale,
  // toBarChartRaceFormat,
  toPolygonLayerFormat,
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
  deathsByMunicipality: {
    perspectiveID: 'casualties',
    q: deathsByMunicipalityQuery,
    filterTarget: 'record',
    resultMapper: makeObjectList,
    postprocess: {
      func: toPolygonLayerFormat,
      config: {
        variable: 'death'
      }
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
