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
  deathsByMunicipalityQuery,
  deathsByProvinceOfDomicileQuery,
  deathsByLineMonthQuery,
  deathsByProvinceOfDomicileRatioQuery,
  deathsByOfficerRatioQuery,
  deathsByRatioToAllQuery,
  deathsByRatioFromOfficersQuery,
  ageAverageQuery,
  deathsByRankQuery,
  deathsByPopulationQuery
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
  mapPieChart,
  mapMonthLineChart,
  toLinearPercentagePolygonLayerFormat
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
  deathsByProvinceOfDomicile: {
    perspectiveID: 'casualties',
    q: deathsByProvinceOfDomicileQuery,
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
  deathsByRank: {
    perspectiveID: 'casualties',
    q: deathsByRankQuery,
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
  deathsByLineMonth: {
    perspectiveID: 'casualties',
    q: deathsByLineMonthQuery,
    filterTarget: 'record',
    resultMapper: mapMonthLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  deathsByOfficerRatio: {
    perspectiveID: 'casualties',
    q: deathsByOfficerRatioQuery,
    filterTarget: 'record',
    resultMapper: mapMonthLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  deathsByRatioFromOfficers: {
    perspectiveID: 'casualties',
    q: deathsByRatioFromOfficersQuery,
    filterTarget: 'record',
    resultMapper: mapMonthLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  deathsByProvinceOfDomicileRatio: {
    perspectiveID: 'casualties',
    q: deathsByProvinceOfDomicileRatioQuery,
    filterTarget: 'record',
    resultMapper: mapMonthLineChart,
    resultMapperConfig: {
      fillEmptyValues: true
    }
  },
  deathsByRatioToAll: {
    perspectiveID: 'casualties',
    q: deathsByRatioToAllQuery,
    filterTarget: 'record',
    resultMapper: mapMonthLineChart,
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
  ageAverage: {
    perspectiveID: 'casualties',
    q: ageAverageQuery,
    filterTarget: 'record',
    resultMapper: mapMonthLineChart,
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
  deathsByPopulation: {
    perspectiveID: 'casualties',
    q: deathsByPopulationQuery,
    filterTarget: 'record',
    resultMapper: makeObjectList,
    postprocess: {
      func: toLinearPercentagePolygonLayerFormat,
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
