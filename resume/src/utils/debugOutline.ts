const randomColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

const debugOutline = () => {
  const tagsToOutline = ["div", "body", "nav", "main", "aside"];
  tagsToOutline.forEach((tag) => {
    const elements = document.querySelectorAll(tag);
    elements.forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.outline = `2px solid ${randomColor()}`;
      }
    });
  });

  return () => {
    if (import.meta.env.VITE_DEBUG) {
      const tagsToOutline = ["div", "body", "nav", "main", "aside"];
      tagsToOutline.forEach((tag) => {
        const elements = document.querySelectorAll(tag);
        elements.forEach((el) => {
          if (el instanceof HTMLElement) {
            el.style.outline = ``;
          }
        });
      });
    }
  };
};

export { debugOutline };
