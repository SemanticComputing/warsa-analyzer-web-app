import {
  municipalityPropertiesFacetResults
  // casualtyPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesMunicipalities'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const municipalitiesConfig = {
  endpoint: {
    url: 'http://ldf.fi/warsa/sparql',
    // url: 'http://localhost:3030/ds/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: 'suo:kunta',
  includeInSitemap: true,
  // defaultConstraint: `
  //   <SUBJECT> dct:source mmm-schema:Bibale .
  // `,
  paginatedResults: {
    properties: municipalityPropertiesFacetResults
  },
  // instance: {
  //   properties: casualtyPropertiesInstancePage,
  //   relatedInstances: '',
  //   defaultTab: 'table'
  // },
  facets: {
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'skos:prefLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'skos:prefLabel', // limit only to prefLabels
      type: 'text'
    }
  }
}
