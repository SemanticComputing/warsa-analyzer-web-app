import {
  casualtyPropertiesFacetResults,
  casualtyPropertiesInstancePage
} from '../sparql_queries/SparqlQueriesCasualties'
import { prefixes } from '../sparql_queries/SparqlQueriesPrefixes'

export const casualtiesConfig = {
  endpoint: {
    url: 'http://ldf.fi/warsa/sparql',
    prefixes,
    useAuth: false
  },
  facetClass: ':DeathRecord',
  includeInSitemap: true,
  // defaultConstraint: `
  //   <SUBJECT> dct:source mmm-schema:Bibale .
  // `,
  paginatedResults: {
    properties: casualtyPropertiesFacetResults
  },
  instance: {
    properties: casualtyPropertiesInstancePage,
    relatedInstances: '',
    defaultTab: 'table'
  },
  facets: {
    prefLabel: {
      id: 'prefLabel',
      labelPath: 'skos:prefLabel',
      textQueryPredicate: '', // empty for querying the facetClass
      textQueryProperty: 'skos:prefLabel', // limit only to prefLabels
      type: 'text'
    },
    occupation: {
      id: 'occupation',
      facetValueFilter: '',
      labelPath: 'bioc:has_occupation/skos:prefLabel',
      predicate: 'bioc:has_occupation',
      facetValueFilter: `
      `,
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = 'fi')
      `,
      parentProperty: 'ammo:hisclass5',
      parentPredicate: 'bioc:has_occupation/ammo:hisclass5',
      type: 'hierarchical'
    },
    municipality_of_death: {
      id: 'municipality_of_death',
      facetValueFilter: '',
      labelPath: 'casualties:municipality_of_death/skos:prefLabel',
      predicate: 'casualties:municipality_of_death',
      type: 'list'
    },
    // municipality_of_domicile: {
    //   id: 'municipality_of_domicile',
    //   facetValueFilter: '',
    //   labelPath: 'casualties:municipality_of_domicile/skos:prefLabel',
    //   predicate: 'casualties:municipality_of_domicile',
    //   type: 'list'
    // },
    municipality_of_domicile: {
      id: 'municipality_of_domicile',
      facetValueFilter: '',
      labelPath: 'casualties:municipality_of_domicile/casualties:preferred_municipality/skos:prefLabel',
      predicate: 'casualties:municipality_of_domicile/casualties:preferred_municipality',
      facetValueFilter: `
      `,
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = 'fi')
      `,
      parentProperty: 'geos:sfWithin',
      parentPredicate: 'casualties:municipality_of_domicile/casualties:preferred_municipality/geos:sfWithin+',
      type: 'hierarchical'
    },
    rank: {
      id: 'rank',
      facetValueFilter: `
      `,
      facetLabelFilter: `
        FILTER(LANG(?prefLabel_) = 'fi')
      `,
      labelPath: 'casualties:rank/skos:prefLabel',
      predicate: 'casualties:rank',
      parentProperty: 'dct:isPartOf',
      parentPredicate: 'casualties:rank/dct:isPartOf+',
      type: 'hierarchical'
    },
  }
}
