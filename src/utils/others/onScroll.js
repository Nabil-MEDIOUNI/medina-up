const pageOffset = (set) => {
  let prevScrollpos = window.pageYOffset;
  window.onscroll = () => {
    const currentScrollPos = window.pageYOffset;
    if (prevScrollpos >= currentScrollPos) {
      set(true);
    } else {
      set(false);
    }
    prevScrollpos = currentScrollPos;
  };
};

export default pageOffset;
