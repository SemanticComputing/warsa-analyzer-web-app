const perspectiveID = 'casualties'

export const casualtyPropertiesInstancePage =
`   {
      ?id skos:prefLabel ?prefLabel__id .
      BIND (?prefLabel__id as ?prefLabel__prefLabel)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
    }
`

export const casualtyPropertiesFacetResults =
  `?id skos:prefLabel ?prefLabel__id .
      BIND (?prefLabel__id as ?prefLabel__prefLabel)
      BIND (?id AS ?prefLabel__dataProviderUrl)
      #BIND(CONCAT("/${perspectiveID}/page/", REPLACE(STR(?id), "^.*\\\\/(.+)", "$1")) AS ?prefLabel__dataProviderUrl)
      BIND(?id as ?uri__id)
      BIND(?id as ?uri__dataProviderUrl)
      BIND(?id as ?uri__prefLabel)
      {
        ?id casualties:municipality_of_domicile ?municipality_of_domicile__id .
        ?municipality_of_domicile__id skos:prefLabel ?municipality_of_domicile__prefLabel .
      }
      UNION
      {
        ?id casualties:municipality_of_death ?municipality_of_death__id .
        ?municipality_of_death__id skos:prefLabel ?municipality_of_death__prefLabel .
      }
      UNION
      {
        ?id casualties:rank ?rank__id .
        ?rank__id skos:prefLabel ?rank__prefLabel .
      }
      UNION
      {
        ?id warsa:date_of_death ?date_of_death__id .
        BIND (STR(?date_of_death__id) AS ?date_of_death__prefLabel) .
      }
      UNION
      {
        ?id bioc:has_occupation ?occupation__id .
        ?occupation__id skos:prefLabel ?occupation__prefLabel .
      }
      UNION
      {
        ?id warsa:gender ?gender__id .
        ?gender__id skos:prefLabel ?gender__prefLabel .
      }
      UNION
      {
        ?id warsa:mother_tongue ?mother_tongue__id .
        ?mother_tongue__id skos:prefLabel ?mother_tongue__prefLabel .
      }
      UNION
      {
        ?id warsa:marital_status ?marital_status__id .
        ?marital_status__id skos:prefLabel ?marital_status__prefLabel .
      }
      UNION
      {
        ?id casualties:perishing_category ?perishing_category__id .
        ?perishing_category__id skos:prefLabel ?perishing_category__prefLabel .
      }
      UNION
      {
        ?id casualties:unit ?unit__id .
        ?unit__id skos:prefLabel ?unit__prefLabel .
      }
`

export const deathsByHisclassQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?record) AS ?instanceCount)
    WHERE {
    <FILTER>
      ?record a warsa:DeathRecord ;
      	bioc:has_occupation ?occupation .
      ?occupation ammo:hisclass5 ?class .
      ?class skos:altLabel ?hisclass .
      BIND(
        IF(?occupation = <http://ldf.fi/ammo/tyomies>, 5,
          IF(?occupation = <http://ldf.fi/ammo/sekatyomies>, 5, xsd:integer(?hisclass)))
        AS ?prefLabel)
        BIND(
          IF(?occupation = <http://ldf.fi/ammo/tyomies>, <http://ldf.fi/ammo/hisco/hisclass5/5> ,
            IF(?occupation = <http://ldf.fi/ammo/sekatyomies>, <http://ldf.fi/ammo/hisco/hisclass5/5> , ?class))
          AS ?category)
      FILTER (?prefLabel != '-1')
    }
    GROUP BY ?category ?prefLabel
    ORDER BY DESC(?prefLabel)
`

export const deathsByMonthQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?record) AS ?instanceCount)
    WHERE {
    <FILTER>
    ?record a warsa:DeathRecord .
    ?record warsa:date_of_death ?date_of_death .
    BIND(SUBSTR(str(?date_of_death),1,7) AS ?category)
    BIND(CONCAT(?category, ' ') AS ?prefLabel)
    FILTER (str(?date_of_death) > "1939-05-01")
    FILTER (str(?date_of_death) < "1945-05-01")
  }
  GROUP BY ?category ?prefLabel
  ORDER BY ASC(?prefLabel)
`

export const deathsByPerishingCategoryQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?record) AS ?instanceCount)
    WHERE {
    <FILTER>
    ?record a warsa:DeathRecord .
    ?record casualties:perishing_category ?category .
    ?category skos:prefLabel ?prefLabel .
    FILTER (LANG(?prefLabel) = 'fi')
  }
  GROUP BY ?category ?prefLabel
  ORDER BY ASC(?prefLabel)
`

export const deathsByMotherTongueQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?record) AS ?instanceCount)
    WHERE {
    <FILTER>
    ?record a warsa:DeathRecord .
    ?record warsa:mother_tongue ?category .
    ?category skos:prefLabel ?prefLabel .
    FILTER (LANG(?prefLabel) = 'fi')
  }
  GROUP BY ?category ?prefLabel
  ORDER BY ASC(?prefLabel)
`

export const deathsByMaritalStatusQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?record) AS ?instanceCount)
    WHERE {
    <FILTER>
    ?record a warsa:DeathRecord .
    ?record warsa:marital_status ?category .
    ?category skos:prefLabel ?prefLabel .
    FILTER (LANG(?prefLabel) = 'fi')
  }
  GROUP BY ?category ?prefLabel
  ORDER BY ASC(?prefLabel)
`

export const deathsByGenderQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?record) AS ?instanceCount)
    WHERE {
    <FILTER>
    ?record a warsa:DeathRecord .
    ?record warsa:gender ?category .
    ?category skos:prefLabel ?prefLabel .
    FILTER (LANG(?prefLabel) = 'fi')
  }
  GROUP BY ?category ?prefLabel
  ORDER BY ASC(?prefLabel)
`
