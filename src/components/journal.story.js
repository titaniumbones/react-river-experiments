// src/components/Journal.stories.js

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Journal from './journal';

export const journal = {
  id: '1',
  title: 'Test Journal',
  state: 'JOURNAL_INBOX',
  updatedAt: new Date(2018, 0, 1, 9, 0),
};

export const actions = {
  onPinJournal: action('onPinJournal'),
  onArchiveJournal: action('onArchiveJournal'),
};

storiesOf('Journal', module)
  .add('default', () => <Journal journal={journal} {...actions} />)
  .add('pinned', () => <Journal journal={{ ...journal, state: 'JOURNAL_PINNED' }} {...actions} />)
  .add('archived', () => <Journal journal={{ ...journal, state: 'JOURNAL_ARCHIVED' }} {...actions} />);

