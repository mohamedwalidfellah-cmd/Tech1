export const getZoneFromGPS = (lat, lng) => {
  const zones = [
    { name: 'Alger Ouest', price: 2500, lat: 36.7333, lng: 3.0333, radius: 10 },
    { name: 'Alger Centre', price: 3500, lat: 36.7538, lng: 3.0588, radius: 8 },
    { name: 'Tipaza Est', price: 2500, lat: 36.5945, lng: 2.4428, radius: 15 },
    { name: 'Tipaza Ouest', price: 4500, lat: 36.5741, lng: 2.2064, radius: 20 },
    { name: 'Blida', price: 4500, lat: 36.4775, lng: 2.8258, radius: 15 },
    { name: 'Reste de Tipaza', price: 3500, lat: 36.5843, lng: 2.3246, radius: 25 }
  ]

  for (const zone of zones) {
    const distance = calculateDistance(lat, lng, zone.lat, zone.lng)
    if (distance <= zone.radius) {
      return { zone: zone.name, price: zone.price, covered: true }
    }
  }

  return { zone: 'Hors zone', price: 0, covered: false }
}

const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

export const requestGeolocation = () => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => reject(error)
      )
    } else {
      reject(new Error('Géolocalisation non disponible'))
    }
  })
}
