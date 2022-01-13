import { casualtiesConfig } from './perspective_configs/CasualtiesConfig'
import { municipalitiesConfig } from './perspective_configs/MunicipalitiesConfig'
import { municipalitiesPolygonsQuery, municipalitiesPolygonsDialogQuery } from './sparql_queries/SparqlQueriesMunicipalities'
import { makeObjectList } from '../SparqlObjectMapper'
import {
  // mapPlaces,
  // mapLineChart,
  // mapMultipleLineChart,
  // linearScale,
  // toBarChartRaceFormat,
  toPolygonLayerFormat
  // mapPieChart,
  // mapMonthLineChart,
  // toLinearPercentagePolygonLayerFormat
} from '../Mappers'

export const backendSearchConfig = {
  casualties: casualtiesConfig,
  municipalities: municipalitiesConfig,
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
  }
}
