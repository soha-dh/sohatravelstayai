import type { Destination, Property } from '../types'
import dataJson from './data.json'

export const destinations: Destination[] = dataJson.destinations
export const properties = dataJson.properties as Property[]

export function getPropertyById(id: number) {
  return properties.find((property) => property.id === id)
}