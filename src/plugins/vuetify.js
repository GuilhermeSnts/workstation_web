import Vue from "vue";
import Vuetify from "vuetify/lib";
import pt from "vuetify/es5/locale/pt";
import colors from "vuetify/lib/util/colors";
Vue.use(Vuetify);
export default new Vuetify({
  lang: {
    locales: { pt },
    current: "pt"
  },
  treeShake: true,
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      dark: {
        base: colors.cyan,
        primary: colors.blueGrey,
        secondary: colors.blue.darken2,
        background: colors.grey.darken4
      }
    },
    dark: "true"
  }
});
