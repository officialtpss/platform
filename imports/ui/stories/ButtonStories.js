import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {PrimaryButton, LinkButton} from '../components/styled-components/Buttons';

storiesOf('Button', module)
  .add('with text', () =>
    <LinkButton onClick={action('clicked')}>Hello Button2</LinkButton>
  )
  .add('with some emoji', () =>
    <LinkButton onClick={action('clicked')}>😃😇🤣😁</LinkButton>
  )
  .add('primary', () =>
    <PrimaryButton>Primary Button</PrimaryButton>
  );
