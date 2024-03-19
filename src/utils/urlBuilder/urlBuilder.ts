export const urlBuilder = (params: {
  address: string
  dynamicSegments?: { [key: string]: string }
  searchParams?: ConstructorParameters<typeof URLSearchParams>[0]
}): string => {
  const { address, dynamicSegments, searchParams } = params

  let url = address

  if (dynamicSegments) {
    url = address.replace(/\{(.*?)\}/g, (_, key) => dynamicSegments[key])
  }

  if (searchParams) {
    url += `?${new URLSearchParams(searchParams).toString()}`
  }

  return url
}
