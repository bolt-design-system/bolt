export function declarativeClickHandler(element) {
  const clickMethod = element.props.onClick;
  const clickTarget = element.props.onClickTarget;

  if (clickMethod) {
    if (clickTarget) {
      const elems = document.querySelectorAll(`.${clickTarget}`);
      if (elems) {
        elems.forEach(function(elem) {
          if (elem[clickMethod]) {
            elem[clickMethod]();
          } else {
            // @TODO: handle call to undefined method
          }
        });
      }
    } else if (window[clickMethod]) {
      window[clickMethod]();
    } else if (element[clickMethod]) {
      element[clickMethod]();
    }
  }
}
