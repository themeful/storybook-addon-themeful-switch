import { addons, types } from '@storybook/addons'
import { useParameter } from '@storybook/api'
import { IconButton, Icons, TooltipLinkList, WithTooltip } from '@storybook/components'
import { styled } from '@storybook/theming'
import React, { useEffect, useState } from 'react'
import { ADDON_ID, ADDON_PARAM_KEY } from './constants'

interface Theme {
  name: string
  slug: string
}

export type Themes = Theme[]

type Params = {
  themes?: Themes
  theme?: string
  onChange?: (slug: string, window: Window) => {}
  defaultTheme?: string
}

const IconButtonWithLabel = styled(IconButton)(() => ({
  display: 'inline-flex',
  alignItems: 'center',
}))

const ActiveViewportLabel = styled.div<{}>(({ theme }) => ({
  display: 'inline-block',
  textDecoration: 'none',
  padding: 10,
  fontWeight: theme.typography.weight.bold,
  fontSize: theme.typography.size.s2 - 1,
  lineHeight: '1',
  height: 40,
  border: 'none',
  borderTop: '3px solid transparent',
  borderBottom: '3px solid transparent',
  background: 'transparent',
}))

const Dropdown = () => {
  const iFrame = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement
  const storedTheme = localStorage.getItem('themefulSwitch')
  const addonParams: Params = useParameter(ADDON_PARAM_KEY, {})
  const { theme, defaultTheme, onChange, themes } = addonParams
  let id: string

  if (themes) {
    if (themes.some(({ slug }: { slug: string }) => slug === storedTheme)) {
      id = storedTheme
    } else if (themes.some(({ slug }: { slug: string }) => slug === defaultTheme)) {
      id = defaultTheme
    } else {
      id = themes[0]?.slug
    }
  }

  const [selected, setSelected] = useState(theme || id)

  setTheme(selected)

  useEffect(() => {
    const newValue = theme || selected || id || defaultTheme
    setSelected(newValue)
  }, [theme, defaultTheme, id, selected])

  function handleChange(onHide: () => void, value: string | null) {
    localStorage.setItem('themefulSwitch', value)
    setTheme(value)
    setSelected(value)
    onHide()
    if (onChange) {
      onChange(value, iFrame?.contentWindow)
    }
  }

  function getTheme(slug: string) {
    return themes?.filter((item) => item.slug === slug)[0]
  }

  function setTheme(slug: string) {
    const brandThemeElement = iFrame?.contentWindow?.document?.documentElement
    if (brandThemeElement) {
      brandThemeElement.setAttribute('data-brand-theme', slug)
    }
  }

  function toLink(value: string, title: string, active: boolean, onHide: () => void) {
    return {
      id: value,
      title,
      onClick: () => handleChange(onHide, value),
      active,
    }
  }

  function generateLinks(items: Themes, onHide: () => void) {
    const result: any[] = items.map((item) =>
      toLink(item.slug, item.name, item.slug === selected, onHide)
    )
    return result
  }

  if (themes) {
    return (
      <WithTooltip
        placement="top"
        trigger="click"
        tooltip={({ onHide }) => <TooltipLinkList links={generateLinks(themes, onHide)} />}
        closeOnClick
      >
        <IconButtonWithLabel
          key="themeful switch"
          title="Themeful Switch"
          active={themes.some(({ slug }) => slug === selected)}
        >
          <Icons icon="paintbrush" />
          <ActiveViewportLabel title="Theme">{getTheme(selected)?.name}</ActiveViewportLabel>
        </IconButtonWithLabel>
      </WithTooltip>
    )
  }
  return null
}

addons.register(ADDON_ID, () => {
  addons.add(ADDON_ID, {
    title: 'Themeful Switch',
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <Dropdown />,
  })
})
