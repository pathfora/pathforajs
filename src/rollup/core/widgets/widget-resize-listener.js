/** @module core/widget-resize-listener */

import addClass from '../../utils/class/add-class'
import removeClass from '../../utils/class/add-class'

export default function widgetResizeListener (widget, node) {
  if (widget.layout === 'inline' || widget.layout === 'modal' && widget.recommend) {
    var rec = node.querySelector('.pf-content-unit');
    if (rec) {
      if (node.offsetWidth < WIDTH_BREAKPOINT && !utils.hasClass(rec, 'stack')) {
        addClass(rec, 'stack');
      } else if (node.offsetWidth >= WIDTH_BREAKPOINT) {
        removeClass(rec, 'stack');
      }
    }
  }
};