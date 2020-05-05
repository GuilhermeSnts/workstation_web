<template>
  <div class="listItem">
    <div class="listItemTitle">{{ customer | capitalize }}</div>

    <div class="content">
      <div class="data">
        <div class="listItemInfo">
          <FIcon icon="mail" size="small" />
          {{ email | lowercase }}
        </div>
        <div class="listItemInfo">
          <FIcon icon="phone" size="small" />
          {{ telephone }}
        </div>

        <v-btn rounded small color="blue"> ver Perfil</v-btn>
      </div>

      <div class="avatar">
        <FIcon icon="user" />
      </div>
    </div>
  </div>
</template>

<script>
import textMixin from "@/mixins/textMixin.js";
import FIcon from "@/components/FIcon.vue";
export default {
  props: {
    customer: String,
    email: String,
    telephone: String
  },
  components: {
    FIcon
  },
  mixins: [textMixin]
};
</script>

<style lang="sass" scoped>
.listItem
  box-sizing: border-box
  padding: 10px 15px
  background: #333
  margin-bottom: 15px
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)
  border-radius: 20px
  max-width: 300px

.listItemTitle
  margin-bottom: 10px
  text-align: center
  font-size: 0.8em
  font-weight: lighter

.listItemInfo
  text-align: left
  font-size: 0.7em
  font-weight: normal
  display: flex
  vertical-align: middle
  margin-bottom: 10px

.content
  display: flex
  vertical-align: middle
  justify-content: space-between
  flex-flow: row
.avatar
  height: 60px
  width: 60px
  border-radius: 20px
  background: #2196F3
  display: flex
  align-items: center
  justify-content: center
</style>
