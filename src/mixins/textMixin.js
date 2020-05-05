export default {
  filters: {
    lowercase: function(value) {
      return value.toLowerCase();
    },
    capitalize: function(value) {
      return value
        .toLowerCase()
        .split(" ")
        .map(v => {
          if (v.length > 3) return v.charAt(0).toUpperCase() + v.slice(1);
          else return v;
        })
        .join(" ");
    }
  }
};
