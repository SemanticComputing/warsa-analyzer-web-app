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
        ?id :date_of_death ?date_of_death__id .
        BIND (STR(?date_of_death__id) AS ?date_of_death__prefLabel) .
      }
      UNION
      {
        ?id bioc:has_occupation ?occupation__id .
        ?occupation__id skos:prefLabel ?occupation__prefLabel .
      }
`

export const deathsByHisclassQuery = `
    SELECT ?category ?prefLabel (COUNT(DISTINCT ?record) AS ?instanceCount)
    WHERE {
    <FILTER>
      ?record a :DeathRecord ;
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
    ?record a :DeathRecord .
    ?record :date_of_death ?date_of_death .
    BIND(SUBSTR(str(?date_of_death),1,7) AS ?category)
    BIND(CONCAT(?category, ' ') AS ?prefLabel)
    FILTER (str(?date_of_death) > "1939-05-01")
    FILTER (str(?date_of_death) < "1945-05-01")
  }
  GROUP BY ?category ?prefLabel
  ORDER BY ASC(?prefLabel)
`
