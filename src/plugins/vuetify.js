import Vue from "vue";
import Vuetify from "vuetify/lib";
import pt from "vuetify/es5/locale/pt";
Vue.use(Vuetify);
export default new Vuetify({
  icons: {
    iconfont: "mdi"
  },
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
        primary: "#6f58c9",
        secondary: "#7e78d2",
        background: "#1F1F1F",
        surface: "#353535",
        warning: "#efbb43",
        error: "#dd2d4a",
        success: "#3ce273",
        text: "#BDBBB0"
      }
    },
    dark: true
  }
});
