/** @module core/setup-widget-position */

import validateWidgetPosition from './validate-widget-position'

export default function setupWidgetPosition (widget, config) {
  if (config.position) {
    validateWidgetPosition(widget, config);
  } else {
    config.position = defaultPositions[config.layout];
  }
};