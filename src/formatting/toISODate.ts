export const toISODate = (d: Date | null | undefined) => d?.toISOString().slice(0, 10) ?? ''
