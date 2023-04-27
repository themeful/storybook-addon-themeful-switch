const themes = [
  { name: 'Style Guide 1 - Dark', slug: 'styleGuide1_dark' },
  { name: 'Style Guide 1 - Light', slug: 'styleGuide1_light' },
  { name: 'Style Guide 2 - Dark', slug: 'styleGuide2_dark' },
  { name: 'Style Guide 2 - Light', slug: 'styleGuide2_light' },
  { name: 'Style Guide 3', slug: 'styleGuide3_default' },
]

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  themefulSwitch: {
    themes,
    onChange: (slug, window) => {
      const body = window?.document.body
      console.log('changed', slug, window, body)
    },
  },
}
