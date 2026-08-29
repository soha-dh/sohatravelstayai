export function unsplashSrc(url: string, width: number, quality = 70) {
  if (!url.includes('images.unsplash.com')) {
    return url
  }

  const [base] = url.split('?')
  return `${base}?auto=format&fit=crop&w=${width}&q=${quality}`
}
