import React, { useState, useEffect, useMemo } from "react"
import FlexSearch from "flexsearch"
import { graphql, useStaticQuery } from "gatsby"
import * as Hangul from "hangul-js"

export default (query, searchOptions) => {
  const [store, setStore] = useState(null)
  const [pathIndex, setPathIndex] = useState(null)
  const [titleIndex, setTitleIndex] = useState(null)
  const [bodyIndex, setBodyIndex] = useState(null)

  const data = useStaticQuery(graphql`
    query CustomSearchBarQuery {
      localSearchPaths {
        publicIndexURL
        publicStoreURL
      }
      localSearchTitles {
        publicIndexURL
      }
      localSearchBodies {
        publicIndexURL
      }
    }
  `)

  useEffect(() => {
    fetch(data.localSearchPaths.publicIndexURL)
      .then(result => result.text())
      .then(res => {
        const importedIndex = FlexSearch.create({
          tokenize: function (str) {
            return Hangul.disassemble(str)
          },
        })
        importedIndex.import(res)
        console.log("importedIndex: ", importedIndex)
        setPathIndex(importedIndex)
      })
    fetch(data.localSearchTitles.publicIndexURL)
      .then(result => result.text())
      .then(res => {
        const importedIndex = FlexSearch.create({
          tokenize: function (str) {
            return Hangul.disassemble(str)
          },
        })
        importedIndex.import(res)

        setTitleIndex(importedIndex)
      })
    fetch(data.localSearchBodies.publicIndexURL)
      .then(result => result.text())
      .then(res => {
        const importedIndex = FlexSearch.create({
          tokenize: function (str) {
            return Hangul.disassemble(str)
          },
        })
        importedIndex.import(res)

        setBodyIndex(importedIndex)
      })
    fetch(data.localSearchPaths.publicStoreURL)
      .then(result => result.json())
      .then(res => {
        setStore(res)
      })
  }, [setPathIndex, setTitleIndex, setBodyIndex, setStore, data])

  return useMemo(() => {
    if (!query || !store || (!pathIndex && !bodyIndex && !titleIndex))
      return [
        {
          id: "loading",
          title: "",
          excerpt: <div class="lds-dual-ring"></div>,
        },
      ]

    const rawPathResults = pathIndex
      ? pathIndex.search(query, searchOptions)
      : []
    const rawBodyResults = bodyIndex
      ? bodyIndex.search(query, searchOptions)
      : []
    const rawTitleResults = titleIndex
      ? titleIndex.search(query, searchOptions)
      : []

    const uniqIds = new Set()

    return rawPathResults
      .concat(rawTitleResults)
      .concat(rawBodyResults)
      .filter(id => {
        if (uniqIds.has(id)) {
          return false
        }
        uniqIds.add(id)
        return true
      })
      .map(id => store[id])
  }, [query, pathIndex, titleIndex, bodyIndex, store, searchOptions])
}
