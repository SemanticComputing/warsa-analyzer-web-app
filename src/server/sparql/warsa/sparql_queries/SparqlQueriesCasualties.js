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
        ?id warsa:date_of_death ?deathTimeTimespan__id .
        BIND (STR(?deathTimeTimespan__id) AS ?deathTimeTimespan__prefLabel) .
      }
      UNION
      {
        ?id bioc:has_occupation ?occupation__id .
        ?occupation__id skos:prefLabel ?occupation__prefLabel .
        FILTER (LANG(?occupation__prefLabel) = 'fi')
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

export const deathsByNumberOfChildrenQuery = `
  SELECT ?category
  (COUNT(DISTINCT ?record) as ?count)
  WHERE {
    <FILTER>
    ?record warsa:number_of_children ?category .
    # BIND(xsd:integer(ROUND(?decimal_value)) as ?category)
  }
  GROUP BY ?category
  ORDER BY ?category
`

export const deathsByAgeQuery = `
  SELECT ?category
  (COUNT(DISTINCT ?record) as ?count)
  WHERE {
    <FILTER>
    ?record warsa:date_of_birth ?birthDate .
    ?record warsa:date_of_death ?deathDate .
    BIND(xsd:integer(FLOOR(DAY(?deathDate - ?birthDate) / 365)) as ?category)
    FILTER(BOUND(?category))
    FILTER(?category < 120)
  }
  GROUP BY ?category
  ORDER BY ?category
`

export const deathsByMunicipalityQuery = `
  SELECT ?id ?prefLabel ?polygon (count(DISTINCT ?record) as ?instanceCount) 
  WHERE {
    { 
      ?id a <http://www.yso.fi/onto/suo/kunta> ;
          skos:prefLabel ?prefLabel ;
          sch:polygon ?polygon .  
    }
    UNION {
      <FILTER>
      ?record casualties:municipality_of_domicile/casualties:preferred_municipality ?id ;
          a warsa:DeathRecord .   
      ?id a <http://www.yso.fi/onto/suo/kunta> ;
          skos:prefLabel ?prefLabel ;
          sch:polygon ?polygon .      
    }
  }
  GROUP BY ?id ?prefLabel ?polygon
  ORDER BY desc(?instanceCount)
`

export const deathsByOfficerRatioQuery = `
SELECT ?id ?prefLabel ?polygon(COUNT(DISTINCT ?officerRecord)/COUNT(DISTINCT ?record) AS ?instanceCount) (COUNT(DISTINCT ?record) AS ?allRecords)
WHERE{
  {
    <FILTER>
    ?record casualties:municipality_of_domicile/casualties:preferred_municipality ?id ;
      a warsa:DeathRecord .  
      ?id a <http://www.yso.fi/onto/suo/kunta> ;
      skos:prefLabel ?prefLabel ;
      sch:polygon ?polygon .
  }
  UNION {
    <FILTER>
    ?record casualties:municipality_of_domicile/casualties:preferred_municipality ?id ;
    a warsa:DeathRecord .
    ?record <http://ldf.fi/schema/warsa/casualties/rank> ?rank .
    ?rank dct:isPartOf* <http://ldf.fi/warsa/actors/ranks/Paeaellystoe> .
    BIND(?record AS ?officerRecord)
    ?id a <http://www.yso.fi/onto/suo/kunta> ;
    skos:prefLabel ?prefLabel ;
    sch:polygon ?polygon .
  }
}
GROUP BY ?id ?prefLabel ?polygon
HAVING(?allRecords > 10)
ORDER BY desc(?instanceCount)

`
