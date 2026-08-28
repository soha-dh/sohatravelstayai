import type { Destination, Property } from '../types'
import dataJson from './data.json'

export const destinations: Destination[] = dataJson.destinations
export const properties: Property[] = dataJson.properties

export function getPropertyById(id: number) {
  return properties.find((property) => property.id === id)
}