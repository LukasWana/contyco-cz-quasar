<script>
export default {
  name: 'reference-card'
}
</script>

<template lang="pug">
div
  q-card(flat).reference-card
    q-card-section.page-section-card-title
      .title
        slot(name="name")
      .ref-position
        slot(name="ref-position")
      .content
        slot(name="popis")

</template>

<style scoped lang="stylus">

$gutterSize = 10px
$cardWidth = (($pageFixWidth - 2 * $gutterSize) / 3) + 100
$cardHeight = 280px
$titleHeight = 30px
$refPositionHeight = 45px
$contentHeight = $cardHeight - $titleHeight - $refPositionHeight

.q-carousel__navigation-inner
  margin-top 20px

.q-card__section
  margin 0
  padding 0

.reference-card
  min-height $cardHeight
  max-height $cardHeight + 200px
  min-width $cardWidth - 150
  max-width $cardWidth
  padding-left 45px
  padding-right 45px
  .gt-sm &
    min-height $cardHeight
    max-height $cardHeight
    min-width $cardWidth
    max-width $cardWidth
    overflow hidden
    padding-left 10px
    padding-right 10px

.icon
  padding-right 18px

.title
  text-align center
  font-size 20px
  height $titleHeight
  font-weight bold
  .gt-sm &
    text-align left

.ref-position
  text-align center
  font-size 14px
  height $refPositionHeight
  font-weight bolder
  .gt-sm &
    text-align left

.content
  text-align center
  overflow hidden
  .gt-sm &
    text-align left
    height $contentHeight
    max-height $contentHeight

</style>
