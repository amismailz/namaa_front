export async function getMessages(locale: string, namespaces: string[] = []) {
  let messages = {}

  for (const ns of namespaces) {
    const mod = await import(`@/messages/${locale}/${ns}.json`)
    messages = { ...messages, ...mod.default }
  }

  return messages
}
