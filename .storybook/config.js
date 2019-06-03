import { configure, addDecorator } from '@storybook/react'
import React from 'react'
import { ThemeProvider } from 'styled-components'
import theme from '../imports/ui/theme'
import { setDefaults, withInfo } from '@storybook/addon-info';
//
// addon-info
setDefaults({
  header: false, // Toggles display of header with component name and description
  inline: true, // Displays info inline vs click button to view
  source: true, // Displays the source of story Component
  propTables: [/* Components used in story */], // displays Prop Tables with this components
  propTablesExclude: [], // Exclude Components from being shoun in Prop Tables section
  styles: {}, // Overrides styles of addon
  marksyConf: {}, // Overrides components used to display markdown. Warning! This option's name will be likely deprecated in favor to "components" with the same API in 3.3 release. Follow this PR #1501 for details
  maxPropsIntoLine: 1, // Max props to display per line in source code
  maxPropObjectKeys: 10,
  maxPropArrayLength: 10,
  maxPropStringLength: 100,
});

addDecorator((story, context) => withInfo('common info')(story)(context))
// Add the styled-components theme as a global decorator to every story
addDecorator(story => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
));

function loadStories() {
  require('../imports/ui/stories/index.js')
}

configure(loadStories, module);
