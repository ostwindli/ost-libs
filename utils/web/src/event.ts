/**
 * 禁止鼠标右键、选择、复制
 */
export const contextmenuBan = () => {
  ["contextmenu", "selectstart", "copy"].forEach(function (ev) {
    document.addEventListener(ev, function (event) {
      return (event.returnValue = false);
    });
  });
};
