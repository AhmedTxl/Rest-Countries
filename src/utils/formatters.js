export const formatPopulation = (population) => {
    if (!population) return 'N/A'
    return new Intl.NumberFormat().format(population)
}

export const formatCurrency = (currencies) => {
    if (!currencies) return 'N/A'
    return Object.values(currencies).map(c => c.name).join(', ')
}

export const formatLanguages = (languages) => {
    if (!languages) return 'N/A'
    return Object.values(languages).join(', ')
}

export const formatCapital = (capital) => {
    if (!capital || !capital.length) return 'N/A'
    return capital[0]
}

export const formatTopLevelDomain = (tld) => {
    if (!tld || !tld.length) return 'N/A'
    return tld[0]
} 