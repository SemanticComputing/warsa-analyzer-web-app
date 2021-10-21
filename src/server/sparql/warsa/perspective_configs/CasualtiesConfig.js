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
  facetClass: 'warsa:DeathRecord',
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
    perishing_category: {
      id: 'perishing_category',
      facetValueFilter: '',
      labelPath: 'casualties:perishing_category/skos:prefLabel',
      predicate: 'casualties:perishing_category',
      type: 'list',
      facetLabelFilter: `
      FILTER(LANG(?prefLabel_) = 'fi')
    `
    },
    gender: {
      id: 'gender',
      facetValueFilter: '',
      labelPath: 'warsa:gender/skos:prefLabel',
      predicate: 'warsa:gender',
      type: 'list',
      facetLabelFilter: `
      FILTER(LANG(?prefLabel_) = 'fi')
    `
    },
    mother_tongue: {
      id: 'mother_tongue',
      facetValueFilter: '',
      labelPath: 'warsa:mother_tongue/skos:prefLabel',
      predicate: 'warsa:mother_tongue',
      type: 'list',
      facetLabelFilter: `
      FILTER(LANG(?prefLabel_) = 'fi')
    `
    },
    unit: {
      id: 'unit',
      facetValueFilter: '',
      labelPath: 'casualties:unit/skos:prefLabel',
      predicate: 'casualties:unit',
      type: 'list'
    },
    marital_status: {
      id: 'marital_status',
      facetValueFilter: '',
      labelPath: 'warsa:marital_status/skos:prefLabel',
      predicate: 'warsa:marital_status',
      type: 'list',
      facetLabelFilter: `
      FILTER(LANG(?prefLabel_) = 'fi')
    `
    }
  }
}
