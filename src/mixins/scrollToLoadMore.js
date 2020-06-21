export default {
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  handleScroll() {
    if (
      Math.max(
        window.pageYOffset,
        document.documentElement.scrollTop,
        document.body.scrollTop
      ) +
        window.innerHeight >=
      document.documentElement.offsetHeight
    ) {
      // create a new method called loadMore and add your methods to load your content
      this.loadMore();
    }
  }
};
