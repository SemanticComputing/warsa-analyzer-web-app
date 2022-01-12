import { casualtiesConfig } from './perspective_configs/CasualtiesConfig'
import { municipalitiesConfig } from './perspective_configs/MunicipalitiesConfig'
import {
  // deathsByNumberOfChildrenQuery,
  // deathsByAgeQuery,
  deathsByMunicipalityQuery,
  // deathsByLineMonthQuery,
  // deathsByProvinceOfDomicileRatioQuery,
  // deathsByOfficerRatioQuery,
  // deathsByRatioToAllQuery,
  // deathsByRatioFromOfficersQuery,
  // ageAverageQuery,
  deathsByPopulationQuery
} from './sparql_queries/SparqlQueriesCasualties'
import { municipalitiesPolygonsQuery, municipalitiesPolygonsDialogQuery } from './sparql_queries/SparqlQueriesMunicipalities'
import { federatedSearchDatasets } from './sparql_queries/SparqlQueriesFederatedSearch'
import { fullTextSearchProperties } from './sparql_queries/SparqlQueriesFullText'
import { sitemapInstancePageQuery } from '../SparqlQueriesGeneral'
import { makeObjectList } from '../SparqlObjectMapper'
import {
  // mapPlaces,
  // mapLineChart,
  // mapMultipleLineChart,
  // linearScale,
  // toBarChartRaceFormat,
  toPolygonLayerFormat,
  // mapPieChart,
  // mapMonthLineChart,
  toLinearPercentagePolygonLayerFormat
} from '../Mappers'

export const backendSearchConfig = {
  casualties: casualtiesConfig,
  municipalities: municipalitiesConfig,
  deathsByMunicipality: {
    perspectiveID: 'casualties',
    q: deathsByMunicipalityQuery,
    filterTarget: 'record',
    resultMapper: makeObjectList,
    postprocess: {
      func: toPolygonLayerFormat,
      config: {
        ckmeansClustering: true
      }
    }
  },
  deathsByPopulation: {
    perspectiveID: 'casualties',
    q: deathsByPopulationQuery,
    filterTarget: 'record',
    resultMapper: makeObjectList,
    postprocess: {
      func: toLinearPercentagePolygonLayerFormat
    }
  },
  municipalitiesPolygons: {
    perspectiveID: 'municipalities',
    filterTarget: 'id',
    q: municipalitiesPolygonsQuery,
    resultMapper: makeObjectList,
    postprocess: {
      func: toPolygonLayerFormat,
      config: {
        polygonColor: [255, 255, 204]
      }
    }
  },
  municipalitiesPolygonsDialog: {
    perspectiveID: 'municipalities',
    q: municipalitiesPolygonsDialogQuery,
    // filterTarget: 'id',
    resultMapper: makeObjectList
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
