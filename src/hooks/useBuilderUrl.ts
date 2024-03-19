export interface IOptionsDTO {
  limit: number
  page: number
}

export const useBuilderUrl = (
  uri: string,
  options?: IOptionsDTO,
  queries?: Record<string, any>,
) => {
  let url

  if (options) {
    const searchParams = new URLSearchParams([
      ['limit', String(options.limit)],
      ['page', String(options.page)],
    ])

    if (queries) {
      for (const query in queries) {
        if (queries[query]) {
          searchParams.append(query, queries[query])
        }
      }
    }

    url = [uri, searchParams].join('?')
  } else {
    url = uri
  }

  return { url }
}
