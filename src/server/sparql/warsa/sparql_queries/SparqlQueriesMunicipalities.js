const perspectiveID = 'municipalities'

export const municipalityPropertiesFacetResults = `
  ?id skos:prefLabel ?prefLabel__id .
  BIND (?prefLabel__id as ?prefLabel__prefLabel)
  BIND (?id AS ?prefLabel__dataProviderUrl)
  #BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
  BIND(?id as ?uri__id)
  BIND(?id as ?uri__dataProviderUrl)
  BIND(?id as ?uri__prefLabel)
`

export const municipalitiesPolygonsQuery = `
  SELECT * {
    <FILTER>
    ?id a suo:kunta ;
          skos:prefLabel ?prefLabel ;
          sch:polygon ?polygon .      
    OPTIONAL { ?id municipalities:polygon_source ?polygonSource }      
  }
`

export const municipalitiesPolygonsDialogQuery = `
  SELECT * {
    BIND(<ID> as ?id)
    ?id skos:prefLabel ?prefLabel .     
    OPTIONAL { ?id municipalities:polygon_source ?polygonSource }
  }
`
