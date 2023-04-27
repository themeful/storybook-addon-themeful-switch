![CI Test](https://github.com/themeful/storybook-addon-theme-switch/actions/workflows/ci-test.yml/badge.svg)

# Storybook Addon Themeful Switch

Storybook Themeful Switch can be used to switch out CSS-Variables in [Storybook](https://storybook.js.org).

## Installation

```sh
npm install @themeful/storybook-addon-theme-switch --save-dev
```

## Configuration

### Step 1: Add the addon

Create a file called `main.ts` in your `.storybook` folder.

Add the following code to it:

```js
module.exports = {
  addons: ['@themeful/storybook-addon-theme-switch'],
};
```

### Step 2: Include your themes file

Create a file called `styles.scss` in your `.storybook` folder.

In this file you will need to import your themes files.

```scss
@use '../global.scss' as *;
@use '../themes.scss' as *;
```

```scss
// themes.scss
html[data-brand-theme='default_light'] {
  @import './theme_default_light';
}
html[data-brand-theme='default_dark'] {
  @import './theme_default_dark';
}
```

### Step 3: Add the themes

In the same `preview.ts` file import the decorator from the Themeful Switch addon

Then pass the CSS files to the addon via the exported parameters.

```ts
export const parameters = {
  themefulSwitch: {
    themes: [
      { name: 'Light Theme', slug: 'default_light' },
      { name: 'Dark Theme', slug: 'default_dark' },
    ],
  },
};
```

If a default theme should be selected from first load add 'defaultTheme' to the options.

```ts
export const parameters = {
  themefulSwitch: {
    themes: [
      { name: 'Light Theme', slug: 'default_light' },
      { name: 'Dark Theme', slug: 'default_dark' },
    ],
    defaultTheme: 'default_dark',
  },
};
```

## Set a specific theme for a story

Pass the theme key as the `theme` parameter on the story to default to a specific theme:

```ts
export default {
  title: 'Example/Header',
  component: Header,
  parameters: {
    themefulSwitch: {
      theme: 'default_dark',
    },
  },
};
```
